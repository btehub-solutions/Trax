import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Venture Capital, Funding Rounds & Deals',
  description:
    'Track pre-seed to growth rounds, VC funds, angel syndicates, and capital flows shaping African tech and global markets.',
  path: '/funding',
})
export default async function FundingPage() {
  const articles = await getDbArticles('funding')

  return (
    <CategoryPageLayout
      description="Deal flow, investor syndicates, and institutional capital signals driving high-impact innovation across Africa and the world."
      categoryName="Funding"
      articles={articles}
    />
  )
}
