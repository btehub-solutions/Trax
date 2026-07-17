import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateEcosystemNodeDto {
  @ApiProperty({ example: 'Vnicom Solutions (Turnify)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'STARTUP', enum: ['STARTUP', 'HUB', 'LAB'] })
  @IsString()
  @IsIn(['STARTUP', 'HUB', 'LAB'])
  category: string;

  @ApiProperty({ example: 'Abeokuta' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'HealthTech — clinician workflow & digital health platform' })
  @IsString()
  @IsNotEmpty()
  focus: string;

  @ApiPropertyOptional({ example: 'https://turnify.ng' })
  @IsOptional()
  @IsUrl()
  website?: string;
}

export class UpdateEcosystemNodeDto {
  @ApiPropertyOptional({ example: 'Vnicom Solutions (Turnify)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'STARTUP', enum: ['STARTUP', 'HUB', 'LAB'] })
  @IsOptional()
  @IsString()
  @IsIn(['STARTUP', 'HUB', 'LAB'])
  category?: string;

  @ApiPropertyOptional({ example: 'Abeokuta' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'HealthTech — clinician workflow & digital health platform' })
  @IsOptional()
  @IsString()
  focus?: string;

  @ApiPropertyOptional({ example: 'https://turnify.ng' })
  @IsOptional()
  @IsUrl()
  website?: string;
}
