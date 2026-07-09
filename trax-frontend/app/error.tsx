'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="ds-not-found ds-not-found--error">
      <div className="container ds-not-found__inner">
        <p className="ds-not-found__code" aria-hidden>
          500
        </p>
        <p className="ds-category-label">Something went wrong</p>
        <h1 className="ds-not-found__title">We hit a snag loading this page</h1>
        <p className="type-excerpt ds-not-found__lead">
          This is usually temporary. Try again in a moment, or return to the homepage while we
          get things back on track.
        </p>

        <div className="ds-not-found__actions">
          <button type="button" onClick={reset} className="ds-btn ds-btn--primary ds-btn--md">
            Try again
          </button>
          <Link href="/" className="ds-btn ds-btn--outline ds-btn--md">
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
