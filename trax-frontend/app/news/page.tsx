import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Tech News & Updates',
  description: "The latest news, reports, and breakthroughs in Ogun State's tech ecosystem.",
  path: '/news',
})
export default async function NewsPage() {
  const articles = await getDbArticles('news')

  return (
    <CategoryPageLayout
      description="Reports, analysis, and breaking updates from Ogun State's tech corridor and West Africa."
      categoryName="News"
      articles={articles}
    />
  )
}
