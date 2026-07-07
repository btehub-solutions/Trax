import {
  Controller, Post, UseInterceptors, UploadedFile, UseGuards, BadRequestException, Req
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { extname, join } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  private supabase: any = null;

  /** Public-facing base URL of this server (e.g. https://api.trax.ng).
   *  Used to build absolute image URLs for the local-disk fallback so they
   *  remain reachable in production instead of pointing at localhost. */
  private serverUrl: string;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');

    // SERVER_URL must be the public-facing backend origin in production.
    // e.g.  SERVER_URL=https://api.trax.ng
    // Falls back to localhost only for local dev.
    this.serverUrl = (
      this.configService.get<string>('SERVER_URL') || 'http://localhost:4000'
    ).replace(/\/$/, ''); // strip any trailing slash

    if (supabaseUrl && supabaseKey) {
      try {
        this.supabase = createClient(supabaseUrl, supabaseKey);
      } catch (err) {
        console.warn(
          '⚠️  Trax Uploads: Failed to initialise Supabase client — will use local disk fallback:',
          err,
        );
      }
    } else {
      // Critical misconfiguration in production — log loudly so it is caught early.
      console.error(
        '🚨 Trax Uploads: SUPABASE_URL or SUPABASE_ANON_KEY is not set. ' +
        'Image uploads will fall back to LOCAL disk storage. ' +
        'Stored URLs will be based on SERVER_URL (' + this.serverUrl + '). ' +
        'Set SUPABASE_URL + SUPABASE_ANON_KEY in production to prevent broken images.',
      );
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR', 'WRITER')
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a cover image (JPEG, PNG, WEBP, GIF)' })
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: imageFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  }))
  async uploadFile(@UploadedFile() file: any, @Req() req: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded or invalid file format');
    }

    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
    const filePath = `articles/${uniqueName}`;

    // ── 1. Preferred: Supabase Storage ───────────────────────────────────────
    if (this.supabase) {
      try {
        const { error } = await this.supabase.storage
          .from('images')
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (!error) {
          const { data: publicUrlData } = this.supabase.storage
            .from('images')
            .getPublicUrl(filePath);

          return {
            url: publicUrlData.publicUrl,
            filename: uniqueName,
          };
        }

        console.warn(
          `⚠️  Trax Uploads: Supabase upload error (falling back to local disk): ${error.message}`,
        );
      } catch (err: any) {
        console.warn(
          `⚠️  Trax Uploads: Supabase client threw (falling back to local disk): ${err.message || err}`,
        );
      }
    }

    // ── 2. Fallback: local disk ───────────────────────────────────────────────
    // The URL is built from SERVER_URL (not req.get('host')) so it resolves
    // correctly when the backend is deployed — not to localhost.
    try {
      const uploadsDir = join(process.cwd(), 'uploads');
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true });
      }

      const localFilePath = join(uploadsDir, uniqueName);
      writeFileSync(localFilePath, file.buffer);

      const localUrl = `${this.serverUrl}/uploads/${uniqueName}`;

      console.warn(
        `⚠️  Trax Uploads: Image saved to LOCAL disk (not Supabase). ` +
        `URL stored in DB: ${localUrl}. ` +
        `This image will break if the server is restarted or redeployed. ` +
        `Fix: set SUPABASE_URL + SUPABASE_ANON_KEY and re-upload the image.`,
      );

      return {
        url: localUrl,
        filename: uniqueName,
      };
    } catch (err: any) {
      throw new BadRequestException(`Image upload failed: ${err.message || err}`);
    }
  }
}
