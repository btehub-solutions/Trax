import type { Metadata } from 'next'
import CategoryPageLayout from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Tech Tools, Software & Developer Resources',
  description:
    'The best developer tools, open-source libraries, cloud platforms, and engineering resources for modern tech builders.',
  path: '/tools',
})

export default async function ToolsPage() {
  const articles = await getDbArticles('tools')

  return (
    <CategoryPageLayout
      title="Developer Tools & Resources"
      description="Showcasing high-leverage developer tools, open-source frameworks, machine learning models, and modern cloud infrastructure."
      categoryName="Tools"
      articles={articles}
    />
  )
}
