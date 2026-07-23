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
    title: "Founders' Friday",
    focus: 'Startups & Founder Meetups',
    status: 'Monthly · Last Friday of every month',
    desc: 'A monthly gathering of startup builders, operators, and investors across Ogun State. Features live pitch teardowns, founder office hours, and collaborative problem-solving hosted across local hubs in Abeokuta and the corridor.',
  },
  {
    title: 'Ogun Tech Community (OTC) Week',
    focus: 'Policy, Talent & Ecosystem',
    status: 'Annual · Q4 Summit',
    desc: "The flagship annual convention connecting tech talent, academia, hubs, and government policymakers. Dedicated to advancing ICT policy frameworks, regional expansion, and positioning Ogun State as West Africa's primary tech corridor.",
  },
  {
    title: 'Ogun Digital Summit (ODS)',
    focus: 'Innovation & Future of Work',
    status: 'Annual · November Gathering',
    desc: "One of Southwest Nigeria's largest free technology gatherings, organized by Grazac. Unites thousands of students, early-stage builders, and industry leaders to explore emerging tech, digital skills, and startup ventures.",
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
