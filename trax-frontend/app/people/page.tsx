import type { Metadata } from 'next'
import { getDbArticles } from '@/lib/api'

export const dynamic = 'force-dynamic';
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Ogun State Tech Pioneers & Interviews | Trax',
  description: 'In-depth interviews and profiles of the engineers, researchers, and founders leading Ogun State\'s tech initiatives.',
}

export default async function PeoplePage() {
  const articles = await getDbArticles()
  const peopleArticles = articles.filter((a) =>
    ['Profiles', 'Interview', 'People'].includes(a.category)
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
