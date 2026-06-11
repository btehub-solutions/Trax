import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscribeDto, UnsubscribeDto } from './dto/newsletter.dto';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

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

    // TODO: send confirmation email via your mail provider (Resend, Mailgun…)
    return {
      message: 'Subscription received. Check your inbox to confirm.',
      id:      subscriber.id,
    };
  }

  async confirm(email: string) {
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
