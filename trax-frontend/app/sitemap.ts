import type { MetadataRoute } from 'next'
import { fetchArticleSlugs, SITE_URL } from '@/lib/server-api'

const STATIC_ROUTES = [
  '',
  '/news',
  '/startups',
  '/funding',
  '/people',
  '/ecosystem',
  '/policy',
  '/tools',
  '/events',
  '/health',
  '/research',
  '/press',
  '/podcast',
  '/map',
  '/about',
  '/advertise',
  '/team',
  '/careers',
  '/newsletter',
  '/newsletter/confirm',
  '/newsletter/unsubscribe',
  '/search',
  '/privacy',
  '/terms',
  '/cookies',
  '/feed.xml',
  '/llms.txt',
  '/llms-full.txt',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await fetchArticleSlugs()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'hourly' : 'daily',
    priority: path === '' ? 1 : 0.8,
  }))

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticEntries, ...articleEntries]
}
