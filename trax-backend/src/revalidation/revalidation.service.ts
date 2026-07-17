import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RevalidationService {
  private readonly logger = new Logger(RevalidationService.name);
  private readonly defaultSecret = 'trax-revalidation-secret-102938';

  constructor(private readonly config: ConfigService) {}

  private getFrontendUrl(): string {
    const origin = this.config.get<string>('FRONTEND_ORIGIN', 'http://localhost:3000');
    // Extract first origin from comma-separated list
    const firstOrigin = origin.split(',')[0] || 'http://localhost:3000';
    return firstOrigin.trim().replace(/\/$/, '');
  }

  async triggerRevalidation(options: { tag?: string; path?: string }) {
    // Run asynchronously, don't block the caller
    const secret = this.config.get<string>('REVALIDATION_SECRET', this.defaultSecret);
    const frontendUrl = this.getFrontendUrl();
    const url = new URL(`${frontendUrl}/api/revalidate`);
    url.searchParams.set('secret', secret);
    if (options.tag) url.searchParams.set('tag', options.tag);
    if (options.path) url.searchParams.set('path', options.path);

    this.logger.log(`Triggering revalidation at ${url.origin}${url.pathname}?tag=${options.tag || ''}&path=${options.path || ''}`);

    // Fire-and-forget fetch call
    fetch(url.toString(), { method: 'POST' })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.text();
          this.logger.warn(`Frontend revalidation failed (${res.status}): ${body}`);
        } else {
          this.logger.log('Frontend cache successfully revalidated');
        }
      })
      .catch((err) => {
        this.logger.error(`Failed to reach frontend for revalidation: ${err.message}`);
      });
  }
}
