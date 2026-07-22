import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ArticleStatus } from '../../prisma-enums';

export class CreateArticleDto {
  @ApiProperty({ example: 'Ogun Tech Startups Draw Key Seed Funding in Q1 2026' })
  @IsString()
  @MinLength(10)
  title: string;

  @ApiProperty({ example: 'ogun-tech-startups-funding-q1-2026' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'A surge in global VC confidence is fuelling...' })
  @IsString()
  excerpt: string;

  @ApiProperty({ example: '<p>Full article HTML or Markdown body...</p>' })
  @IsString()
  body: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/...' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ enum: ArticleStatus, default: ArticleStatus.DRAFT })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  breaking?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  trending?: boolean;

  @ApiPropertyOptional({ example: '5 min read' })
  @IsOptional()
  @IsString()
  readTime?: string;

  @ApiPropertyOptional({ example: '2026-06-11T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @ApiPropertyOptional({ example: '2026-08-15T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @ApiPropertyOptional({ example: 'https://example.com' })
  @IsOptional()
  @IsString()
  officialLink?: string;

  @ApiProperty({ example: 'clxyz123categoryid' })
  @IsString()
  categoryId: string;

  @ApiPropertyOptional({ type: [String], example: ['clxyz1', 'clxyz2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagIds?: string[];

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isSponsored?: boolean;

  @ApiPropertyOptional({ example: 'clxyz123partnerid' })
  @IsOptional()
  @IsString()
  partnerId?: string;
}

export class UpdateArticleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(10)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  body?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ enum: ArticleStatus })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  breaking?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  trending?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readTime?: string;

  @ApiPropertyOptional({ example: '2026-06-11T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @ApiPropertyOptional({ example: '2026-08-15T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  officialLink?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagIds?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isSponsored?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  partnerId?: string;
}

export class ArticleQueryDto {
  @ApiPropertyOptional({ example: 'funding' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'tech-tools' })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiPropertyOptional({ enum: ArticleStatus })
  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @ApiPropertyOptional({ example: 'true' })
  @IsOptional()
  featured?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: '12' })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ example: 'true' })
  @IsOptional()
  isSponsored?: string;

  @ApiPropertyOptional({ example: 'clxyz123partnerid' })
  @IsOptional()
  @IsString()
  partnerId?: string;
}
