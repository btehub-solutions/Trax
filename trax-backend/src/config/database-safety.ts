const REMOTE_DEV_ALLOW_FLAG = 'ALLOW_REMOTE_DATABASE_IN_DEVELOPMENT';
const DESTRUCTIVE_SEED_CONFIRM_FLAG = 'CONFIRM_DESTRUCTIVE_SEED';

function getRuntimeEnv() {
  return process.env.NODE_ENV || process.env.VERCEL_ENV || 'development';
}

function isProductionRuntime() {
  return process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
}

function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    ''
  ).trim();
}

function isLocalDatabaseUrl(databaseUrl: string) {
  if (!databaseUrl) return false;
  if (databaseUrl.startsWith('file:')) return true;

  try {
    const parsed = new URL(databaseUrl);
    return ['localhost', '127.0.0.1', '::1'].includes(parsed.hostname);
  } catch {
    return false;
  }
}

function describeDatabaseTarget(databaseUrl: string) {
  if (!databaseUrl) return 'missing DATABASE_URL';

  try {
    const parsed = new URL(databaseUrl);
    return `${parsed.protocol}//${parsed.hostname}${parsed.pathname}`;
  } catch {
    return 'unparseable DATABASE_URL';
  }
}

export function assertSafeDatabaseUrlForRuntime() {
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL is required. Use a local development database locally and keep production credentials only in production hosting settings.',
    );
  }

  if (isProductionRuntime()) return;

  const allowRemoteDevelopmentDatabase = process.env[REMOTE_DEV_ALLOW_FLAG] === 'true';
  if (!isLocalDatabaseUrl(databaseUrl) && !allowRemoteDevelopmentDatabase) {
    throw new Error(
      [
        `Refusing to start ${getRuntimeEnv()} backend against remote database: ${describeDatabaseTarget(databaseUrl)}.`,
        `Use a local development database, or set ${REMOTE_DEV_ALLOW_FLAG}=true only for a non-production staging database.`,
      ].join(' '),
    );
  }
}

export function assertSafeDestructiveSeed() {
  assertSafeDatabaseUrlForRuntime();

  if (isProductionRuntime()) {
    throw new Error('Destructive database seed is blocked in production.');
  }

  if (process.env[DESTRUCTIVE_SEED_CONFIRM_FLAG] !== 'true') {
    throw new Error(
      `Destructive seed requires ${DESTRUCTIVE_SEED_CONFIRM_FLAG}=true so it cannot run accidentally.`,
    );
  }
}

export function getSafeDatabaseTargetLabel() {
  return describeDatabaseTarget(getDatabaseUrl());
}
