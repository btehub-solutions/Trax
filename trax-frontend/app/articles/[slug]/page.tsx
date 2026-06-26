import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { articles as mockArticles, Article } from '@/lib/articles'
import { mapApiArticle } from '@/lib/mapArticle'
import ArticleReader from '@/components/ArticleReader'
import { BASE_URL } from '@/lib/api'

export const dynamic = 'force-dynamic';

// Fetch article dynamically from backend, fallback to mock articles
async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${BASE_URL}/articles/${slug}`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Article not found in backend')
    const a = await res.json()
    if (a) {
      return mapApiArticle(a)
    }
  } catch (err: any) {
    console.warn(`Backend API failed to load article "${slug}":`, err.message || err)
  }
  return mockArticles.find((a) => a.slug === slug) || null
}

// Fetch all articles to generate related list
async function getRelatedArticles(currentSlug: string, category: string): Promise<Article[]> {
  let all: Article[] = []
  let apiSucceeded = false
  try {
    const res = await fetch(`${BASE_URL}/articles?limit=50`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const json = await res.json()
      if (json && json.data) {
        all = json.data.map(mapApiArticle)
        apiSucceeded = true
      }
    }
  } catch (_) {}

  if (!apiSucceeded) {
    all = mockArticles
  }

  return [
    ...all.filter((a) => a.slug !== currentSlug && a.category === category),
    ...all.filter((a) => a.slug !== currentSlug && a.category !== category),
  ].slice(0, 3)
}

// ── Per-page metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article  = await getArticle(slug)
  if (!article) return { title: 'Article Not Found | Trax' }

  return {
    title:       `${article.title} | Trax`,
    description: article.excerpt,
    openGraph: {
      title:       article.title,
      description: article.excerpt,
      images:      [{ url: article.image, width: 900, height: 500 }],
      type:        'article',
      locale:      'en_NG',
    },
    twitter: {
      card:        'summary_large_image',
      title:       article.title,
      description: article.excerpt,
      images:      [article.image],
      site:        '@traxnewsng',
      creator:     '@traxnewsng',
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug }  = await params
  const article   = await getArticle(slug)

  if (!article) notFound()

  const related = await getRelatedArticles(slug, article.category)

  return <ArticleReader article={article} related={related} />
}

