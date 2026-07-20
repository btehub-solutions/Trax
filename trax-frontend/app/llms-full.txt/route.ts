import { NextResponse } from 'next/server'
import { fetchArticles, SITE_URL } from '@/lib/server-api'
import { siteConfig } from '@/lib/seo'

export const revalidate = 300

export async function GET() {
  const articles = await fetchArticles({ limit: 50 })

  const detailedArticles = articles
    .map(
      (a) => `### [${a.title}](${SITE_URL}/articles/${a.slug})
- **Category**: ${a.category}
- **Author**: ${a.author || 'Trax Editorial Desk'}
- **Date**: ${a.publishedAt || a.date}
- **Excerpt**: ${a.excerpt || ''}
- **URL**: ${SITE_URL}/articles/${a.slug}
`
    )
    .join('\n\n---\n\n')

  const content = `# ${siteConfig.name} — Full Knowledge & Article Index

> ${siteConfig.description}

This document provides a comprehensive textual index of Trax's coverage of Ogun State's tech ecosystem, designed for AI search models, agents, and LLMs requiring full contextual background.

## Organization Identity
- **Name**: Trax Media Ltd
- **Domain**: ${SITE_URL}
- **Focus**: Ogun State Tech Movement, Nigeria Startups, Venture Capital, Digital Policy, Abeokuta Innovation Corridor
- **Editorial Email**: traxnewsng@gmail.com
- **Verified Social Media**:
  - X (Twitter): https://x.com/traxnewsng
  - LinkedIn: https://www.linkedin.com/in/traxnewsng
  - Instagram: https://www.instagram.com/traxnewsng
  - YouTube: https://youtube.com/@traxnewsng

## Full Article Index (${articles.length} Recent Stories)

${detailedArticles}
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
