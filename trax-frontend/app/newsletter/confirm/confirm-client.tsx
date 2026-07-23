'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import { SectionBand } from '@/design-system/components'
import { MotionButton } from '@/design-system/components'
import { confirmNewsletterSubscription } from '@/lib/newsletter'

type ConfirmState = 'loading' | 'success' | 'already' | 'error'

export default function NewsletterConfirmClient() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const token = searchParams.get('token') ?? ''
  const [state, setState] = useState<ConfirmState>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function run() {
      const result = await confirmNewsletterSubscription(email, token)
      if (cancelled) return

      if (!result.ok) {
        setState('error')
        setMessage(result.message)
        return
      }

      setState(result.alreadyConfirmed ? 'already' : 'success')
      setMessage(result.message)
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [email, token])

  const title =
    state === 'loading'
      ? 'Confirming your subscription…'
      : state === 'success'
        ? 'You are confirmed'
        : state === 'already'
          ? 'Already confirmed'
          : 'Confirmation failed'

  return (
    <PlatformPageShell showNewsletter={false}>
      <SectionBand variant="default">
        <div className="container ds-platform-newsletter-status">
          <p className="ds-category-label">Newsletter</p>
          <h1 className="ds-platform-page__title">{title}</h1>

          {state === 'loading' && (
            <p className="type-excerpt ds-platform-page__desc">Hang tight · This only takes a moment.</p>
          )}

          {state !== 'loading' && (
            <p className="type-excerpt ds-platform-page__desc">{message}</p>
          )}

          <div className="ds-platform-newsletter-status__actions">
            <MotionButton href="/" variant="primary">
              Back to Trax
            </MotionButton>
            {state === 'error' && (
              <MotionButton href="/newsletter" variant="ghost">
                Try subscribing again
              </MotionButton>
            )}
            {(state === 'success' || state === 'already') && (
              <Link href="/news" className="ds-accent-link">
                Read the latest stories
              </Link>
            )}
          </div>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
