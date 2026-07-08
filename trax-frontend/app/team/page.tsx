import type { Metadata } from 'next'
import Image from 'next/image'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { SectionBand } from '@/design-system/components'

export const metadata: Metadata = {
  title: 'Meet the Trax Team | Editors & Writers',
  description:
    "The writers, editors, and industry analysts bringing you Ogun State's most detailed tech reporting.",
}

const team = [
  {
    name: 'Ben Sam Oladoyin',
    role: 'Founder & AI/ML Engineer',
    bio: 'Ben Sam Oladoyin is an AI/ML Engineer and the Founder of Trax, a specialized tech intelligence and media platform mapping the growth of the technology ecosystem across Ogun State and Nigeria. Leveraging expertise in machine learning and data engineering, Ben established Trax to document regional innovation, spotlight local builders, and connect emerging tech ecosystems with global visibility and venture opportunities.',
    image: '/images/founder.jpg',
  },
  {
    name: 'Oyedele Damilare',
    role: 'Ecosystem Contributor',
    bio: 'Oyedele Damilare is a key team member at Trax, supporting operations and data tracking across the regional startup ecosystem. Passionate about technology growth in Ogun State, he helps document local innovation, track builder milestones, and coordinate community coverage.',
    image: '/images/dami.png',
  },
] as const

export default function TeamPage() {
  return (
    <PlatformPageShell>
      <PlatformPageIntro
        label="Our team"
        title="The minds behind Trax"
        description="Journalists, industry analysts, and tech correspondents reporting from hubs across Abeokuta, Ogun State, and Nigeria."
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
