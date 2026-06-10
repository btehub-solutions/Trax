import type { Metadata } from 'next'
import { articles } from '@/lib/articles'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech Policy & Regulation in Ogun State | Trax',
  description: 'Analysis and reports on tech policy frameworks, ethics, data privacy, and government regulations in Ogun State.',
}

export default function PolicyPage() {
  const policyArticles = articles.filter((a) => a.category === 'Policy')

  return (
    <CategoryPageLayout
      title="Policy & Governance"
      description="In-depth reporting and expert analysis on technology frameworks, ethical guidelines, data security laws, and tech regulations."
      categoryName="Policy"
      articles={policyArticles}
    />
  )
}
