import type { Metadata } from 'next'
import { articles } from '@/lib/articles'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech Tools & Tech Stack | Trax',
  description: "The best tech tools, open-source models, and developer resources tailored for Ogun State's networks and environments.",
}

export default function ToolsPage() {
  const toolsArticles = articles.filter((a) => a.category === 'Tools')

  return (
    <CategoryPageLayout
      title="Developer Tools & Resources"
      description="Showcasing practical, bandwidth-efficient developer tools, open-source models, datasets, and platforms built for the Ogun State tech stack."
      categoryName="Tools"
      articles={toolsArticles}
    />
  )
}
