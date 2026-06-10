import type { Metadata } from 'next'
import { articles } from '@/lib/articles'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: "Ogun State's Startups | Trax",
  description: 'Track the founders, builders, and platforms creating the next generation of AI products in Ogun State.',
}

export default function StartupsPage() {
  const startupArticles = articles.filter((a) =>
    ['Ecosystem', 'Profiles', 'Funding'].includes(a.category)
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
