import type { Metadata } from 'next'
import Link from 'next/link'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { SectionBand, SectionMarker } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import {
  CareersApplyHeaderAction,
  CareersApplyFooterAction,
} from '@/components/ui/CareersApplyActions'

export const metadata: Metadata = {
  title: 'Careers at Trax | Join the Team',
  description:
    'Join Trax and help build the leading tech media platform for Ogun State. View open roles in journalism, engineering, and growth.',
}

const openRoles = [
  {
    id: 'contributing-tech-journalist',
    category: 'Editorial · Volunteer Role',
    title: 'Contributing Tech Journalist',
    location: 'Remote / Ogun State Corridor',
    type: 'Volunteer · Flexible Hours',
    email: 'traxnewsng@gmail.com',
    subject: 'Application: Contributing Tech Journalist (Volunteer)',
    overview:
      'We are seeking a skilled, research-driven tech journalist to join the Trax team as a volunteer contributor. In this role, you will write high-impact stories, founder profiles, and ecosystem dispatches covering technology, startups, and innovation across Ogun State.',
    responsibilities: [
      'Write engaging, well-researched articles covering startup launches, funding transactions, and ecosystem developments.',
      'Conduct interviews with founders, software engineers, and policy analysts across Abeokuta and regional tech hubs.',
      'Work closely with the Trax editorial team to shape stories that inform thousands of monthly readers.',
    ],
    requirements: [
      'Strong command of written English with a clean, engaging editorial voice.',
      'Genuine passion for tech, software engineering, and startup ecosystems in Nigeria.',
      'Ability to research topics independently and deliver clean, well-structured drafts.',
    ],
  },
]

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
          <SectionMarker
            title="Open roles"
            subtitle="Opportunities to help shape tech journalism in Ogun State"
          />

          <div className="mt-8">
            {openRoles.map((role) => (
              <article key={role.id} className="ds-premium-panel">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--neutral-border)]">
                  <div>
                    <p className="ds-category-label">{role.category}</p>
                    <h2 className="ds-platform-lineup__title text-2xl font-semibold mt-1">
                      {role.title}
                    </h2>
                  </div>
                  <CareersApplyHeaderAction
                    roleTitle={role.title}
                    email={role.email}
                    subject={role.subject}
                  />
                </div>

                <div className="flex flex-wrap gap-6 py-4 text-xs type-meta border-b border-[var(--neutral-border)]">
                  <span className="flex items-center gap-1.5">
                    <Icon name="location" size="xs" aria-hidden />
                    {role.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="clock" size="xs" aria-hidden />
                    {role.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="mail" size="xs" aria-hidden />
                    {role.email}
                  </span>
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="type-label mb-2 text-xs uppercase tracking-wider text-[var(--brand-primary)]">
                      Role Overview
                    </h3>
                    <p className="type-excerpt">
                      {role.overview}
                    </p>
                  </div>

                  <div>
                    <h3 className="type-label mb-2 text-xs uppercase tracking-wider text-[var(--brand-primary)]">
                      What You&apos;ll Do
                    </h3>
                    <ul className="space-y-2 list-disc list-inside type-prose text-sm">
                      {role.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="type-label mb-2 text-xs uppercase tracking-wider text-[var(--brand-primary)]">
                      What We Look For
                    </h3>
                    <ul className="space-y-2 list-disc list-inside type-prose text-sm">
                      {role.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <CareersApplyFooterAction
                    roleTitle={role.title}
                    email={role.email}
                    subject={role.subject}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand variant="default">
        <div className="container text-center py-4">
          <p className="type-meta mb-3">Don&apos;t see a role that fits your background?</p>
          <p className="type-excerpt max-w-xl mx-auto mb-6 text-sm">
            We are always interested in connecting with passionate writers, software engineers, and community leads across Ogun State.
          </p>
          <Link href="/about#contact" className="ds-accent-link text-sm font-semibold">
            Get in touch with the team &rarr;
          </Link>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
