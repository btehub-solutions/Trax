import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic';
import type { Metadata } from 'next'
import { articles as mockArticles, Article } from '@/lib/articles'
import ArticleReader from '@/components/ArticleReader'
import { BASE_URL } from '@/lib/api'

// Fetch article dynamically from backend, fallback to mock articles
async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${BASE_URL}/articles/${slug}`, {
      next: { revalidate: 10 },
    })
    if (!res.ok) throw new Error('Article not found in backend')
    const a = await res.json()
    if (a) {
      return {
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        category: a.category?.name || 'Ecosystem',
        author: a.author?.name || 'Trax Staff',
        authorRole: a.author?.authorRole || 'Reporter',
        authorAvatar: a.author?.avatar || null,
        officialLink: a.officialLink || null,
        date: a.publishedAt
          ? new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : 'June 5, 2026',
        readTime: a.readTime || '5 min read',
        image: a.image || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80',
        featured: a.featured,
        breaking: a.breaking,
        trending: a.trending,
        body: a.body,
      } as any
    }
  } catch (err: any) {
    console.warn(`Backend API failed to load article "${slug}":`, err.message || err)
  }
  return mockArticles.find((a) => a.slug === slug) || null
}

// Fetch all articles to generate related list
async function getRelatedArticles(currentSlug: string, category: string): Promise<Article[]> {
  let all = mockArticles
  try {
    const res = await fetch(`${BASE_URL}/articles?limit=50`, {
      next: { revalidate: 10 },
    })
    if (res.ok) {
      const json = await res.json()
      if (json && json.data && json.data.length > 0) {
        all = json.data.map((a: any) => ({
          id: a.id,
          slug: a.slug,
          title: a.title,
          excerpt: a.excerpt,
          category: a.category?.name || 'Ecosystem',
          author: a.author?.name || 'Trax Staff',
          authorRole: a.author?.authorRole || 'Reporter',
          date: a.publishedAt
            ? new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            : 'June 5, 2026',
          readTime: a.readTime || '5 min read',
          image: a.image || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80',
          featured: a.featured,
          breaking: a.breaking,
          trending: a.trending,
        }))
      }
    }
  } catch (_) {}

  return [
    ...all.filter((a) => a.slug !== currentSlug && a.category === category),
    ...all.filter((a) => a.slug !== currentSlug && a.category !== category),
  ].slice(0, 3)
}

// ── Static generation ─────────────────────────────────────────────────────────
export function generateStaticParams() {
  return mockArticles.map((a) => ({ slug: a.slug }))
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
