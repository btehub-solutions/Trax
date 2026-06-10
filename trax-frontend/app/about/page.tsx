import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Trax | The Voice of Ogun State's AI",
  description: 'Learn about the mission, scope, and team behind Trax, Ogun State\'s premier AI startup media platform.',
}

export default function AboutPage() {
  const stats = [
    { label: 'Monthly Readers', value: '45,000+' },
    { label: 'Startups Tracked', value: '120+' },
    { label: 'Funding Logged', value: '$180M+' },
    { label: 'Ecosystem Events', value: '25+' },
  ]

  return (
    <div className="relative pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Visual background elements */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div 
        className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-[0.15]"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            OUR STORY
          </span>
          <h1
            className="font-extrabold tracking-tight mb-6"
            style={{
              fontFamily: 'var(--font-oxanium)',
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              color: 'var(--fg)',
              lineHeight: 1.1,
            }}
          >
            Tracking Ogun State's Tech Movement
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            Trax is Nigeria and Ogun State&apos;s leading tech media platform dedicated solely to documenting the builders, researchers, investors, and policies pushing technology forward.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span
                className="text-3xl md:text-4xl font-extrabold mb-2"
                style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--accent)' }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
            >
              Our Mission
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed mb-6"
              style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
            >
              We believe that the next decade of software and technology on the state will be defined by software development and modern software solutions. Yet, the work of local engineers, researchers shipping products on Ogun State datasets, and founders solving local infrastructure bottlenecks is often unrecorded.
            </p>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
            >
              Trax is here to fill that void. We provide granular reporting, data-driven analysis, and thoughtful commentary on the emerging Ogun State's AI landscape.
            </p>
          </div>
          <div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
            >
              What We Cover
            </h2>
            <ul className="space-y-4" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              {[
                { title: 'Funding & Ventures', desc: 'Pre-seed to growth investment rounds, angel networks, and venture capital logs.' },
                { title: 'Profiles & Interviews', desc: 'Deep conversations with the engineers training models and founders shipping products.' },
                { title: 'Policy & Governance', desc: 'Analysis of digital rights, model registries, and governmental AI frameworks.' },
                { title: 'Technical Breakthroughs', desc: 'Highlighting research institutes, datasets, and open-source products optimized for Ogun State languages.' },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="text-sm mt-0.5" style={{ color: 'var(--accent)' }}>✦</span>
                  <div>
                    <h3 className="text-sm font-bold text-white" style={{ color: 'var(--fg)' }}>{item.title}</h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
