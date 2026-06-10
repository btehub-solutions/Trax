import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Startups' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'startups' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'Coverage of tech startup launches and growth' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '#C84B31' })
  @IsOptional()
  @IsString()
  color?: string;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color?: string;
}
