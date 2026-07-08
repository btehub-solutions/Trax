import type { Metadata } from 'next'
import CategoryPageLayout, { type CategoryFilter } from '@/components/CategoryPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'
import { REVALIDATE_SECONDS } from '@/lib/server-api'

export const revalidate = REVALIDATE_SECONDS

export const metadata: Metadata = pageMetadata({
  title: 'Ogun State Tech Pioneers & Interviews',
  description:
    "In-depth interviews and profiles of the engineers, researchers, and founders leading Ogun State's tech initiatives.",
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
      description="Founder profiles, operator interviews, and the people moving Ogun State's tech corridor forward."
      categoryName="People"
      articles={peopleArticles}
      filters={peopleFilters}
    />
  )
}
