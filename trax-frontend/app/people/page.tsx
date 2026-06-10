import type { Metadata } from 'next'
import { articles } from '@/lib/articles'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Ogun State Tech Pioneers & Interviews | Trax',
  description: 'In-depth interviews and profiles of the engineers, researchers, and founders leading Ogun State\'s tech initiatives.',
}

export default function PeoplePage() {
  const peopleArticles = articles.filter((a) =>
    ['Profiles', 'Interview'].includes(a.category)
  )

  return (
    <CategoryPageLayout
      title="People & Profiles"
      description="Exclusive interviews and profile stories of the prominent developers, policy advocates, researchers, and executives shaping AI in Ogun State."
      categoryName="People"
      articles={peopleArticles}
    />
  )
}
