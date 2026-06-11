import type { Metadata } from 'next'
import { getDbArticles } from '@/lib/api'

export const dynamic = 'force-dynamic';
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech Events & Conferences in Ogun State | Trax',
  description: 'Coverage of major tech events, summits, panels, and developer hackathons across Nigeria and Ogun State.',
}

export default async function EventsPage() {
  const articles = await getDbArticles('events')

  return (
    <CategoryPageLayout
      title="Conferences & Gatherings"
      description="Stay tuned with key summaries, announcements, speaker insights, and coverage from Ogun State's leading tech summits and meetups."
      categoryName="Events"
      articles={articles}
    />
  )
}
