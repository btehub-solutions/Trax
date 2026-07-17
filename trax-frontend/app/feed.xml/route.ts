import { NextResponse } from 'next/server'
import { fetchArticles, SITE_URL } from '@/lib/server-api'
import { siteConfig } from '@/lib/seo'

export const revalidate = 300

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const articles = await fetchArticles({ limit: 50 })

  const buildItem = (article: Awaited<ReturnType<typeof fetchArticles>>[number]) => {
    const url = SITE_URL + '/articles/' + article.slug
    let pubDate: string
    if (article.publishedAt) {
      pubDate = new Date(article.publishedAt).toUTCString()
    } else if (article.date) {
      pubDate = new Date(article.date).toUTCString()
    } else {
      pubDate = new Date().toUTCString()
    }
    const enclosure =
      article.image && article.image.startsWith('http')
        ? '<enclosure url="' + escapeXml(article.image) + '" type="image/jpeg" />'
        : ''
    return [
      '    <item>',
      '      <title>' + escapeXml(article.title) + '</title>',
      '      <link>' + escapeXml(url) + '</link>',
      '      <guid isPermaLink="true">' + escapeXml(url) + '</guid>',
      '      <description>' + escapeXml(article.excerpt ?? '') + '</description>',
      '      <pubDate>' + pubDate + '</pubDate>',
      '      <category>' + escapeXml(article.category) + '</category>',
      '      <author>trax@trax.ng (' + escapeXml(article.author) + ')</author>',
      enclosure ? '      ' + enclosure : '',
      '    </item>',
    ].filter(Boolean).join('\n')
  }

  const items = articles.map(buildItem).join('\n\n')

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"',
    '  xmlns:atom="http://www.w3.org/2005/Atom"',
    '  xmlns:content="http://purl.org/rss/1.0/modules/content/"',
    '  xmlns:media="http://search.yahoo.com/mrss/">',
    '  <channel>',
    '    <title>' + escapeXml(siteConfig.title) + '</title>',
    '    <link>' + SITE_URL + '</link>',
    '    <description>' + escapeXml(siteConfig.description) + '</description>',
    '    <language>en-ng</language>',
    '    <lastBuildDate>' + new Date().toUTCString() + '</lastBuildDate>',
    '    <ttl>300</ttl>',
    '    <image>',
    '      <url>' + SITE_URL + '/opengraph-image</url>',
    '      <title>' + escapeXml(siteConfig.name) + '</title>',
    '      <link>' + SITE_URL + '</link>',
    '    </image>',
    '    <atom:link href="' + SITE_URL + '/feed.xml" rel="self" type="application/rss+xml" />',
    items,
    '  </channel>',
    '</rss>',
  ].join('\n')

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
