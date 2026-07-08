import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
import { REVALIDATE_SECONDS } from '@/lib/server-api'

export const revalidate = REVALIDATE_SECONDS

export const metadata: Metadata = pageMetadata({
  title: 'Tech Tools & Developer Resources',
  description:
    "The best tech tools, open-source libraries, and developer resources for Ogun State builders.",
  path: '/tools',
})

export default async function ToolsPage() {
  const articles = await getDbArticles('tools')

  return (
    <CategoryPageLayout
      title="Developer Tools & Resources"
      description="Showcasing practical, bandwidth-efficient developer tools, open-source models, datasets, and platforms built for the Ogun State tech stack."
      categoryName="Tools"
      articles={articles}
    />
  )
}
