import { cache } from 'react'
import { articles as mockArticles, type Article } from './articles'
import { mapApiArticle } from './mapArticle'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://trax.ng').replace(/\/$/, '')
/** Revalidate editorial pages every 60s — fresh enough, much faster than force-dynamic */
export const REVALIDATE_SECONDS = 60

type FetchOptions = {
  revalidate?: number
  tags?: string[]
}

async function serverFetch<T>(path: string, options: FetchOptions = {}): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: {
        revalidate: options.revalidate ?? REVALIDATE_SECONDS,
        tags: options.tags,
      },
    })
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch {
    return null
  }
}

export interface PressArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  image?: string
  publishedAt: string
  partner?: { id: string; name: string; logoUrl?: string; website?: string }
}

export const DEMO_PRESS: PressArticle[] = [
  {
    id: 'press-demo-1',
    slug: 'vant-global-recognition',
    title: 'Vant earns global recognition for climate-insurance innovation',
    excerpt: '',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=85',
    publishedAt: '2026-06-29',
    partner: { id: 'p1', name: 'Vant', logoUrl: '' },
  },
  {
    id: 'press-demo-2',
    slug: 'neyi-hub-partnership',
    title: 'N.E.Y.I Techpreneurship Hub signs strategic partnership to accelerate Ogun startups',
    excerpt: '',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop&q=85',
    publishedAt: '2026-07-02',
    partner: { id: 'p2', name: 'N.E.Y.I Hub', logoUrl: '' },
  },
  {
    id: 'press-demo-3',
    slug: 'state-tech-summit',
    title: 'Ogun State hosts inaugural corridor tech summit with 40 exhibiting teams',
    excerpt: '',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop&q=85',
    publishedAt: '2026-06-20',
    partner: { id: 'p3', name: 'Partner', logoUrl: '' },
  },
]

function mapPressArticle(a: {
  id: string
  slug: string
  title: string
  excerpt?: string
  image?: string
  publishedAt: string
  partner?: PressArticle['partner']
}): PressArticle {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? '',
    image: a.image,
    publishedAt: a.publishedAt,
    partner: a.partner,
  }
}

export const fetchArticles = cache(async (params?: {
  limit?: number
  category?: string
}): Promise<Article[]> => {
  const limit = params?.limit ?? 50
  const query = params?.category
    ? `category=${encodeURIComponent(params.category)}&limit=${limit}`
    : `limit=${limit}`

  const json = await serverFetch<{ data: unknown[] }>(`/articles?${query}`, {
    tags: ['articles'],
  })

  if (json?.data?.length) {
    return json.data.map(mapApiArticle)
  }

  if (params?.category) {
    return mockArticles.filter(
      (a) => a.category.toLowerCase() === params.category!.toLowerCase(),
    )
  }

  return mockArticles
})

export const fetchArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const article = await serverFetch<unknown>(`/articles/${slug}`, {
    tags: ['articles', `article-${slug}`],
  })

  if (article) return mapApiArticle(article)
  return mockArticles.find((a) => a.slug === slug) ?? null
})

export const fetchPressArticles = cache(async (limit = 6): Promise<{
  articles: PressArticle[]
  isDemo: boolean
}> => {
  const json = await serverFetch<{ data: unknown[] }>(
    `/articles?isSponsored=true&limit=${limit}`,
    { tags: ['press'] },
  )

  const data = json?.data ?? []
  if (data.length > 0) {
    return {
      articles: data.map((a) => mapPressArticle(a as Parameters<typeof mapPressArticle>[0])),
      isDemo: false,
    }
  }

  return { articles: DEMO_PRESS, isDemo: true }
})

export const fetchPressPageData = cache(async (): Promise<{
  articles: PressArticle[]
  partners: { id: string; name: string; logoUrl?: string }[]
}> => {
  const [partnersJson, articlesJson] = await Promise.all([
    serverFetch<unknown[]>('/partners/active', { tags: ['partners'] }),
    serverFetch<{ data: unknown[] }>('/articles?isSponsored=true&limit=50', { tags: ['press'] }),
  ])

  const partners = Array.isArray(partnersJson)
    ? partnersJson.map((p) => p as { id: string; name: string; logoUrl?: string })
    : []
  const articles = (articlesJson?.data ?? []).map((a) =>
    mapPressArticle(a as Parameters<typeof mapPressArticle>[0]),
  )

  if (articles.length > 0) {
    return { articles, partners }
  }

  return {
    articles: DEMO_PRESS,
    partners: [
      { id: 'p1', name: 'Vant', logoUrl: '' },
      { id: 'p2', name: 'N.E.Y.I Hub', logoUrl: '' },
      { id: 'p3', name: 'Corridor Summit', logoUrl: '' },
    ],
  }
})

export const fetchArticleSlugs = cache(async (): Promise<
  { slug: string; publishedAt?: string }[]
> => {
  const json = await serverFetch<{ data: { slug: string; publishedAt?: string }[] }>(
    '/articles?limit=200',
    { tags: ['articles'] },
  )
  return json?.data?.map((a) => ({ slug: a.slug, publishedAt: a.publishedAt })) ?? []
})

export async function getRelatedArticles(
  currentSlug: string,
  category: string,
  allArticles?: Article[],
): Promise<Article[]> {
  const all = allArticles ?? (await fetchArticles({ limit: 50 }))

  return [
    ...all.filter((a) => a.slug !== currentSlug && a.category === category),
    ...all.filter((a) => a.slug !== currentSlug && a.category !== category),
  ].slice(0, 3)
}
