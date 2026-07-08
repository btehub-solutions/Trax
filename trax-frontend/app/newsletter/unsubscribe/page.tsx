import type { Metadata } from 'next'
import { Suspense } from 'react'
import NewsletterUnsubscribeClient from './unsubscribe-client'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Unsubscribe from Trax Newsletter',
  description: 'Unsubscribe from the Trax weekly briefing.',
  path: '/newsletter/unsubscribe',
})

export default function NewsletterUnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="container ds-platform-newsletter-status">
          <p className="type-excerpt">Loading…</p>
        </div>
      }
    >
      <NewsletterUnsubscribeClient />
    </Suspense>
  )
}
