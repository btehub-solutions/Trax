import { NextResponse } from 'next/server'
import { fetchArticles, SITE_URL } from '@/lib/server-api'

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

  // Google News standard: Articles published within the past 48 hours.
  // Fallback to the 20 most recent stories if fewer than 3 stories fall in the strict 48h window.
  const twoDaysAgo = Date.now() - 48 * 60 * 60 * 1000
  const recentStories = articles.filter((a) => {
    const pub = a.publishedAt || a.date
    if (!pub) return false
    const time = new Date(pub).getTime()
    return !isNaN(time) && time >= twoDaysAgo
  })

  const storiesForNewsSitemap = recentStories.length >= 3 ? recentStories : articles.slice(0, 20)

  const items = storiesForNewsSitemap
    .map((article) => {
      const url = `${SITE_URL}/articles/${article.slug}`
      const pubDate = article.publishedAt
        ? new Date(article.publishedAt).toISOString()
        : article.date
          ? new Date(article.date).toISOString()
          : new Date().toISOString()

      return `  <url>
    <loc>${escapeXml(url)}</loc>
    <news:news>
      <news:publication>
        <news:name>Trax</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
