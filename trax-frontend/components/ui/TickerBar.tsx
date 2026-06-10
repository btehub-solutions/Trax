'use client'

import { breakingHeadlines } from '@/lib/articles'
import { Zap } from 'lucide-react'

export default function TickerBar() {
  // Duplicate items to make the loop seamless
  const items = [...breakingHeadlines, ...breakingHeadlines]

  return (
    <div
      className="w-full overflow-hidden border-b"
      style={{
        backgroundColor: '#C84B31',
        borderColor: '#A93B24',
        height: '40px',
      }}
    >
      <div className="flex items-center h-full">
        {/* Label */}
        <div
          className="shrink-0 flex items-center gap-2 px-4 h-full border-r z-10"
          style={{
            backgroundColor: '#0A0A0A',
            borderColor: '#A93B24',
          }}
        >
          <Zap size={13} fill="#C84B31" color="#C84B31" />
          <span
            className="text-xs font-bold tracking-widest uppercase text-white whitespace-nowrap"
            style={{ fontFamily: 'var(--font-oxanium)' }}
          >
            Live
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden flex-1 relative">
          <div className="ticker-track">
            {items.map((headline, i) => (
              <span
                key={i}
                className="text-white text-xs font-medium whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  padding: '0 40px',
                }}
              >
                {headline}
                <span className="inline-block w-1 h-1 rounded-full bg-white/50 ml-10 mb-0.5" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
