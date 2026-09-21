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
    role: 'Founder & CTO',
    bio: 'Ben Sam Oladoyin is the Founder and Chief Technology Officer (CTO) of Trax, an independent tech intelligence and media platform mapping technology, venture capital, and startups across Nigeria, Africa, and the global ecosystem. Leveraging deep expertise in machine learning and data engineering, Ben engineered Trax to document transformative innovation, spotlight high-impact builders, and connect emerging tech ecosystems with global visibility and venture opportunities.',
    image: '/images/founder.jpg',
  },
  {
    name: 'Oyedele Damilare',
    role: 'Executive Director',
    bio: 'Oyedele Damilare is the Executive Director at Trax, directing operations, ecosystem partnerships, and market intelligence across the African startup landscape. Dedicated to technology growth and digital economies, he oversees platform strategy, tracks builder milestones, and coordinates high-impact ecosystem coverage.',
    image: '/images/dami.png',
  },
  {
    name: 'Praise Adeyemi',
    role: 'Chief Operating Officer (COO)',
    bio: 'Praise Adeyemi serves as Chief Operating Officer at Trax, spearheading organizational strategy, operational execution, and scalable media systems. With a sharp focus on operational efficiency and commercial growth, he drives the infrastructure powering Trax’s intelligence, publishing workflows, and pan-African reach.',
    image: '/images/praise.jpg',
  },
  {
    name: 'Joshua Ibirogba',
    role: 'Head of Strategic Partnerships',
    bio: 'Joshua Ibirogba is the Head of Strategic Partnerships at Trax, leading commercial alliances with venture funds, accelerators, ecosystem enablers, and corporate innovators. He builds collaborative networks that connect founders, investors, and ecosystem builders with high-visibility market intelligence.',
    image: '/images/joshua.png',
  },
  {
    name: 'Ekundayo Faith',
    role: 'Senior Tech Journalist & Staff Writer',
    bio: 'Ekundayo Faith is a Senior Tech Journalist and Staff Writer at Trax, delivering deep-dive investigative reporting, founder profiles, and analytical commentary on the African innovation frontier. Her work unpacks startup breakthroughs, venture dynamics, and policy shifts shaping the digital economy.',
    image: '/images/faith.png',
  },
  {
    name: 'Mololuwa Akindele',
    role: 'Head of Audience Growth & Digital Media',
    bio: 'Mololuwa Akindele leads Audience Growth and Digital Media at Trax, driving multi-channel content distribution, community engagement, and digital narrative strategy. She connects Trax’s journalism with a fast-growing global readership across digital and social touchpoints.',
    image: '/images/mololuwa.png',
  },
  {
    name: 'Soyemi John',
    role: 'Head of Design & Brand Identity',
    bio: 'Soyemi John is the Head of Design and Brand Identity at Trax, defining the platform’s visual architecture, editorial aesthetics, and product design language. He crafts cohesive, modern brand experiences that marry editorial elegance with intuitive digital interfaces.',
    image: '/images/soyemi.png',
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
