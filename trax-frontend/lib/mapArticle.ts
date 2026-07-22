import { Article } from './articles';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80';

/**
 * Returns true when an image URL is unusable in production:
 *  - Empty / null / undefined
 *  - A relative path  (starts with "/" but not "//")
 *  - A localhost or 127.0.0.1 address saved during local development
 *  - Any non-http(s) scheme
 */
function isBrokenImageUrl(url: string | null | undefined): boolean {
  if (!url || url.trim() === '') return true;

  // Relative path stored in DB (e.g. "/uploads/foo.jpg")
  if (url.startsWith('/') && !url.startsWith('//')) return true;

  try {
    const { hostname, protocol } = new URL(url);
    // Not an http(s) URL
    if (!['http:', 'https:'].includes(protocol)) return true;
    // Localhost / loopback stored during dev
    if (['localhost', '127.0.0.1', '::1'].includes(hostname)) return true;
  } catch {
    // URL constructor threw → not a valid absolute URL
    return true;
  }

  return false;
}

/**
 * Maps a raw API article response to the frontend Article type.
 * Single source of truth — used everywhere articles are fetched from the API.
 */
export function mapApiArticle(a: any): Article {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category?.name || 'Ecosystem',
    author: a.author?.name || 'Trax Staff',
    authorRole: a.author?.role || 'Reporter',
    authorAvatar: a.author?.avatar || null,
    officialLink: a.officialLink || null,
    eventDate: a.eventDate || null,
    date: a.publishedAt
      ? new Date(a.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'UTC',
        })
      : 'June 5, 2026',
    publishedAt: a.publishedAt || undefined,
    readTime: a.readTime || '5 min read',
    image: isBrokenImageUrl(a.image) ? FALLBACK_IMAGE : a.image,
    featured: a.featured,
    breaking: a.breaking,
    trending: a.trending,
    body: a.body,
  } as Article;
}
