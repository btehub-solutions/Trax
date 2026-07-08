'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import NewsletterSection from '@/components/ui/NewsletterSection'
import { MotionButton } from '@/design-system/components'
import { SectionBand } from '@/design-system/components'
import SectionMarker from '@/design-system/components/SectionMarker'
import { Icon } from '@/design-system/icons'
import { BASE_URL } from '@/lib/api'

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
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Subscription failed')
      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

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

            {!submitted ? (
              <form onSubmit={handleSubmit} className="ds-platform-page__form">
                <label htmlFor="event-signup-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="event-signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="you@company.com"
                  className="ds-platform-page__input"
                />
                <MotionButton type="submit" variant="primary" disabled={loading} className="w-full">
                  {loading ? 'Subscribing…' : 'Notify me'}
                </MotionButton>
                {error && <p className="ds-platform-page__error">{error}</p>}
              </form>
            ) : (
              <p className="ds-platform-page__success">You&apos;re on the priority list.</p>
            )}
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
