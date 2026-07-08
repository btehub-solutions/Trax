'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import NewsletterSection from '@/components/ui/NewsletterSection'
import NewsletterSubscribeFields from '@/components/newsletter/NewsletterSubscribeFields'
import { SectionBand } from '@/design-system/components'
import SectionMarker from '@/design-system/components/SectionMarker'
import { Icon } from '@/design-system/icons'

interface ActiveEvent {
  id: string
  title: string
  organizer: string
  edition: string
  flyerUrl: string
  registrationUrl: string
  isFree?: boolean
  description: string
}

interface UpcomingEvent {
  title: string
  focus: string
  status: string
  desc: string
}

interface EventsPageLayoutProps {
  activeEvents: ActiveEvent[]
  upcomingTypes: UpcomingEvent[]
}

export default function EventsPageLayout({
  activeEvents,
  upcomingTypes,
}: EventsPageLayoutProps) {
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
          <div className="ds-platform-events">
            {activeEvents.map((event) => (
              <article key={event.id} className="ds-platform-event-card">
                <div className="ds-platform-event-card__media">
                  <Image
                    src={event.flyerUrl}
                    alt={event.title}
                    width={480}
                    height={640}
                    className="ds-platform-event-card__flyer"
                    priority
                  />
                </div>
                <div className="ds-platform-event-card__body">
                  <span className="ds-category-label">{event.organizer}</span>
                  <h2 className="ds-platform-event-card__title">{event.title}</h2>
                  <div className="ds-platform-event-card__tags">
                    <span className="ds-platform-event-card__tag">{event.edition}</span>
                    {event.isFree && (
                      <span className="ds-platform-event-card__tag ds-platform-event-card__tag--accent">
                        Free registration
                      </span>
                    )}
                  </div>
                  <p className="type-excerpt">{event.description}</p>
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-platform-event-card__cta"
                  >
                    Register
                    <Icon name="arrow-right" size="xs" />
                  </a>
                </div>
              </article>
            ))}
          </div>
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
