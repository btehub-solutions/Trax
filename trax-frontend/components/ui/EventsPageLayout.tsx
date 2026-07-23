'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import CategoryEmptyState from '@/components/ui/CategoryEmptyState'
import NewsletterSection from '@/components/ui/NewsletterSection'
import NewsletterSubscribeFields from '@/components/newsletter/NewsletterSubscribeFields'
import { SectionBand } from '@/design-system/components'
import SectionMarker from '@/design-system/components/SectionMarker'
import { Icon } from '@/design-system/icons'
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

type EventFilterType = 'all' | 'upcoming' | 'past'

const EVENT_FILTERS: { id: EventFilterType; label: string }[] = [
  { id: 'all', label: 'All events' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past events' },
]

function isUpcomingEvent(article: Article): boolean {
  const rawDate = article.eventDate || article.publishedAt || article.date
  if (!rawDate) return false
  const eventTime = new Date(rawDate).getTime()
  if (isNaN(eventTime)) return false

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  return eventTime >= startOfToday.getTime()
}

export default function EventsPageLayout({
  articles,
  upcomingTypes,
}: EventsPageLayoutProps) {
  const [activeFilter, setActiveFilter] = useState<EventFilterType>('all')
  const grid = useMotionVariants(staggerGrid, 'staggerGrid')

  const filteredArticles = useMemo(() => {
    if (activeFilter === 'upcoming') {
      return articles.filter(isUpcomingEvent)
    }
    if (activeFilter === 'past') {
      return articles.filter((article) => !isUpcomingEvent(article))
    }
    return articles
  }, [articles, activeFilter])

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
            title="Events calendar"
            subtitle="Registrations and dispatches from across the corridor"
          />

          {articles.length > 0 && (
            <div
              className="ds-category-filters"
              role="tablist"
              aria-label="Filter events by date"
              style={{ marginBottom: '2rem' }}
            >
              {EVENT_FILTERS.map((filter) => {
                const isActive = filter.id === activeFilter
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`ds-category-filters__pill${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
          )}

          {articles.length === 0 ? (
            <CategoryEmptyState
              categoryName="Events"
              message="No events listed right now. Join the briefing to get notified when new events are announced."
            />
          ) : filteredArticles.length === 0 ? (
            <p className="type-meta ds-category-feed__empty" style={{ padding: '3rem 0', textAlign: 'center' }}>
              No {activeFilter} events found. Try selecting another filter.
            </p>
          ) : (
            <motion.div
              key={activeFilter}
              variants={grid}
              initial="hidden"
              whileInView="visible"
              viewport={viewportGrid}
              className="ds-category-feed__grid"
            >
              {filteredArticles.map((article, index) => (
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
              <div key={event.title} className="ds-premium-panel ds-platform-lineup__item flex flex-col justify-between">
                <div>
                  <p className="ds-category-label">{event.focus}</p>
                  <h3 className="ds-platform-lineup__title">{event.title}</h3>
                  <p className="type-excerpt">{event.desc}</p>
                </div>
                <p className="type-meta ds-platform-lineup__status mt-4 flex items-center gap-1.5">
                  <Icon name="calendar" size="xs" aria-hidden />
                  <span>{event.status}</span>
                </p>
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
