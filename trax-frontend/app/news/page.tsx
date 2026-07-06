import type { Metadata } from 'next'
import { getDbArticles } from '@/lib/api'

export const dynamic = 'force-dynamic';
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech News & Updates | TRAX',
  description: "The latest news, reports, and breakthroughs in the Ogun State's AI ecosystem.",
}

export default async function NewsPage() {
  const articles = await getDbArticles()

  return (
    <CategoryPageLayout
      title="Latest Tech News"
      description="Stay updated with the latest breakthroughs, startup developments, and ecosystem updates across Nigeria and the wider Ogun State's region."
      categoryName="News"
      articles={articles}
    />
  )
}
