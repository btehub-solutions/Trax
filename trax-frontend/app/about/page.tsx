import type { Metadata } from 'next'
import Link from 'next/link'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { SectionBand, SectionMarker } from '@/design-system/components'
import { pageMetadata } from '@/lib/seo'
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'About Trax | African & Global Tech Intelligence',
  description:
    'Learn about the mission, editorial standards, and vision behind Trax, tracking technology movements across Nigeria, Africa, and global frontiers.',
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
    desc: 'Pre-seed to growth rounds, angel syndicates, and institutional venture capital flows.',
  },
  {
    title: 'Profiles & interviews',
    desc: 'Conversations with the engineers training models and visionary founders shipping products.',
  },
  {
    title: 'Policy & governance',
    desc: 'Digital economy frameworks, AI governance, and cross-border regulatory shifts.',
  },
  {
    title: 'Technical breakthroughs & events',
    desc: 'Flagship summits, open-source innovations, and frontier technologies defining modern software.',
  },
] as const

export default function AboutPage() {
  return (
    <PlatformPageShell>
      <PlatformPageIntro
        label="Our story"
        title="Tracking African innovation and global tech movements"
        description="Trax is an independent tech media organization dedicated to documenting the builders, researchers, investors, and policies pushing technology forward across Nigeria, Africa, and the world."
      />

      <SectionBand variant="tint">
        <div className="container">
          <SectionMarker title="By the numbers" subtitle="Coverage expanding across continental and global frontiers" />
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
              We believe the next wave of global digital transformation is being forged across emerging
              and established innovation corridors. Yet the high-impact work of bold founders solving
              infrastructure bottlenecks, researchers training frontier models, and investors funding
              game-changing startups often lacks the dedicated, rigorous coverage it deserves.
            </p>
            <p className="type-excerpt">
              Trax delivers that intelligence: rigorous reporting, data-driven deal analysis, and thoughtful
              editorial commentary connecting local African ecosystems to the global stage.
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
              Editorial tips, partnership inquiries, or press requests: reach the team directly.
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
