import type { Metadata } from 'next'
import NewsletterBanner from '@/components/NewsletterBanner'
import { Sparkles, Mail, FileText, TrendingUp, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Trax Newsletter | Join 12,000+ Tech Professionals',
  description: 'Subscribe to Ogun State\'s premier tech newsletter. Weekly insights on startups, funding, tools, and research delivered to your inbox.',
}

export default function NewsletterPage() {
  const benefits = [
    {
      icon: FileText,
      title: 'Weekly Startup Reports',
      desc: "Granular breakdown of Ogun State's AI startup launches, funding transactions, and corporate deals.",
    },
    {
      icon: TrendingUp,
      title: 'Venture & Funding DB',
      desc: 'Exclusive access to our deal logs and investor ecosystem analytics.',
    },
    {
      icon: Sparkles,
      title: 'Developer Spotlights',
      desc: 'Discover libraries, packages, and LLMs trained locally by developers across Africa.',
    },
    {
      icon: ShieldCheck,
      title: 'No Spam Guarantee',
      desc: 'We publish strictly once a week. Your email is encrypted and never shared.',
    },
  ]

  return (
    <div className="relative pt-28 pb-20 min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none opacity-[0.14]"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Benefits */}
          <div className="lg:col-span-6">
            <span
              className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              SUBSCRIBE
            </span>
            <h1
              className="font-extrabold tracking-tight mb-6"
              style={{
                fontFamily: 'var(--font-oxanium)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: 'var(--fg)',
                lineHeight: 1.1,
              }}
            >
              Get Ogun State&apos;s Tech Pulse in Your Inbox
            </h1>
            <p
              className="text-base mb-10 leading-relaxed"
              style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
            >
              Join 12,000+ venture capital investors, tech startup founders, research scientists, and developers who read Trax every week.
            </p>

            <div className="space-y-6" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div
                      className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--card-border)',
                      }}
                    >
                      <Icon size={14} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white" style={{ color: 'var(--fg)' }}>{benefit.title}</h3>
                      <p className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>{benefit.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Sign up form Card */}
          <div className="lg:col-span-6">
            <NewsletterBanner
              headline="Stay ahead of the curve"
              subtext="Weekly dispatches on Ogun State's AI, free, no spam, unsubscribe anytime."
              variant="card"
            />
          </div>

        </div>
      </div>
    </div>
  )
}
