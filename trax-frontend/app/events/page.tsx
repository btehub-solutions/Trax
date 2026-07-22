import type { Metadata } from 'next'
import EventsPageLayout from '@/components/ui/EventsPageLayout'
import { getDbArticles } from '@/lib/api'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Tech Events in Ogun State',
  description:
    'Hackathons, summits, and founder meetups across Ogun State. Get alerts when registrations open.',
  path: '/events',
})

const upcomingTypes = [
  {
    title: 'Abeokuta AI Hackathon',
    focus: 'Local LLMs and AgriTech',
    status: 'Planning phase, Q3 2026',
    desc: 'A weekend build session for engineers, researchers, and agronomists developing local-first solutions.',
  },
  {
    title: 'Rock City Tech Summit',
    focus: 'Founders, investors, policymakers',
    status: 'Core planning, Q4 2026',
    desc: 'Ogun State premier ecosystem gathering with startup sandboxes, policy panels, and venture sessions.',
  },
  {
    title: 'Ogun Dev and Founder Meetups',
    focus: 'Ecosystem networking',
    status: 'Monthly mixers',
    desc: 'Bi-weekly corridor mixers for demos, operator notes, and pitch practice across local hubs.',
  },
]

export default async function EventsPage() {
  const articles = await getDbArticles('events')

  return (
    <EventsPageLayout
      articles={articles}
      upcomingTypes={upcomingTypes}
    />
  )
}
