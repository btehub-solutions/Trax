import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Meet the Trax Team | Editors & Writers',
  description: 'The writers, editors, and industry analysts bringing you Ogun State\'s most detailed tech reporting.',
}

export default function TeamPage() {
  const team = [
    {
      name: 'Ngozi Eze',
      role: 'Editor-in-Chief',
      bio: "Leading editorial strategy. Former tech editor at TechCabal with 8+ years covering Ogun State's startups.",
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop&q=80',
    },
    {
      name: 'Amara Nwosu',
      role: 'Features Editor',
      bio: 'Loves documenting builders and technical profiles. Former software development writer at AI Ogun State Lab.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop&q=80',
    },
    {
      name: 'Chidi Okafor',
      role: 'Senior Venture Reporter',
      bio: 'Tracks startup funding and legal frameworks. Has written for Ventureburn and Bloomberg Africa.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80',
    },
    {
      name: 'Kemi Adeyemi',
      role: 'Health & Ethics Correspondent',
      bio: 'Investigates diagnostic models, bias, and algorithmic healthtech solutions across Francophone regions.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&q=80',
    },
    {
      name: 'Tunde Bakare',
      role: 'East Africa Correspondent',
      bio: 'Based in Abeokuta. Reporting on collaborations, research centers, and startup hubs in the Rock City tech zone.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&q=80',
    },
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
            The Minds Behind Trax
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
              <div className="relative w-full aspect-[5/4] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
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
