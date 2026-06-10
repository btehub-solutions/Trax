import type { Metadata } from 'next'
import { articles } from '@/lib/articles'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech Ecosystem in Ogun State | Trax',
  description: 'Exploring the tech clusters, talent networks, hubs, and institutions building Ogun State\'s AI infrastructure.',
}

export default function EcosystemPage() {
  const ecosystemArticles = articles.filter((a) => a.category === 'Ecosystem')

  return (
    <CategoryPageLayout
      title="Tech & Talent Ecosystem"
      description="Deep dives into the communities, universities, tech hubs, and collaborative networks accelerating technology across the state."
      categoryName="Ecosystem"
      articles={ecosystemArticles}
    />
  )
}
