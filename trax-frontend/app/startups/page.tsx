import type { Metadata } from 'next'
import { getDbArticles } from '@/lib/api'

export const dynamic = 'force-dynamic';
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: "Ogun State's Startups | TRAX",
  description: 'Track the founders, builders, and platforms creating the next generation of AI products in Ogun State.',
}

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
