import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { PrismaModule }      from './prisma/prisma.module';
import { AuthModule }        from './auth/auth.module';
import { ArticlesModule }    from './articles/articles.module';
import { CategoriesModule }  from './categories/categories.module';
import { UsersModule }       from './users/users.module';
import { NewsletterModule }  from './newsletter/newsletter.module';
import { AdsModule }         from './ads/ads.module';
import { UploadsModule }      from './uploads/uploads.module';
import { PartnersModule }     from './partners/partners.module';
import { MailModule }           from './mail/mail.module';
import { AppController }      from './app.controller';
import { AppService }         from './app.service';

@Module({
  imports: [
    // ── Global config (reads .env automatically) ──────────────────────────
    ConfigModule.forRoot({ isGlobal: true }),

    // ── Rate limiting (global default: 60 requests per 60s) ──────────────
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60,
    }]),

    // ── Database (global Prisma singleton) ────────────────────────────────
    PrismaModule,

    // ── Feature modules ───────────────────────────────────────────────────
    AuthModule,
    ArticlesModule,
    CategoriesModule,
    UsersModule,
    NewsletterModule,
    AdsModule,
    UploadsModule,
    PartnersModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Apply ThrottlerGuard globally to all routes
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
