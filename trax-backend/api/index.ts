import { NestFactory } from '@nestjs/core';
import { AppModule } from '../dist/src/app.module';
import { configureApp } from '../dist/src/app.bootstrap';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let isAppInitialized = false;

async function bootstrapServer() {
  if (isAppInitialized) return server;
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
  configureApp(app, frontendOrigin);
  await app.init();
  isAppInitialized = true;
  return server;
}

export default async (req: any, res: any) => {
  try {
    await bootstrapServer();
    return server(req, res);
  } catch (err: any) {
    console.error('Initialization error caught in Vercel handler:', err);
    res.status(500).json({
      error: 'Initialization Error',
      message: err.message,
      stack: err.stack,
    });
  }
};

