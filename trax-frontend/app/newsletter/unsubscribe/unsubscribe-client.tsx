'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import { MotionButton, SectionBand } from '@/design-system/components'
import { unsubscribeFromNewsletter } from '@/lib/newsletter'

export default function NewsletterUnsubscribeClient() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const preset = searchParams.get('email')
    if (preset) setEmail(preset)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await unsubscribeFromNewsletter(email)
    if (!result.ok) {
      setError(result.message)
      setLoading(false)
      return
    }

    setDone(true)
    setMessage(result.message)
    setLoading(false)
  }

  return (
    <PlatformPageShell showNewsletter={false}>
      <SectionBand variant="default">
        <div className="container ds-platform-newsletter-status">
          <p className="ds-category-label">Newsletter</p>
          <h1 className="ds-platform-page__title">Unsubscribe</h1>
          <p className="type-excerpt ds-platform-page__desc">
            Leave the Trax briefing anytime. You will stop receiving weekly emails from us.
          </p>

          {!done ? (
            <form onSubmit={handleSubmit} className="ds-platform-page__form ds-platform-newsletter-status__form">
              <label htmlFor="unsubscribe-email" className="ds-admin-label">
                Email address
              </label>
              <input
                id="unsubscribe-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="you@company.com"
                className="ds-platform-page__input"
              />
              <MotionButton type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
                {loading ? 'Unsubscribing…' : 'Unsubscribe'}
              </MotionButton>
              {error && <p className="ds-platform-page__error">{error}</p>}
            </form>
          ) : (
            <p className="ds-platform-page__success">{message}</p>
          )}

          <div className="ds-platform-newsletter-status__actions">
            <Link href="/" className="ds-accent-link">
              Return to Trax
            </Link>
          </div>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
