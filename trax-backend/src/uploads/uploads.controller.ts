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

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    
    if (supabaseUrl && supabaseKey) {
      try {
        this.supabase = createClient(supabaseUrl, supabaseKey);
      } catch (err) {
        console.warn('Failed to initialize Supabase client, will use local fallback:', err);
      }
    } else {
      console.warn('Supabase credentials missing. Image uploads will use local fallback.');
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
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  }))
  async uploadFile(@UploadedFile() file: any, @Req() req: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded or invalid file format');
    }

    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
    const filePath = `articles/${uniqueName}`;

    // 1. Try uploading to Supabase if configured
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
        
        console.warn(`Supabase upload error (falling back to local): ${error.message}`);
      } catch (err: any) {
        console.warn(`Supabase client throw (falling back to local): ${err.message || err}`);
      }
    }

    // 2. Local Fallback: Write file to local uploads/ directory
    try {
      const uploadsDir = join(process.cwd(), 'uploads');
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true });
      }
      
      const localFilePath = join(uploadsDir, uniqueName);
      writeFileSync(localFilePath, file.buffer);

      const host = req.get('host') || 'localhost:4000';
      const protocol = req.protocol || 'http';
      const localUrl = `${protocol}://${host}/uploads/${uniqueName}`;

      return {
        url: localUrl,
        filename: uniqueName,
      };
    } catch (err: any) {
      throw new BadRequestException(`Image upload failed: ${err.message || err}`);
    }
  }
}

