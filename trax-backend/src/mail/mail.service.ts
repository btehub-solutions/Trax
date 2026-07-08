import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly config: ConfigService) {}

  async send(options: SendMailOptions): Promise<{ sent: boolean; skipped?: boolean }> {
    const apiKey = this.config.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      if (this.config.get<string>('NODE_ENV') !== 'production') {
        this.logger.warn(`RESEND_API_KEY not set — email to ${options.to} was not sent`);
      }
      return { sent: false, skipped: true };
    }

    const from = this.config.get<string>('MAIL_FROM', 'Trax <newsletter@trax.ng>');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      this.logger.error(`Resend API error (${response.status}): ${body}`);
      throw new Error('Failed to send email');
    }

    return { sent: true };
  }

  async sendNewsletterConfirmation(email: string, confirmUrl: string): Promise<{ sent: boolean; skipped?: boolean }> {
    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #18181b;">
        <p style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #E7040D;">Trax briefing</p>
        <h1 style="font-size: 24px; line-height: 1.25; margin: 0 0 12px;">Confirm your subscription</h1>
        <p style="font-size: 15px; line-height: 1.6; color: #52525b; margin: 0 0 24px;">
          One click to start receiving Ogun State tech news — startups, funding, policy, and ecosystem moves.
        </p>
        <a href="${confirmUrl}" style="display: inline-block; background: #E7040D; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 20px; border-radius: 8px;">
          Confirm subscription
        </a>
        <p style="font-size: 12px; line-height: 1.6; color: #a1a1aa; margin: 28px 0 0;">
          If you did not request this, you can ignore this email.
        </p>
      </div>
    `;

    return this.send({
      to: email,
      subject: 'Confirm your Trax briefing subscription',
      html,
    });
  }
}
