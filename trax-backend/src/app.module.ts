import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule }      from './prisma/prisma.module';
import { AuthModule }        from './auth/auth.module';
import { ArticlesModule }    from './articles/articles.module';
import { CategoriesModule }  from './categories/categories.module';
import { UsersModule }       from './users/users.module';
import { NewsletterModule }  from './newsletter/newsletter.module';
import { AdsModule }         from './ads/ads.module';
import { UploadsModule }      from './uploads/uploads.module';

@Module({
  imports: [
    // ── Global config (reads .env automatically) ──────────────────────────
    ConfigModule.forRoot({ isGlobal: true }),

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
  ],
})
export class AppModule {}
