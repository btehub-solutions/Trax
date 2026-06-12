import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    let connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
    if (connectionString) {
      connectionString = connectionString.trim();
      connectionString = connectionString.replace(/sslmode=[^&]+/g, 'sslmode=no-verify');
      if (!connectionString.includes('sslmode=')) {
        const separator = connectionString.includes('?') ? '&' : '?';
        connectionString += `${separator}sslmode=no-verify`;
      }
    }
    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
