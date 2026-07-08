import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticlesBySlugs } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Policy & Regulation in Ogun State',
  description:
    'Digital rights, data governance, startup regulation, and government frameworks shaping innovation across Ogun State.',
  path: '/policy',
})

export default async function PolicyPage() {
  const articles = await getDbArticlesBySlugs(['policy'])

  return (
    <CategoryPageLayout
      title="Policy & Regulation"
      description="Digital rights, data governance, startup regulation, and government frameworks shaping how innovation moves across Ogun State's tech corridor."
      categoryName="Policy"
      articles={articles}
    />
  )
}
