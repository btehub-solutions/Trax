'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MotionButton } from '@/design-system/components'
import { transitionEditorial } from '@/design-system/motion'
import { BASE_URL } from '@/lib/api'

const BRIEFING_POINTS = [
  'Funding rounds and deal flow across Ogun and West Africa',
  'Founder profiles, operator moves, and ecosystem shifts',
  'Policy signals, events, and the week\'s must-reads',
] as const

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
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
      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed')
      }
      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" id="newsletter">
      <motion.div
        className="ds-newsletter-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
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
            {!submitted ? (
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
                      onChange={(e) => setEmail(e.target.value)}
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
                      {loading ? 'Joining…' : 'Get the briefing'}
                    </MotionButton>
                  </div>
                </form>

                {error && <p className="ds-newsletter-card__error">{error}</p>}

                <p className="ds-newsletter-card__hint type-meta">
                  Free forever. One email per week. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="ds-newsletter-card__success">
                <p className="ds-newsletter-card__success-title">You&apos;re on the list.</p>
                <p className="ds-newsletter-card__success-text type-meta">
                  Watch your inbox. The next Trax briefing is on its way.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
