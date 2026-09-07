import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'AI, Machine Learning & Technical Research',
  description: 'Academic papers, technical research, AI safety, machine learning advancements, and scientific breakthroughs from Africa and global research labs.',
  path: '/research',
})

export default async function ResearchPage() {
  const articles = await getDbArticles('research')

  return (
    <CategoryPageLayout
      title="Research & AI"
      description="Exploring foundational papers, open-source model evaluations, dataset benchmarks, and breakthroughs in artificial intelligence and computing."
      categoryName="Research"
      articles={articles}
    />
  )
}
