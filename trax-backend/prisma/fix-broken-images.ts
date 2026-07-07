/**
 * prisma/fix-broken-images.ts
 *
 * One-time repair script: finds every article whose image URL is a localhost
 * address (stored during local development when Supabase was unavailable) and
 * replaces it with the Unsplash fallback image so those articles stop showing
 * broken images on production.
 *
 * Usage (run from trax-backend/):
 *   npx ts-node -r tsconfig-paths/register prisma/fix-broken-images.ts
 *
 * Safe to run multiple times — only updates rows that actually need fixing.
 * Does NOT touch articles whose image is already a valid remote URL.
 */

import 'dotenv/config';
import { PrismaService } from '../src/prisma/prisma.service';

const prisma = new PrismaService();

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80';

/** Returns true when a stored image URL is broken / unreachable in production. */
function isBrokenImageUrl(url: string | null): boolean {
  if (!url || url.trim() === '') return true;
  if (url.startsWith('/') && !url.startsWith('//')) return true; // relative path

  try {
    const { hostname, protocol } = new URL(url);
    if (!['http:', 'https:'].includes(protocol)) return true;
    if (['localhost', '127.0.0.1', '::1'].includes(hostname)) return true;
  } catch {
    return true; // not a valid URL
  }

  return false;
}

async function main() {
  console.log('🔍  Scanning articles for broken image URLs…');

  const articles = await prisma.article.findMany({
    select: { id: true, title: true, image: true },
  });

  const broken = articles.filter((a) => isBrokenImageUrl(a.image));

  if (broken.length === 0) {
    console.log('✅  No broken image URLs found. Nothing to fix.');
    return;
  }

  console.log(`\n⚠️   Found ${broken.length} article(s) with broken image URLs:\n`);
  for (const a of broken) {
    console.log(`  [${a.id}] "${a.title}"\n       image: ${a.image ?? '(null)'}`);
  }

  console.log(`\n🔧  Patching ${broken.length} article(s) with fallback image…`);

  let fixed = 0;
  for (const a of broken) {
    await prisma.article.update({
      where: { id: a.id },
      data: { image: FALLBACK_IMAGE },
    });
    fixed++;
    console.log(`  ✓  Fixed article [${a.id}]: "${a.title}"`);
  }

  console.log(`\n✅  Done. Patched ${fixed} article(s).`);
  console.log(
    '\n💡  Next steps:\n' +
    '    1. Go to the Trax dashboard and re-upload real cover images for\n' +
    '       the articles listed above.\n' +
    '    2. Ensure SUPABASE_URL + SUPABASE_ANON_KEY are set in production\n' +
    '       so all future uploads go to Supabase Storage.\n',
  );
}

main()
  .catch((e) => {
    console.error('Script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
