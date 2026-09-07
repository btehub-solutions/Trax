import type { Metadata } from 'next'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import NewsletterSection from '@/components/ui/NewsletterSection'
import { SectionBand } from '@/design-system/components'

export const metadata: Metadata = {
  title: 'Trax Newsletter | African & Global Tech Intelligence',
  description:
    'Subscribe to Trax tech briefings. Essential weekly intelligence on startups, venture capital, technology tools, and events delivered to your inbox.',
}

const benefits = [
  {
    title: 'Continental & Global Dealflow',
    desc: 'Granular breakdown of venture capital rounds, startup launches, and market-moving deals across Africa and beyond.',
  },
  {
    title: 'Ecosystem Radar',
    desc: 'Actionable updates on digital policy, infrastructure, and technology summits.',
  },
  {
    title: 'Builder Spotlights',
    desc: 'Exclusive interviews with visionary founders, technical architects, and operators.',
  },
  {
    title: 'No spam guarantee',
    desc: 'We publish strictly once a week. Your email is encrypted and never shared.',
  },
] as const

export default function NewsletterPage() {
  return (
    <PlatformPageShell showNewsletter={false}>
      <PlatformPageIntro
        label="Subscribe"
        title="Get the African & global tech pulse in your inbox"
        description="Join thousands of founders, investors, and operators: weekly briefings with the defining stories, deals, and innovations shaping tech."
      />

      <SectionBand variant="tint">
        <div className="container ds-platform-newsletter">
          <ul className="ds-platform-newsletter__benefits">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="ds-premium-panel">
                <p className="ds-category-label">{benefit.title}</p>
                <p className="type-excerpt">{benefit.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </SectionBand>

      <SectionBand variant="muted">
        <NewsletterSection />
      </SectionBand>
    </PlatformPageShell>
  )
}
