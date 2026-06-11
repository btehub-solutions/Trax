import type { Metadata } from 'next'
import { getDbArticles } from '@/lib/api'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech Ecosystem in Ogun State | Trax',
  description: 'Exploring the tech clusters, talent networks, hubs, and institutions building Ogun State\'s AI infrastructure.',
}

export default async function EcosystemPage() {
  const articles = await getDbArticles('ecosystem')

  return (
    <CategoryPageLayout
      title="Tech & Talent Ecosystem"
      description="Deep dives into the communities, universities, tech hubs, and collaborative networks accelerating technology across the state."
      categoryName="Ecosystem"
      articles={articles}
    />
  )
}
