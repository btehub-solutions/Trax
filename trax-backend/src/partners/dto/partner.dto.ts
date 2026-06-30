import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({ example: 'Ogun State Government' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://vjhwudyiwahkvqugihdq.supabase.co/storage/v1/object/public/uploads/logos/partner_logo.png' })
  @IsString()
  logoUrl: string;

  @ApiPropertyOptional({ example: 'https://ogunstate.gov.ng' })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdatePartnerDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
