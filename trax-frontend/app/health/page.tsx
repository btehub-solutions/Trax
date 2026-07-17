import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Digital Health & HealthTech',
  description: "The latest HealthTech developments, digital medicine, and health innovations in Ogun State.",
  path: '/health',
})

export default async function HealthPage() {
  const articles = await getDbArticles('health')

  return (
    <CategoryPageLayout
      title="HealthTech"
      description="Spotlighting digital health innovations, telemedicine services, and medical technology built for Ogun State and West Africa."
      categoryName="Health"
      articles={articles}
    />
  )
}
