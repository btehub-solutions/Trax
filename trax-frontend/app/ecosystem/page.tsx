import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticlesBySlugs } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Tech Ecosystem, Hubs & Infrastructure',
  description:
    'Policy, innovation hubs, talent networks, and digital infrastructure shaping tech ecosystems across Nigeria, Africa, and global frontiers.',
  path: '/ecosystem',
})

export default async function EcosystemPage() {
  const articles = await getDbArticlesBySlugs(['ecosystem', 'policy'])

  return (
    <CategoryPageLayout
      title="Ecosystem & Policy"
      description="Policy frameworks, innovation hubs, talent networks, and structural signals accelerating digital economies."
      categoryName="Ecosystem"
      articles={articles}
    />
  )
}
