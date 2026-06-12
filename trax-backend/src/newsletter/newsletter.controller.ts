import {
  Body, Controller, Delete, Get, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto, UnsubscribeDto } from './dto/newsletter.dto';
import { Roles, RolesGuard } from '../auth/roles.guard';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @ApiOperation({ summary: 'Subscribe an email to the newsletter' })
  subscribe(@Body() dto: SubscribeDto) {
    return this.newsletterService.subscribe(dto);
  }

  @Get('confirm')
  @ApiOperation({ summary: 'Confirm subscription via HMAC token' })
  @ApiQuery({ name: 'email', required: true })
  @ApiQuery({ name: 'token', required: true })
  confirm(@Query('email') email: string, @Query('token') token: string) {
    return this.newsletterService.confirm(email, token);
  }

  @Delete('unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe an email' })
  unsubscribe(@Body() dto: UnsubscribeDto) {
    return this.newsletterService.unsubscribe(dto);
  }

  // Admin only
  @Get('subscribers')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'List all subscribers (Admin/Editor)' })
  @ApiQuery({ name: 'confirmed', required: false, type: Boolean })
  findAll(@Query('confirmed') confirmed?: string) {
    const filter = confirmed !== undefined ? confirmed === 'true' : undefined;
    return this.newsletterService.findAll(filter);
  }

  @Get('subscribers/count')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'EDITOR')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get subscriber counts (Admin/Editor)' })
  count() {
    return this.newsletterService.count();
  }
}
