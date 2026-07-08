import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArticleReader from '@/components/ArticleReader'
import JsonLd from '@/components/seo/JsonLd'
import {
  fetchArticleBySlug,
  fetchArticles,
  getRelatedArticles,
  REVALIDATE_SECONDS,
} from '@/lib/server-api'
import { articleJsonLd, pageMetadata } from '@/lib/seo'

export const revalidate = REVALIDATE_SECONDS

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchArticleBySlug(slug)
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
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await fetchArticleBySlug(slug)

  if (!article) notFound()

  const allArticles = await fetchArticles({ limit: 50 })
  const related = await getRelatedArticles(slug, article.category, allArticles)

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          excerpt: article.excerpt,
          slug: article.slug,
          image: article.image,
          date: article.date,
          publishedAt: article.publishedAt,
          author: article.author,
          category: article.category,
        })}
      />
      <ArticleReader article={article} related={related} />
    </>
  )
}
