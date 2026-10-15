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
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'Google-Extended',
          'Applebot',
          'Applebot-Extended',
          'cohere-ai',
          'Meta-ExternalAgent',
          'FacebookBot',
          'Amazonbot',
          'Bytespider',
        ],
        allow: '/',
        disallow: ['/dashboard', '/login', '/design-system'],
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/news-sitemap.xml`,
    ],
    host: SITE_URL,
  }
}
