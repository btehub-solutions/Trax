import { NextResponse } from 'next/server'
import { fetchArticles, SITE_URL } from '@/lib/server-api'
import { siteConfig } from '@/lib/seo'

export const revalidate = 300

export async function GET() {
  const articles = await fetchArticles({ limit: 25 })

  const articleList = articles
    .map(
      (a) =>
        `- [${a.title}](${SITE_URL}/articles/${a.slug}): ${a.excerpt ? a.excerpt.slice(0, 140) + '…' : 'Story from the corridor'}`
    )
    .join('\n')

  const content = `# ${siteConfig.name}

> ${siteConfig.description}

Trax is an independent tech media platform and intelligence newsroom covering technology, startups, venture capital, and innovation across Nigeria, Africa, and the global ecosystem. We document high-impact builders, venture capital flows, technological breakthroughs, events, and digital policy.

## Core Beats & Coverage

- **News**: ${SITE_URL}/news — Breaking tech news, announcements, and dispatches across Nigeria, Africa, and worldwide.
- **Startups**: ${SITE_URL}/startups — Profiles, product launches, and directories of Nigerian, African, and international startups.
- **Funding**: ${SITE_URL}/funding — Pre-seed to growth rounds, venture capital funds, and dealflow shaping digital markets.
- **Events**: ${SITE_URL}/events — Tech conferences, summits, meetups, and hackathons across African capitals and global tech hubs.
- **People**: ${SITE_URL}/people — Interviews and profiles of founders, engineers, investors, and operators.
- **Ecosystem & Policy**: ${SITE_URL}/ecosystem — Policy shifts, digital governance, innovation hubs, and tech infrastructure.
- **Tools**: ${SITE_URL}/tools — Software tools, developer platforms, and technical frameworks.

## Primary Entities & Context

- **Publisher**: Trax Media Ltd
- **Coverage Region**: Nigeria, Pan-Africa, Global Emerging & Developed Tech Corridors
- **Official Contact**: traxnewsng@gmail.com
- **Official Social Channels**:
  - X (Twitter): https://x.com/traxnewsng
  - LinkedIn: https://www.linkedin.com/in/traxnewsng
  - Instagram: https://www.instagram.com/traxnewsng
  - YouTube: https://youtube.com/@traxnewsng

## Latest Dispatches & Articles

${articleList}

## Machine Reading Resources

- **Full LLM Context**: ${SITE_URL}/llms-full.txt
- **RSS Feed**: ${SITE_URL}/feed.xml
- **XML Sitemap**: ${SITE_URL}/sitemap.xml
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
