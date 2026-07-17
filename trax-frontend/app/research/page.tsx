import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Academic Research & ML Breakthroughs',
  description: "Academic papers, technical research, and machine learning breakthroughs from Ogun State builders.",
  path: '/research',
})

export default async function ResearchPage() {
  const articles = await getDbArticles('research')

  return (
    <CategoryPageLayout
      title="Research"
      description="Exploring technical research papers, open-source models, dataset curations, and scientific breakthroughs across the corridor."
      categoryName="Research"
      articles={articles}
    />
  )
}
