import type { Metadata } from 'next'
import CategoryPageLayout, { type CategoryFilter } from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Tech Pioneers, Founders & Interviews',
  description:
    'In-depth interviews, executive profiles, and operator stories from founders and technologists shaping Africa and the world.',
  path: '/people',
})

const peopleFilters: CategoryFilter[] = [
  { id: 'all', label: 'All', categories: ['People', 'Profiles', 'Interview'] },
  { id: 'profiles', label: 'Profiles', categories: ['Profiles', 'People'] },
  { id: 'interviews', label: 'Interviews', categories: ['Interview'] },
]

export default async function PeoplePage() {
  const articles = await getDbArticles()
  const peopleArticles = articles.filter((article) =>
    ['Profiles', 'Interview', 'People'].includes(article.category),
  )

  return (
    <CategoryPageLayout
      title="People & Profiles"
      description="Founder profiles, executive dialogues, and the engineers driving technology ecosystems forward."
      categoryName="People"
      articles={peopleArticles}
      filters={peopleFilters}
    />
  )
}
