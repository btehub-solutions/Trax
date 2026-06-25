import type { Metadata } from 'next'
import { Briefcase, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers at Trax | Join the Team',
  description: 'Join Trax and help build the leading tech media platform for Ogun State. View open roles in journalism, engineering, and growth.',
}

export default function CareersPage() {
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
            CAREERS
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
            Join Trax
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            Help us write the history of the technology revolution in Ogun State. We are always
            looking for passionate writers, developers, and researchers.
          </p>
        </div>

        {/* Empty State */}
        <div
          className="flex flex-col items-center justify-center py-24 rounded-2xl border max-w-3xl"
          style={{
            borderColor:     'var(--card-border)',
            backgroundColor: 'var(--card-bg)',
            fontFamily:      'var(--font-dm-sans)',
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            style={{ backgroundColor: 'rgba(200,75,49,0.1)', border: '1px solid rgba(200,75,49,0.2)' }}
          >
            <Briefcase size={24} style={{ color: 'var(--accent)' }} />
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
          >
            No Open Roles Right Now
          </h2>
          <p
            className="text-sm text-center max-w-sm mb-6"
            style={{ color: 'var(--fg-muted)' }}
          >
            We don&apos;t have any active openings at the moment, but we&apos;re always growing.
            Send your CV and a short note to{' '}
            <a
              href="mailto:traxnewsng@gmail.com"
              className="font-semibold transition-colors hover:text-white"
              style={{ color: 'var(--accent)' }}
            >
              traxnewsng@gmail.com
            </a>{' '}
            and we&apos;ll be in touch when something fits.
          </p>
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(200,75,49,0.08)', color: 'var(--accent)' }}
          >
            <Clock size={12} /> Check Back Soon
          </span>
        </div>
      </div>
    </div>
  )
}
