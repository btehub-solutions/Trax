import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/server-api'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/login', '/design-system', '/api/v1/admin'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended'],
        allow: '/',
        disallow: ['/dashboard', '/login', '/design-system'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
