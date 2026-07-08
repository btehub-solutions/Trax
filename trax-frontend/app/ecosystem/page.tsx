import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticlesBySlugs } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Tech Ecosystem & Policy in Ogun State',
  description:
    "Policy, hubs, talent networks, and institutions shaping Ogun State's tech corridor.",
  path: '/ecosystem',
})

export default async function EcosystemPage() {
  const articles = await getDbArticlesBySlugs(['ecosystem', 'policy'])

  return (
    <CategoryPageLayout
      title="Ecosystem & Policy"
      description="Policy frameworks, tech hubs, talent networks, and the community signals accelerating innovation across Ogun State."
      categoryName="Ecosystem"
      articles={articles}
    />
  )
}
