import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import ArticleReader from '@/components/ArticleReader'
import JsonLd from '@/components/seo/JsonLd'
import {
  fetchArticleBySlug,
  fetchDraftArticleBySlug,
  fetchArticles,
  getAdjacentArticles,
  getRelatedArticles,
} from '@/lib/server-api'
import { articleJsonLd, pageMetadata } from '@/lib/seo'
import type { Article } from '@/lib/articles'

export const revalidate = 60

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ preview?: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const isPreview = resolvedSearchParams.preview === 'true'

  let article: Article | null = null
  if (isPreview) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (token) {
      article = await fetchDraftArticleBySlug(slug, token)
    }
  } else {
    article = await fetchArticleBySlug(slug)
  }

  if (!article) return { title: 'Article Not Found' }

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/articles/${slug}`,
    image: article.image,
    type: 'article',
  })
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ preview?: string }>
}) {
  const { slug } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const isPreview = resolvedSearchParams.preview === 'true'

  let article: Article | null = null
  if (isPreview) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (token) {
      article = await fetchDraftArticleBySlug(slug, token)
    }
  } else {
    article = await fetchArticleBySlug(slug)
  }

  if (!article) notFound()

  const allArticles = await fetchArticles({ limit: 50 })
  const related = await getRelatedArticles(slug, article.category, allArticles)
  const { prev, next } = getAdjacentArticles(slug, allArticles)

  return (
    <>
      <JsonLd
          data={articleJsonLd({
            title: article.title,
            excerpt: article.excerpt,
            slug: article.slug,
            image: article.image || '',
            date: article.date,
            publishedAt: article.publishedAt,
            author: article.author,
            category: article.category,
          })}
      />
      <ArticleReader 
        article={article} 
        related={related} 
        prev={prev} 
        next={next} 
        isPreview={isPreview}
      />
    </>
  )
}
