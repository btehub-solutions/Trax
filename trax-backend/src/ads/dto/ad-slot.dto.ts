import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { AdSize } from '../../prisma-enums';

export class CreateAdSlotDto {
  @ApiProperty({ example: 'Homepage Leaderboard' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ enum: AdSize, example: AdSize.LEADERBOARD })
  @IsEnum(AdSize)
  size: AdSize;

  @ApiPropertyOptional({ example: '<script>/* ad code */</script>' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateAdSlotDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiPropertyOptional({ enum: AdSize })
  @IsOptional()
  @IsEnum(AdSize)
  size?: AdSize;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
