import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { configureApp } from './app.bootstrap';
import { CategoriesService } from './categories/categories.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const frontendOrigin = config.get<string>('FRONTEND_ORIGIN', 'http://localhost:3000');

  configureApp(app, frontendOrigin);

  const port = config.get<number>('PORT', 4000);
  await app.listen(port);
  console.log(`🚀 Trax API running on http://localhost:${port}/api/v1`);
  console.log(`📖 Swagger docs    at http://localhost:${port}/api`);

  // ── Idempotent category seeding ───────────────────────────────────────────
  // Ensures all system categories (including Tools) exist in the database on
  // every startup. Uses upsert internally so existing categories are untouched.
  try {
    const categoriesService = app.get(CategoriesService);
    await categoriesService.seed();
    console.log('✅ System categories verified/seeded');
  } catch (err) {
    // Non-fatal: server continues to run even if the DB is temporarily unavailable.
    console.warn('⚠️  Could not verify system categories on startup:', (err as Error).message);
  }
}
bootstrap();
