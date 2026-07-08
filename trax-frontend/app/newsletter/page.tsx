import type { Metadata } from 'next'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import NewsletterSection from '@/components/ui/NewsletterSection'
import { SectionBand } from '@/design-system/components'

export const metadata: Metadata = {
  title: 'TRAX Newsletter | Ogun State Tech Weekly',
  description:
    "Subscribe to Ogun State's premier tech newsletter. Weekly insights on startups, funding, tools, and research delivered to your inbox.",
}

const benefits = [
  {
    title: 'Weekly startup reports',
    desc: "Granular breakdown of startup launches, funding transactions, and corporate deals across Ogun State.",
  },
  {
    title: 'Ecosystem radar',
    desc: 'Updates on digital policy, hub events, and regional ecosystem initiatives.',
  },
  {
    title: 'Builder spotlights',
    desc: 'Deep insights and interviews with local founders, developers, and teams building from the ground up.',
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
        title="Get Ogun State's tech pulse in your inbox"
        description="Join the growing tech community — one weekly briefing with the stories, deals, and people shaping the corridor."
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
