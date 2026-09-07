import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'HealthTech, Digital Medicine & Biotech',
  description: 'The latest HealthTech developments, telemedicine breakthroughs, biotech innovations, and digital healthcare across Nigeria, Africa, and global frontiers.',
  path: '/health',
})

export default async function HealthPage() {
  const articles = await getDbArticles('health')

  return (
    <CategoryPageLayout
      title="HealthTech"
      description="Spotlighting digital health innovations, clinical AI, telemedicine systems, and biotech breakthroughs advancing healthcare across Africa and globally."
      categoryName="Health"
      articles={articles}
    />
  )
}
