import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SubscribeDto {
  @ApiProperty({ example: 'reader@example.com' })
  @IsEmail()
  email: string;
}

export class ConfirmSubscriptionDto {
  @ApiProperty({ description: 'Confirmation token sent via email' })
  @IsString()
  token: string;
}

export class UnsubscribeDto {
  @ApiProperty({ example: 'reader@example.com' })
  @IsEmail()
  email: string;
}
