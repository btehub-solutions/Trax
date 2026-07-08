import type { Metadata } from 'next'
import Link from 'next/link'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { SectionBand, SectionMarker } from '@/design-system/components'
import { pageMetadata } from '@/lib/seo'
import { REVALIDATE_SECONDS } from '@/lib/server-api'

export const revalidate = REVALIDATE_SECONDS

export const metadata: Metadata = pageMetadata({
  title: 'About Trax',
  description:
    "Learn about the mission, scope, and team behind Trax, Ogun State's premier tech media platform.",
  path: '/about',
})

const stats = [
  { label: 'Monthly readers', value: 'Growing' },
  { label: 'Startups tracked', value: 'Growing' },
  { label: 'Funding logged', value: 'Growing' },
  { label: 'Ecosystem events', value: 'Growing' },
] as const

const coverage = [
  {
    title: 'Funding & ventures',
    desc: 'Pre-seed to growth rounds, angel networks, and venture capital logs.',
  },
  {
    title: 'Profiles & interviews',
    desc: 'Conversations with engineers training models and founders shipping products.',
  },
  {
    title: 'Policy & governance',
    desc: 'Digital rights, model registries, and governmental AI frameworks.',
  },
  {
    title: 'Technical breakthroughs',
    desc: 'Research institutes, datasets, and open-source products for local languages.',
  },
] as const

export default function AboutPage() {
  return (
    <PlatformPageShell>
      <PlatformPageIntro
        label="Our story"
        title="Tracking Ogun State's tech movement"
        description="Trax is Nigeria and Ogun State's leading tech media platform dedicated to documenting the builders, researchers, investors, and policies pushing technology forward."
      />

      <SectionBand variant="tint">
        <div className="container">
          <SectionMarker title="By the numbers" subtitle="Coverage expanding across the corridor" />
          <div className="ds-platform-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="ds-premium-panel ds-platform-stats__item">
                <p className="ds-platform-stats__value">{stat.value}</p>
                <p className="type-meta">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand variant="default">
        <div className="container ds-platform-about">
          <div className="ds-platform-about__block">
            <SectionMarker title="Our mission" />
            <p className="type-excerpt">
              We believe the next decade of software in the state will be defined by modern
              solutions and applied research. Yet the work of local engineers, researchers shipping
              on regional datasets, and founders solving infrastructure bottlenecks is often
              unrecorded.
            </p>
            <p className="type-excerpt">
              Trax fills that void — granular reporting, data-driven analysis, and thoughtful
              commentary on the emerging Ogun State tech landscape.
            </p>
          </div>

          <div className="ds-platform-about__block">
            <SectionMarker title="What we cover" />
            <ul className="ds-platform-about__list">
              {coverage.map((item) => (
                <li key={item.title}>
                  <h3 className="ds-platform-about__list-title">{item.title}</h3>
                  <p className="type-meta">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionBand>

      <SectionBand variant="muted">
        <div className="container" id="contact">
          <div className="ds-premium-panel ds-platform-contact">
            <p className="ds-premium-panel__eyebrow">Contact</p>
            <p className="ds-premium-panel__title">Work with Trax</p>
            <p className="ds-premium-panel__desc">
              Editorial tips, partnership inquiries, or press requests — reach the team directly.
            </p>
            <p className="type-excerpt">
              Email{' '}
              <a href="mailto:traxnewsng@gmail.com" className="ds-accent-link">
                traxnewsng@gmail.com
              </a>{' '}
              or explore{' '}
              <Link href="/advertise" className="ds-accent-link">
                partnership options
              </Link>
              .
            </p>
          </div>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
