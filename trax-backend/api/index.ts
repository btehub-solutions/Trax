process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/app.bootstrap';
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
  await bootstrapServer();
  return server(req, res);
};
