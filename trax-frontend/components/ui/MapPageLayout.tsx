'use client'

import { useState } from 'react'
import Link from 'next/link'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { useNewsletterSubscribe } from '@/components/newsletter/NewsletterSubscribeFields'
import { MotionButton, SectionBand, SectionMarker } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import {
  NEWSLETTER_ALREADY_TEXT,
  NEWSLETTER_ALREADY_TITLE,
  NEWSLETTER_PENDING_TEXT,
  NEWSLETTER_PENDING_TITLE,
} from '@/lib/newsletter'

type Tab = 'startups' | 'hubs' | 'labs'

const tabs: { id: Tab; label: string }[] = [
  { id: 'startups', label: 'Startups' },
  { id: 'hubs', label: 'Tech hubs & incubators' },
  { id: 'labs', label: 'Academic & labs' },
]

// ── Directory data ────────────────────────────────────────────────────────────
// Add new entries here. Each entry appears as a card under its tab.

interface DirectoryEntry {
  name: string
  location: string
  focus: string
  website?: string
}

const DIRECTORY: Record<Tab, DirectoryEntry[]> = {
  startups: [
    {
      name: 'Vnicom Solutions (Turnify)',
      location: 'Abeokuta',
      focus: 'HealthTech — clinician workflow & digital health platform',
      website: 'https://turnify.ng',
    },
    {
      name: 'Vant',
      location: 'Ogun State',
      focus: 'InsurTech — climate insurance and underwriting for cooperatives',
    },
    {
      name: 'CheckWatt',
      location: 'Sagamu',
      focus: 'FinTech — electricity payment verification API for discos',
    },
    {
      name: 'Gafrotech Hub',
      location: 'Ilaro',
      focus: 'GreenTech — compostable agro-waste packaging for e-commerce',
    },
    {
      name: 'N.E.Y.I Techpreneurship Hub',
      location: 'Ogun State',
      focus: 'EdTech & incubation — startup acceleration and digital skills',
    },
  ],
  hubs: [
    {
      name: 'N.E.Y.I Techpreneurship Hub',
      location: 'Ogun State',
      focus: 'Startup incubator — programmes, funding access, mentorship',
    },
    {
      name: 'Ogun State Deep-Tech Incubator',
      location: 'Abeokuta',
      focus: 'Hardware & climate founders — 120-desk co-working facility',
    },
    {
      name: 'IGA Youth Skills Centre',
      location: 'Abeokuta',
      focus: 'Digital skills — product, data, and engineering placements',
    },
  ],
  labs: [
    {
      name: 'Federal University of Agriculture, Abeokuta (FUNAAB)',
      location: 'Abeokuta',
      focus: 'AgriTech, biotechnology, and applied computer science research',
      website: 'https://funaab.edu.ng',
    },
    {
      name: 'Olabisi Onabanjo University (OOU)',
      location: 'Ago-Iwoye',
      focus: 'Engineering, ICT, and health informatics research',
      website: 'https://oouagoiwoye.edu.ng',
    },
    {
      name: 'Moshood Abiola Polytechnic (MAPOLY)',
      location: 'Ojere, Abeokuta',
      focus: 'Applied technology, electronics, and software engineering',
      website: 'https://mapoly.edu.ng',
    },
  ],
}

export default function MapPageLayout() {
  const [activeTab, setActiveTab] = useState<Tab>('startups')
  const {
    email,
    setEmail,
    loading,
    error,
    status,
    message,
    handleSubmit,
    reset,
  } = useNewsletterSubscribe()

  const activeLabel = tabs.find((t) => t.id === activeTab)?.label ?? 'Startups'
  const entries = DIRECTORY[activeTab]

  const switchTab = (tab: Tab) => {
    setActiveTab(tab)
    reset()
  }

  return (
    <PlatformPageShell>
      <PlatformPageIntro
        label="Ecosystem directory"
        title="Ogun State tech map"
        description="A curated directory mapping active startup platforms, corporate labs, research centers, and infrastructure providers across the region."
      />

      <SectionBand variant="tint">
        <div className="container">
          {/* Tab filter */}
          <div
            className="ds-category-filters"
            role="tablist"
            aria-label="Directory categories"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`ds-category-filters__pill${activeTab === tab.id ? ' is-active' : ''}`}
                onClick={() => switchTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Directory cards */}
          <div
            className="ds-platform-lineup"
            role="tabpanel"
            aria-label={activeLabel}
          >
            {entries.map((entry) => (
              <div key={entry.name} className="ds-premium-panel">
                <p className="ds-category-label">{entry.location}</p>
                <h3 className="ds-platform-lineup__title">{entry.name}</h3>
                <p className="type-excerpt">{entry.focus}</p>
                {entry.website && (
                  <Link
                    href={entry.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-accent-link type-meta"
                  >
                    Visit website →
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Alert to suggest additions */}
          <p className="type-meta" style={{ marginTop: '1.5rem', color: 'var(--fg-muted)' }}>
            Know a startup or hub we should add?{' '}
            <Link href="/about#contact" className="ds-accent-link">
              Let us know →
            </Link>
          </p>
        </div>
      </SectionBand>

      {/* Newsletter signup — kept exactly as before */}
      <SectionBand variant="default">
        <div className="container">
          <SectionMarker
            title="Get directory alerts"
            subtitle="Receive an update when we add new listings"
          />
          <div className="ds-platform-coming-soon__aside">
            {status === 'idle' ? (
              <form onSubmit={handleSubmit} className="ds-platform-page__form">
                <label htmlFor="map-alerts-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="map-alerts-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="ds-platform-page__input"
                />
                <MotionButton type="submit" variant="primary" disabled={loading} className="w-full">
                  {loading ? 'Sending link…' : 'Notify me'}
                </MotionButton>
                {error && <p className="ds-platform-page__error">{error}</p>}
              </form>
            ) : (
              <div className="ds-platform-page__success">
                <p className="ds-newsletter-card__success-title">
                  {status === 'already' ? NEWSLETTER_ALREADY_TITLE : NEWSLETTER_PENDING_TITLE}
                </p>
                <p className="type-meta">
                  {status === 'already'
                    ? NEWSLETTER_ALREADY_TEXT
                    : message || NEWSLETTER_PENDING_TEXT}
                </p>
              </div>
            )}
          </div>
        </div>
      </SectionBand>

      {/* What we track — kept exactly as before */}
      <SectionBand variant="default">
        <div className="container">
          <SectionMarker
            title="What we track"
            subtitle="Nodes verified before they appear in the live map"
          />
          <div className="ds-platform-lineup">
            {[
              {
                label: 'Startups',
                title: 'Product companies',
                desc: 'Active ventures shipping software, fintech, agritech, and logistics products.',
              },
              {
                label: 'Hubs',
                title: 'Incubators & coworking',
                desc: 'Spaces where founders build, meet investors, and access programs.',
              },
              {
                label: 'Labs',
                title: 'Research & academia',
                desc: 'University labs, corporate R&D, and applied research centers.',
              },
            ].map((item) => (
              <div key={item.label} className="ds-premium-panel">
                <p className="ds-category-label">{item.label}</p>
                <h3 className="ds-platform-lineup__title">{item.title}</h3>
                <p className="type-excerpt">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
