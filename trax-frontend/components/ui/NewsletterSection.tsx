'use client'

import { motion } from 'framer-motion'
import { MotionButton } from '@/design-system/components'
import { transitionEditorial } from '@/design-system/motion'
import {
  NEWSLETTER_ALREADY_TEXT,
  NEWSLETTER_ALREADY_TITLE,
  NEWSLETTER_PENDING_TEXT,
  NEWSLETTER_PENDING_TITLE,
} from '@/lib/newsletter'
import { useNewsletterSubscribe } from '@/components/newsletter/NewsletterSubscribeFields'

const BRIEFING_POINTS = [
  'Funding rounds and deal flow across Ogun and West Africa',
  'Founder profiles, operator moves, and ecosystem shifts',
  'Policy signals, events, and the week\'s must-reads',
] as const

export default function NewsletterSection() {
  const {
    email,
    setEmail,
    loading,
    error,
    status,
    message,
    handleSubmit,
  } = useNewsletterSubscribe()

  return (
    <div className="container" id="newsletter">
      <motion.div
        className="ds-newsletter-card"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -40px 0px' }}
        transition={transitionEditorial}
      >
        <div className="ds-newsletter-card__inner">
          <div className="ds-newsletter-card__copy">
            <p className="ds-newsletter-card__eyebrow">The Trax briefing</p>
            <h2 className="ds-newsletter-card__title">Ogun tech, distilled weekly</h2>
            <p className="ds-newsletter-card__lead type-excerpt">
              One email with the stories, deals, and people shaping the corridor, curated for
              founders, operators, and investors who want signal, not noise.
            </p>
            <ul className="ds-newsletter-card__list">
              {BRIEFING_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="ds-newsletter-card__action">
            {status === 'idle' ? (
              <>
                <form onSubmit={handleSubmit} className="ds-newsletter-card__form">
                  <label htmlFor="newsletter-email" className="ds-newsletter-card__form-label">
                    Your email
                  </label>
                  <div className="ds-newsletter-card__fields">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                      placeholder="you@company.com"
                      className="ds-newsletter-card__input"
                    />
                    <MotionButton
                      id="newsletter-submit"
                      type="submit"
                      disabled={loading}
                      arrow
                      className="ds-newsletter-card__btn"
                    >
                      {loading ? 'Sending link…' : 'Get the briefing'}
                    </MotionButton>
                  </div>
                </form>

                {error && <p className="ds-newsletter-card__error">{error}</p>}

                <p className="ds-newsletter-card__hint type-meta">
                  Free forever. One email per week.{' '}
                  <a href="/newsletter/unsubscribe" className="ds-accent-link">
                    Unsubscribe anytime
                  </a>
                  .
                </p>
              </>
            ) : (
              <div className="ds-newsletter-card__success">
                <p className="ds-newsletter-card__success-title">
                  {status === 'already' ? NEWSLETTER_ALREADY_TITLE : NEWSLETTER_PENDING_TITLE}
                </p>
                <p className="ds-newsletter-card__success-text type-meta">
                  {status === 'already'
                    ? NEWSLETTER_ALREADY_TEXT
                    : message || NEWSLETTER_PENDING_TEXT}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
