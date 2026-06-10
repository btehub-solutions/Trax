import {
  Controller, Post, UseInterceptors, UploadedFile, UseGuards, BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
  },
});

const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR', 'WRITER')
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a cover image (JPEG, PNG, WEBP, GIF)' })
  @UseInterceptors(FileInterceptor('file', {
    storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  }))
  uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded or invalid file format');
    }
    return {
      url: `http://localhost:4000/uploads/${file.filename}`,
      filename: file.filename,
    };
  }
}
