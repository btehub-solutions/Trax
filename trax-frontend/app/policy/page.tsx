import type { Metadata } from 'next'
import { getDbArticles } from '@/lib/api'

export const dynamic = 'force-dynamic';
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech Policy & Regulation in Ogun State | Trax',
  description: 'Analysis and reports on tech policy frameworks, ethics, data privacy, and government regulations in Ogun State.',
}

export default async function PolicyPage() {
  const articles = await getDbArticles('policy')

  return (
    <CategoryPageLayout
      title="Policy & Governance"
      description="In-depth reporting and expert analysis on technology frameworks, ethical guidelines, data security laws, and tech regulations."
      categoryName="Policy"
      articles={articles}
    />
  )
}
