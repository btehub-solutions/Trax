import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Funding Rounds & Venture Capital',
  description:
    'Track seed rounds, grants, and capital flows into Ogun State startups and West African tech.',
  path: '/funding',
})
export default async function FundingPage() {
  const articles = await getDbArticles('funding')

  return (
    <CategoryPageLayout
      description="Deal flow, investor moves, and capital signals shaping startups across Ogun State and West Africa."
      categoryName="Funding"
      articles={articles}
    />
  )
}
