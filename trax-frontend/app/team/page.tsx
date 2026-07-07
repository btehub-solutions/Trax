import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Meet the TRAX Team | Editors & Writers',
  description: 'The writers, editors, and industry analysts bringing you Ogun State\'s most detailed tech reporting.',
}

export default function TeamPage() {
  const team = [
    {
      name: 'Ben Sam Oladoyin',
      role: 'Founder & AI/ML Engineer',
      bio: 'Ben Sam Oladoyin is an AI/ML Engineer and the Founder of TRAX, a specialized tech intelligence and media platform mapping the growth of the technology ecosystem across Ogun State and Nigeria. Leveraging expertise in machine learning and data engineering, Ben established TRAX to document regional innovation, spotlight local builders, and connect emerging tech ecosystems with global visibility and venture opportunities.',
      image: '/images/founder.jpg'
    },
    {
      name: 'Oyedele Damilare',
      role: 'Ecosystem Contributor',
      bio: 'Oyedele Damilare is a key team member at TRAX, supporting operations and data tracking across the regional startup ecosystem. Passionate about technology growth in Ogun State, he helps document local innovation, track builder milestones, and coordinate community coverage.',
      image: '/images/dami.png'
    }
  ]

  return (
    <div className="relative pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            OUR TEAM
          </span>
          <h1
            className="font-extrabold tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-oxanium)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              color: 'var(--fg)',
              lineHeight: 1.1,
            }}
          >
            The Minds Behind TRAX
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            A team of dedicated journalists, industry analysts, and tech correspondents reporting from tech hubs across Abeokuta, Ogun State, and Nigeria.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-md"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Profile image with scale transition */}
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority={i === 0}
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              </div>

              {/* Bio details */}
              <div className="p-6">
                <span
                  className="text-xs font-bold tracking-wide uppercase"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {member.role}
                </span>
                <h3
                  className="text-xl font-bold mt-1 mb-3"
                  style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
