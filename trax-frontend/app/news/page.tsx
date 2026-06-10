import type { Metadata } from 'next'
import { articles } from '@/lib/articles'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech News & Updates | Trax',
  description: "The latest news, reports, and breakthroughs in the Ogun State's AI ecosystem.",
}

export default function NewsPage() {
  return (
    <CategoryPageLayout
      title="Latest Tech News"
      description="Stay updated with the latest breakthroughs, startup developments, and ecosystem updates across Nigeria and the wider Ogun State's region."
      categoryName="News"
      articles={articles}
    />
  )
}
