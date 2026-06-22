'use client'

import { useState } from 'react'
import { MapPin, Clock } from 'lucide-react'

type Tab = 'startups' | 'hubs' | 'labs'

const tabs: { id: Tab; label: string }[] = [
  { id: 'startups', label: 'Startups' },
  { id: 'hubs',     label: 'Tech Hubs & Incubators' },
  { id: 'labs',     label: 'Academic & Labs' },
]

export default function MapPage() {
  const [activeTab, setActiveTab] = useState<Tab>('startups')

  return (
    <div className="relative pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            ECOSYSTEM DIRECTORY
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
            Ogun State Tech Map
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            A curated directory mapping active startup platforms, corporate labs, research centers,
            and infrastructure providers across the region.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2.5 border-b mb-10 overflow-x-auto py-1" style={{ borderColor: 'var(--border)' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-3 text-xs md:text-sm font-semibold tracking-wide border-b-2 transition-all shrink-0"
                style={{
                  fontFamily:  'var(--font-dm-sans)',
                  borderColor: isActive ? 'var(--accent)' : 'transparent',
                  color:       isActive ? 'var(--accent)' : 'var(--fg-muted)',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Empty State */}
        <div
          className="flex flex-col items-center justify-center py-24 rounded-2xl border"
          style={{
            borderColor:     'var(--card-border)',
            backgroundColor: 'var(--card-bg)',
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            style={{ backgroundColor: 'rgba(200,75,49,0.1)', border: '1px solid rgba(200,75,49,0.2)' }}
          >
            <MapPin size={24} style={{ color: 'var(--accent)' }} />
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
          >
            Directory Coming Soon
          </h2>
          <p
            className="text-sm text-center max-w-sm"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            We are actively compiling the Ogun State tech map. Check back soon as we onboard
            startups, hubs, and research labs.
          </p>
          <span
            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(200,75,49,0.08)', color: 'var(--accent)' }}
          >
            <Clock size={12} /> In Progress
          </span>
        </div>
      </div>
    </div>
  )
}
