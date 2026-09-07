import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticlesBySlugs } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Tech Policy, Governance & Regulation',
  description:
    'Digital rights, data governance, startup regulations, AI governance, and government frameworks shaping technology across Nigeria, Africa, and global markets.',
  path: '/policy',
})

export default async function PolicyPage() {
  const articles = await getDbArticlesBySlugs(['policy'])

  return (
    <CategoryPageLayout
      title="Policy & Regulation"
      description="Digital rights, data governance, startup frameworks, and legislative moves defining the future of technology."
      categoryName="Policy"
      articles={articles}
    />
  )
}
