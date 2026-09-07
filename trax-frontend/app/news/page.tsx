import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Tech News & Breaking Dispatches',
  description: 'Breaking technology news, market analysis, and ecosystem updates across Nigeria, Africa, and global frontiers.',
  path: '/news',
})
export default async function NewsPage() {
  const articles = await getDbArticles('news')

  return (
    <CategoryPageLayout
      description="Breaking reports, deep analysis, and technology dispatches from across Nigeria, Africa, and global tech hubs."
      categoryName="News"
      articles={articles}
    />
  )
}
