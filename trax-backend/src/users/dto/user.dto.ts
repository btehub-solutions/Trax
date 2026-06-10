import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Chidi Okafor' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Senior reporter covering tech funding rounds.' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ example: '@chidiokafor' })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/chidiokafor' })
  @IsOptional()
  @IsString()
  linkedin?: string;
}
