import type { Metadata } from 'next'
import { Suspense } from 'react'
import NewsletterConfirmClient from './confirm-client'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Confirm Trax Newsletter',
  description: 'Confirm your subscription to the Trax weekly briefing.',
  path: '/newsletter/confirm',
})

export default function NewsletterConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="container ds-platform-newsletter-status">
          <p className="type-excerpt">Confirming your subscription…</p>
        </div>
      }
    >
      <NewsletterConfirmClient />
    </Suspense>
  )
}
