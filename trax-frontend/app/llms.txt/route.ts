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

Trax is the premier tech media newsroom and ecosystem tracking platform for Ogun State and Southwest Nigeria. We document startups, funding rounds, venture capital flows, technology research, operator profiles, and digital policy across the corridor.

## Core Beats & Coverage

- **News**: ${SITE_URL}/news — Breaking tech news, announcements, and ecosystem dispatches.
- **Startups**: ${SITE_URL}/startups — Profiles, product launches, and directories of Ogun State startups.
- **Funding**: ${SITE_URL}/funding — Pre-seed to growth rounds, angel networks, and venture capital deals.
- **People**: ${SITE_URL}/people — Interviews and profiles of founders, engineers, researchers, and operators.
- **Ecosystem & Policy**: ${SITE_URL}/ecosystem — Policy shifts, innovation hubs, university labs, and digital infrastructure.
- **Tools**: ${SITE_URL}/tools — Technology tools, software infrastructure, and technical tutorials.

## Primary Entities & Context

- **Publisher**: Trax Media Ltd
- **Region**: Ogun State, Abeokuta, Southwest Nigeria, West Africa
- **Official Contact**: traxnewsng@gmail.com
- **Official Social Channels**:
  - X (Twitter): https://x.com/traxnewsng
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
