import type { Metadata } from 'next'
import { articles } from '@/lib/articles'
import CategoryPageLayout from '@/components/CategoryPageLayout'

export const metadata: Metadata = {
  title: 'Tech Events & Conferences in Ogun State | Trax',
  description: 'Coverage of major tech events, summits, panels, and developer hackathons across Nigeria and Ogun State.',
}

export default function EventsPage() {
  const eventsArticles = articles.filter((a) => a.category === 'Events')

  return (
    <CategoryPageLayout
      title="Conferences & Gatherings"
      description="Stay tuned with key summaries, announcements, speaker insights, and coverage from Ogun State's leading tech summits and meetups."
      categoryName="Events"
      articles={eventsArticles}
    />
  )
}
