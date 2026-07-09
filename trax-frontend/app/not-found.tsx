import type { Metadata } from 'next'
import Link from 'next/link'
import { primaryNav } from '@/lib/navigation'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found on Trax.',
  robots: { index: false, follow: true },
}

const quickLinks = primaryNav
  .filter((item) => item.href !== '/')
  .slice(0, 5)
  .map((item) => ({ label: item.label, href: item.href }))

export default function NotFound() {
  return (
    <div className="ds-not-found">
      <div className="container ds-not-found__inner">
        <p className="ds-not-found__code" aria-hidden>
          404
        </p>
        <p className="ds-category-label">Signal lost</p>
        <h1 className="ds-not-found__title">This page isn&apos;t on the wire</h1>
        <p className="type-excerpt ds-not-found__lead">
          The story, section, or URL you followed may have moved, expired, or never existed.
          Head back to the newsroom and pick up the trail from there.
        </p>

        <div className="ds-not-found__actions">
          <Link href="/" className="ds-btn ds-btn--primary ds-btn--md">
            Back to homepage
          </Link>
          <Link href="/news" className="ds-btn ds-btn--outline ds-btn--md">
            Latest news
          </Link>
        </div>

        <nav className="ds-not-found__links" aria-label="Popular sections">
          <p className="type-meta ds-not-found__links-label">Browse coverage</p>
          <ul className="ds-not-found__links-list">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="ds-not-found__link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/newsletter" className="ds-not-found__link">
                Newsletter
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
