'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import CategoryEmptyState from '@/components/ui/CategoryEmptyState'
import NewsletterSection from '@/components/ui/NewsletterSection'
import NewsletterSubscribeFields from '@/components/newsletter/NewsletterSubscribeFields'
import { SectionBand } from '@/design-system/components'
import SectionMarker from '@/design-system/components/SectionMarker'
import { staggerGrid, viewportGrid } from '@/design-system/motion'
import { useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'
import type { Article } from '@/lib/articles'

interface UpcomingEvent {
  title: string
  focus: string
  status: string
  desc: string
}

interface EventsPageLayoutProps {
  articles: Article[]
  upcomingTypes: UpcomingEvent[]
}

export default function EventsPageLayout({
  articles,
  upcomingTypes,
}: EventsPageLayoutProps) {
  const grid = useMotionVariants(staggerGrid, 'staggerGrid')

  return (
    <div className="ds-platform-page ds-premium-home">
      <SectionBand variant="default">
        <div className="container ds-platform-page__intro">
          <div className="ds-platform-page__intro-copy">
            <p className="ds-category-label">Tech calendar</p>
            <h1 className="ds-platform-page__title">
              Connecting Ogun State&apos;s tech leaders
            </h1>
            <p className="type-excerpt ds-platform-page__desc">
              Curated events across the corridor: hackathons, summits, and founder meetups.
              Sign up for early access to tickets and registration alerts.
            </p>
          </div>

          <div className="ds-premium-panel ds-platform-page__signup">
            <p className="ds-premium-panel__eyebrow">Event alerts</p>
            <p className="ds-premium-panel__title">Get notified first</p>
            <p className="ds-premium-panel__desc">
              Priority alerts when registrations open and new events are announced.
            </p>

            <NewsletterSubscribeFields
              id="event-signup-email"
              submitLabel="Notify me"
              loadingLabel="Sending link…"
            />
          </div>
        </div>
      </SectionBand>

      <SectionBand variant="tint">
        <div className="container">
          <SectionMarker
            title="Upcoming events"
            subtitle="Registrations and dispatches from across the corridor"
          />

          {articles.length === 0 ? (
            <CategoryEmptyState
              categoryName="Events"
              message="No upcoming events right now. Join the briefing to get notified when new events are announced."
            />
          ) : (
            <motion.div
              variants={grid}
              initial="hidden"
              whileInView="visible"
              viewport={viewportGrid}
              className="ds-category-feed__grid"
            >
              {articles.map((article, index) => (
                <Card key={article.id} article={article} index={index} staggered />
              ))}
            </motion.div>
          )}
        </div>
      </SectionBand>

      <SectionBand variant="default">
        <div className="container">
          <SectionMarker title="On the horizon" subtitle="Planned formats for the corridor calendar" />
          <div className="ds-platform-lineup">
            {upcomingTypes.map((event) => (
              <div key={event.title} className="ds-premium-panel ds-platform-lineup__item">
                <p className="ds-category-label">{event.focus}</p>
                <h3 className="ds-platform-lineup__title">{event.title}</h3>
                <p className="type-excerpt">{event.desc}</p>
                <p className="type-meta ds-platform-lineup__status">{event.status}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand variant="muted">
        <NewsletterSection />
      </SectionBand>
    </div>
  )
}
