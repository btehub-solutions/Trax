import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
import { REVALIDATE_SECONDS } from '@/lib/server-api'

export const revalidate = REVALIDATE_SECONDS

export const metadata: Metadata = pageMetadata({
  title: "Ogun State's Startups",
  description:
    'Track the founders, builders, and platforms creating the next generation of tech products in Ogun State.',
  path: '/startups',
})

export default async function StartupsPage() {
  const articles = await getDbArticles()
  const startupArticles = articles.filter((a) =>
    a.category.toLowerCase() === 'startups'
  )

  return (
    <CategoryPageLayout
      title="Startups & Ventures"
      description="Spotlighting the founders, builders, and companies building cutting-edge technology platforms for the Ogun State market."
      categoryName="Startups"
      articles={startupArticles}
    />
  )
}
