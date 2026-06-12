import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export function configureApp(app: INestApplication, frontendOrigin: string) {
  // ── Static Assets (skip on read-only serverless filesystems) ──
  try {
    const uploadsDir = join(process.cwd(), 'uploads');
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }
    const expressApp = app as unknown as NestExpressApplication;
    if (typeof expressApp.useStaticAssets === 'function') {
      expressApp.useStaticAssets(uploadsDir, {
        prefix: '/uploads',
      });
    }
  } catch {
    // Vercel / serverless: filesystem is read-only, skip static uploads
  }

  // ── CORS ──────────────────────────────────────────────────────────────────
  const allowedOrigins = frontendOrigin
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ── Global prefix ─────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ── Validation ────────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // strip unknown fields
      forbidNonWhitelisted: true,
      transform: true,          // auto-transform to DTO class instances
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── Swagger ───────────────────────────────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Trax API')
    .setDescription(
      "REST API for Trax, Ogun State and Ogun State's tech news and startup media platform.",
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addTag('Auth', 'Authentication & registration')
    .addTag('Articles', 'Article CRUD')
    .addTag('Categories', 'Article categories')
    .addTag('Users', 'Author profiles')
    .addTag('Newsletter', 'Email subscription')
    .addTag('Ads', 'Ad slot management')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
