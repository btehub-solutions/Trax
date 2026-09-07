import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Startups & Emerging Tech Ventures',
  description:
    'Track high-growth startups, ambitious builders, and digital ventures launching across Nigeria, Africa, and global emerging corridors.',
  path: '/startups',
})

export default async function StartupsPage() {
  const articles = await getDbArticles()
  const startupArticles = articles.filter((a) =>
    a.category.toLowerCase() === 'startups'
  )

  return (
    <CategoryPageLayout
      title="Startups & Ventures"
      description="Spotlighting the founders, builders, and audacious startups creating breakthrough products across Nigeria, Africa, and beyond."
      categoryName="Startups"
      articles={startupArticles}
    />
  )
}
