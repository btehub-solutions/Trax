import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SubscribeDto, UnsubscribeDto } from './dto/newsletter.dto';
import * as crypto from 'crypto';

@Injectable()
export class NewsletterService {
  private readonly hmacSecret: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.hmacSecret = this.config.get<string>('JWT_SECRET', 'newsletter-hmac-fallback');
  }

  // Generate an HMAC token for email confirmation
  generateToken(email: string): string {
    return crypto.createHmac('sha256', this.hmacSecret).update(email.toLowerCase()).digest('hex');
  }

  // Verify the HMAC token matches the email
  verifyToken(email: string, token: string): boolean {
    const expected = this.generateToken(email);
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token));
  }

  async subscribe(dto: SubscribeDto) {
    const existing = await this.prisma.subscriber.findUnique({
      where: { email: dto.email },
    });

    if (existing?.confirmed) {
      throw new ConflictException('This email is already subscribed');
    }

    const subscriber = await this.prisma.subscriber.upsert({
      where:  { email: dto.email },
      update: {},
      create: { email: dto.email },
    });

    const confirmToken = this.generateToken(dto.email);

    // TODO: send confirmation email with link containing ?email=...&token=...
    return {
      message: 'Subscription received. Check your inbox to confirm.',
      id:      subscriber.id,
      // In development, expose the token so you can test the flow
      ...(process.env.NODE_ENV !== 'production' && { confirmToken }),
    };
  }

  async confirm(email: string, token: string) {
    // Validate token length before timing-safe compare
    const expected = this.generateToken(email);
    if (token.length !== expected.length) {
      throw new BadRequestException('Invalid confirmation token');
    }

    if (!this.verifyToken(email, token)) {
      throw new BadRequestException('Invalid confirmation token');
    }

    const subscriber = await this.prisma.subscriber.findUnique({ where: { email } });
    if (!subscriber) throw new NotFoundException('Subscriber not found');

    return this.prisma.subscriber.update({
      where: { email },
      data:  { confirmed: true },
    });
  }

  async unsubscribe(dto: UnsubscribeDto) {
    const subscriber = await this.prisma.subscriber.findUnique({
      where: { email: dto.email },
    });
    if (!subscriber) throw new NotFoundException('Email not found in subscriber list');

    await this.prisma.subscriber.delete({ where: { email: dto.email } });
    return { message: 'Successfully unsubscribed' };
  }

  async manuallyConfirm(email: string) {
    const subscriber = await this.prisma.subscriber.findUnique({ where: { email } });
    if (!subscriber) throw new NotFoundException('Email not found in subscriber list');

    return this.prisma.subscriber.update({
      where: { email },
      data:  { confirmed: true },
    });
  }

  async findAll(confirmed?: boolean) {
    return this.prisma.subscriber.findMany({
      where:   confirmed !== undefined ? { confirmed } : undefined,
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
