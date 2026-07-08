import type { Metadata } from 'next'
import Link from 'next/link'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { SectionBand } from '@/design-system/components'
import { Icon } from '@/design-system/icons'

export const metadata: Metadata = {
  title: 'Careers at Trax | Join the Team',
  description:
    'Join Trax and help build the leading tech media platform for Ogun State. View open roles in journalism, engineering, and growth.',
}

export default function CareersPage() {
  return (
    <PlatformPageShell>
      <PlatformPageIntro
        label="Careers"
        title="Join Trax"
        description="Help us write the history of the technology revolution in Ogun State. We are always looking for passionate writers, developers, and researchers."
      />

      <SectionBand variant="tint">
        <div className="container">
          <div className="ds-category-empty">
            <p className="ds-category-empty__eyebrow">Open roles</p>
            <h2 className="ds-category-empty__title">No open roles right now</h2>
            <p className="ds-category-empty__desc">
              We don&apos;t have active openings at the moment, but we&apos;re always growing.
              Send your CV and a short note to{' '}
              <a href="mailto:traxnewsng@gmail.com" className="ds-accent-link">
                traxnewsng@gmail.com
              </a>{' '}
              and we&apos;ll be in touch when something fits.
            </p>
            <p className="type-meta ds-platform-careers__status">
              <Icon name="clock" size="xs" aria-hidden /> Check back soon
            </p>
            <Link href="/about#contact" className="ds-category-empty__link">
              Contact the team
            </Link>
          </div>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
