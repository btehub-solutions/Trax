import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { SubscribeDto, UnsubscribeDto } from './dto/newsletter.dto';
import * as crypto from 'crypto';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);
  private readonly hmacSecret: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly mail: MailService,
  ) {
    this.hmacSecret = this.config.get<string>('JWT_SECRET', 'newsletter-hmac-fallback');
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private siteUrl(): string {
    const origin = this.config.get<string>('FRONTEND_ORIGIN', 'https://trax.ng');
    const firstOrigin = origin.split(',')[0] || 'https://trax.ng';
    return firstOrigin.trim().replace(/\/$/, '');
  }

  generateToken(email: string): string {
    return crypto.createHmac('sha256', this.hmacSecret).update(this.normalizeEmail(email)).digest('hex');
  }

  verifyToken(email: string, token: string): boolean {
    const expected = this.generateToken(email);
    if (token.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token));
  }

  private buildConfirmUrl(email: string, token: string): string {
    const params = new URLSearchParams({
      email: this.normalizeEmail(email),
      token,
    });
    return `${this.siteUrl()}/newsletter/confirm?${params.toString()}`;
  }

  async subscribe(dto: SubscribeDto) {
    const email = this.normalizeEmail(dto.email);
    const existing = await this.prisma.subscriber.findUnique({ where: { email } });

    if (existing?.confirmed) {
      throw new ConflictException('This email is already subscribed to the Trax briefing.');
    }

    const subscriber = await this.prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    const confirmToken = this.generateToken(email);
    const confirmUrl = this.buildConfirmUrl(email, confirmToken);

    try {
      const mailResult = await this.mail.sendNewsletterConfirmation(email, confirmUrl);
      if (mailResult.skipped) {
        if (this.config.get<string>('NODE_ENV') === 'production') {
          this.logger.error(
            `RESEND_API_KEY missing — confirmation email not sent to ${email}. Confirm manually in dashboard.`,
          );
        } else {
          this.logger.log(`Dev confirmation link for ${email}: ${confirmUrl}`);
        }
      }
    } catch (error) {
      this.logger.error(`Failed to send confirmation email to ${email}`, error);
      throw new InternalServerErrorException(
        'We could not send the confirmation email. Please try again in a few minutes.',
      );
    }

    return {
      message: existing
        ? 'We resent your confirmation link. Check your inbox to finish subscribing.'
        : 'Thanks for subscribing. Check your inbox for a confirmation link.',
      id: subscriber.id,
      pendingConfirmation: true,
      ...(this.config.get<string>('NODE_ENV') !== 'production' && { confirmUrl }),
    };
  }

  async confirm(email: string, token: string) {
    const normalized = this.normalizeEmail(email);
    const expected = this.generateToken(normalized);

    if (token.length !== expected.length) {
      throw new BadRequestException('Invalid or expired confirmation link.');
    }

    if (!this.verifyToken(normalized, token)) {
      throw new BadRequestException('Invalid or expired confirmation link.');
    }

    const subscriber = await this.prisma.subscriber.findUnique({ where: { email: normalized } });
    if (!subscriber) throw new NotFoundException('Subscriber not found.');

    if (subscriber.confirmed) {
      return {
        message: 'You are already confirmed on the Trax briefing list.',
        alreadyConfirmed: true,
      };
    }

    await this.prisma.subscriber.update({
      where: { email: normalized },
      data: { confirmed: true },
    });

    return {
      message: 'Your subscription is confirmed. The next Trax briefing is on its way.',
      confirmed: true,
    };
  }

  async unsubscribe(dto: UnsubscribeDto) {
    const email = this.normalizeEmail(dto.email);
    const subscriber = await this.prisma.subscriber.findUnique({ where: { email } });
    if (!subscriber) {
      throw new NotFoundException('That email is not on our subscriber list.');
    }

    await this.prisma.subscriber.delete({ where: { email } });
    return { message: 'You have been unsubscribed from the Trax briefing.' };
  }

  async manuallyConfirm(email: string) {
    const normalized = this.normalizeEmail(email);
    const subscriber = await this.prisma.subscriber.findUnique({ where: { email: normalized } });
    if (!subscriber) throw new NotFoundException('Email not found in subscriber list');

    return this.prisma.subscriber.update({
      where: { email: normalized },
      data: { confirmed: true },
    });
  }

  async findAll(confirmed?: boolean) {
    return this.prisma.subscriber.findMany({
      where: confirmed !== undefined ? { confirmed } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async count() {
    const [total, confirmed] = await Promise.all([
      this.prisma.subscriber.count(),
      this.prisma.subscriber.count({ where: { confirmed: true } }),
    ]);
    return { total, confirmed, unconfirmed: total - confirmed };
  }
}
