import type { Metadata } from 'next'
import { getDbArticles } from '@/lib/api'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech Startup Funding & Deals | Trax',
  description: "Track venture capital investments, seed rounds, and grants flowing into Ogun State's startups.",
}

export default async function FundingPage() {
  const articles = await getDbArticles('funding')

  return (
    <CategoryPageLayout
      title="Funding & Venture Capital"
      description="Tracking institutional VC capital, angel investing, grants, and funding rounds fueling Ogun State's AI startup development."
      categoryName="Funding"
      articles={articles}
    />
  )
}
