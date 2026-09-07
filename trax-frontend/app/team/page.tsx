import type { Metadata } from 'next'
import Image from 'next/image'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { SectionBand } from '@/design-system/components'

export const metadata: Metadata = {
  title: 'Meet the Trax Team | Editors, Analysts & Engineers',
  description:
    'The writers, editors, and industry analysts bringing you authoritative tech intelligence across Nigeria, Africa, and global frontiers.',
}

const team = [
  {
    name: 'Ben Sam Oladoyin',
    role: 'Founder & AI/ML Engineer',
    bio: 'Ben Sam Oladoyin is an AI/ML Engineer and the Founder of Trax, an independent tech intelligence and media platform mapping technology, venture capital, and startups across Nigeria, Africa, and the global ecosystem. Leveraging expertise in machine learning and data engineering, Ben established Trax to document transformative innovation, spotlight high-impact builders, and connect emerging tech ecosystems with global visibility and venture opportunities.',
    image: '/images/founder.jpg',
  },
  {
    name: 'Oyedele Damilare',
    role: 'Ecosystem Contributor',
    bio: 'Oyedele Damilare is a key team member at Trax, supporting operations, market research, and data tracking across the startup ecosystem. Passionate about technology growth and digital economies, he helps document innovation, track builder milestones, and coordinate ecosystem coverage.',
    image: '/images/dami.png',
  },
] as const

export default function TeamPage() {
  return (
    <PlatformPageShell>
      <PlatformPageIntro
        label="Our team"
        title="The minds behind Trax"
        description="Journalists, engineers, data analysts, and tech correspondents reporting from hubs across Nigeria, Africa, and global innovation centers."
      />

      <SectionBand variant="tint">
        <div className="container">
          <div className="ds-platform-team">
            {team.map((member, i) => (
              <article key={member.name} className="ds-platform-team__card">
                <div className="ds-platform-team__media">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    priority={i === 0}
                    className="ds-platform-team__image"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="ds-platform-team__body">
                  <p className="ds-category-label">{member.role}</p>
                  <h2 className="ds-platform-team__name">{member.name}</h2>
                  <p className="type-excerpt">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
