import type { Metadata } from 'next'
import { getDbArticles } from '@/lib/api'

export const dynamic = 'force-dynamic';
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech Tools & Tech Stack | TRAX',
  description: "The best tech tools, open-source models, and developer resources tailored for Ogun State's networks and environments.",
}

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
