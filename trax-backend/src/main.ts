import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { configureApp } from './app.bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const frontendOrigin = config.get<string>('FRONTEND_ORIGIN', 'http://localhost:3000');

  configureApp(app, frontendOrigin);

  const port = config.get<number>('PORT', 4000);
  await app.listen(port);
  console.log(`🚀 Trax API running on http://localhost:${port}/api/v1`);
  console.log(`📖 Swagger docs    at http://localhost:${port}/api`);
}
bootstrap();
