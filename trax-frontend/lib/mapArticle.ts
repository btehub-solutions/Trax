import { Article } from './articles';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80';

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
    date: a.publishedAt
      ? new Date(a.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'June 5, 2026',
    publishedAt: a.publishedAt || undefined,
    readTime: a.readTime || '5 min read',
    image: a.image || FALLBACK_IMAGE,
    featured: a.featured,
    breaking: a.breaking,
    trending: a.trending,
    body: a.body,
  } as Article;
}
