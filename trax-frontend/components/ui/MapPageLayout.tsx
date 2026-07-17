'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { useNewsletterSubscribe } from '@/components/newsletter/NewsletterSubscribeFields'
import { MotionButton, SectionBand, SectionMarker } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import { api } from '@/lib/api'
import {
  NEWSLETTER_ALREADY_TEXT,
  NEWSLETTER_ALREADY_TITLE,
  NEWSLETTER_PENDING_TEXT,
  NEWSLETTER_PENDING_TITLE,
} from '@/lib/newsletter'

type Tab = 'startups' | 'hubs' | 'labs'
type Region = 'ALL' | 'ABEOKUTA' | 'REMO' | 'IJEBU' | 'YEWA'

const tabs: { id: Tab; label: string }[] = [
  { id: 'startups', label: 'Startups' },
  { id: 'hubs', label: 'Tech hubs & incubators' },
  { id: 'labs', label: 'Academic & labs' },
]

interface EcosystemNode {
  id: string
  name: string
  category: 'STARTUP' | 'HUB' | 'LAB'
  location: string
  focus: string
  website?: string
}

// Fallback seed nodes if API is loading or offline
const FALLBACK_NODES: EcosystemNode[] = [
  { id: '1', name: 'Vnicom Solutions (Turnify)', category: 'STARTUP', location: 'Abeokuta', focus: 'HealthTech: clinician workflow & digital health platform', website: 'https://turnify.ng' },
  { id: '2', name: 'Vant', category: 'STARTUP', location: 'Ogun State', focus: 'InsurTech: climate insurance and underwriting for cooperatives' },
  { id: '3', name: 'CheckWatt', category: 'STARTUP', location: 'Abeokuta', focus: 'FinTech: electricity payment verification API for discos' },
  { id: '4', name: 'Gafrotech Hub', category: 'STARTUP', location: 'Abeokuta', focus: 'GreenTech: compostable agro-waste packaging for e-commerce' },
  { id: '5', name: 'N.E.Y.I Techpreneurship Hub', category: 'STARTUP', location: 'Ogun State', focus: 'EdTech & incubation: startup acceleration and digital skills' },
  { id: '6', name: 'N.E.Y.I Techpreneurship Hub (Programs)', category: 'HUB', location: 'Ogun State', focus: 'Startup incubator: programmes, funding access, mentorship' },
  { id: '7', name: 'Ogun State Deep-Tech Incubator', category: 'HUB', location: 'Abeokuta', focus: 'Hardware & climate founders: 120-desk co-working facility' },
  { id: '8', name: 'IGA Youth Skills Centre', category: 'HUB', location: 'Abeokuta', focus: 'Digital skills: product, data, and engineering placements' },
  { id: '9', name: 'Federal University of Agriculture, Abeokuta (FUNAAB)', category: 'LAB', location: 'Abeokuta', focus: 'AgriTech, biotechnology, and applied computer science research', website: 'https://funaab.edu.ng' },
  { id: '10', name: 'Olabisi Onabanjo University (OOU)', category: 'LAB', location: 'Ago-Iwoye', focus: 'Engineering, ICT, and health informatics research', website: 'https://oouagoiwoye.edu.ng' },
  { id: '11', name: 'Moshood Abiola Polytechnic (MAPOLY)', category: 'LAB', location: 'Abeokuta', focus: 'Applied technology, electronics, and software engineering', website: 'https://mapoly.edu.ng' },
]

export default function MapPageLayout() {
  const [activeTab, setActiveTab] = useState<Tab>('startups')
  const [activeRegion, setActiveRegion] = useState<Region>('ALL')
  const [nodes, setNodes] = useState<EcosystemNode[]>([])
  const [loadingNodes, setLoadingNodes] = useState(true)

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

  // Fetch nodes from NestJS backend API
  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const data = await api.get('/ecosystem-nodes')
        if (Array.isArray(data)) {
          setNodes(data)
        } else {
          setNodes(FALLBACK_NODES)
        }
      } catch (err) {
        console.warn('API error, using fallback seed nodes:', err)
        setNodes(FALLBACK_NODES)
      } finally {
        setLoadingNodes(false)
      }
    }
    fetchNodes()
  }, [])

  const activeLabel = tabs.find((t) => t.id === activeTab)?.label ?? 'Startups'

  const switchTab = (tab: Tab) => {
    setActiveTab(tab)
    reset()
  }

  // Geopolitical mapping helper to filter nodes by selected zone
  const isNodeInRegion = (node: EcosystemNode, region: Region): boolean => {
    if (region === 'ALL') return true
    const loc = node.location.toLowerCase()
    switch (region) {
      case 'ABEOKUTA':
        return loc.includes('abeokuta') || loc.includes('egba')
      case 'REMO':
        return loc.includes('sagamu') || loc.includes('remo')
      case 'IJEBU':
        return loc.includes('ijebu') || loc.includes('ago-iwoye')
      case 'YEWA':
        return loc.includes('ilaro') || loc.includes('yewa')
      default:
        return true
    }
  }

  // Filter listings based on active Tab (Startup/Hub/Lab) & active Region (Abeokuta/Remo/Ijebu/Yewa)
  const filteredNodes = nodes
    .filter((n) => n.category.toLowerCase() === activeTab.slice(0, -1))
    .filter((n) => isNodeInRegion(n, activeRegion))

  return (
    <PlatformPageShell>
      <PlatformPageIntro
        label="Ecosystem directory"
        title="Ogun State tech map"
        description="A curated directory mapping active startup platforms, corporate labs, research centers, and infrastructure providers across the region."
      />

      {/* ── Interactive Geopolitical Map Section ────────────────────────────── */}
      <SectionBand variant="default">
        <div className="container">
          <SectionMarker
            title="Interactive Geopolitical Zones"
            subtitle="Click a division below to filter tech ecosystem nodes by region"
          />

          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between py-6">
            {/* SVG MAP */}
            <div className="w-full max-w-[420px] aspect-[4/3] relative bg-[var(--bg-alt)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <svg
                viewBox="0 0 400 300"
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* YEWA (West) */}
                <path
                  d="M 20 60 L 130 60 L 140 180 L 110 260 L 20 220 Z"
                  fill={activeRegion === 'YEWA' ? 'var(--red-600)' : 'var(--card-bg)'}
                  stroke="var(--border)"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-300 hover:fill-[rgba(231,4,13,0.15)]"
                  onClick={() => setActiveRegion(activeRegion === 'YEWA' ? 'ALL' : 'YEWA')}
                />
                {/* ABEOKUTA (Egba / Central) */}
                <path
                  d="M 130 60 L 250 40 L 230 180 L 140 180 Z"
                  fill={activeRegion === 'ABEOKUTA' ? 'var(--red-600)' : 'var(--card-bg)'}
                  stroke="var(--border)"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-300 hover:fill-[rgba(231,4,13,0.15)]"
                  onClick={() => setActiveRegion(activeRegion === 'ABEOKUTA' ? 'ALL' : 'ABEOKUTA')}
                />
                {/* REMO (South East Central) */}
                <path
                  d="M 140 180 L 230 180 L 220 250 L 110 260 Z"
                  fill={activeRegion === 'REMO' ? 'var(--red-600)' : 'var(--card-bg)'}
                  stroke="var(--border)"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-300 hover:fill-[rgba(231,4,13,0.15)]"
                  onClick={() => setActiveRegion(activeRegion === 'REMO' ? 'ALL' : 'REMO')}
                />
                {/* IJEBU (East) */}
                <path
                  d="M 250 40 L 380 80 L 370 230 L 220 250 L 230 180 Z"
                  fill={activeRegion === 'IJEBU' ? 'var(--red-600)' : 'var(--card-bg)'}
                  stroke="var(--border)"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-300 hover:fill-[rgba(231,4,13,0.15)]"
                  onClick={() => setActiveRegion(activeRegion === 'IJEBU' ? 'ALL' : 'IJEBU')}
                />

                {/* Region Text Labels */}
                <text x="50" y="150" className="text-[11px] font-bold select-none pointer-events-none fill-[var(--fg-muted)]">YEWA</text>
                <text x="165" y="110" className="text-[11px] font-bold select-none pointer-events-none fill-[var(--fg-muted)]">EGBA</text>
                <text x="160" y="215" className="text-[10px] font-bold select-none pointer-events-none fill-[var(--fg-muted)]">REMO</text>
                <text x="280" y="140" className="text-[11px] font-bold select-none pointer-events-none fill-[var(--fg-muted)]">IJEBU</text>
              </svg>
            </div>

            {/* Map Info Box */}
            <div className="flex-1 space-y-4">
              <h3 className="text-xl font-bold">Geopolitical Divisions</h3>
              <p className="text-sm type-meta leading-relaxed">
                Clicking on a region selects and highlights the corresponding startup nodes, tech spaces, and corporate research divisions.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { id: 'ALL', label: 'Show All' },
                  { id: 'ABEOKUTA', label: 'Egba (Abeokuta)' },
                  { id: 'REMO', label: 'Remo (Sagamu)' },
                  { id: 'IJEBU', label: 'Ijebu (Ijebu-Ode)' },
                  { id: 'YEWA', label: 'Yewa (Ilaro)' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setActiveRegion(r.id as Region)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      activeRegion === r.id
                        ? 'bg-[var(--red-600)] text-white border-transparent font-semibold'
                        : 'bg-[var(--card-bg)] text-[var(--fg-muted)] border-[var(--border)] hover:bg-[var(--bg-alt)]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionBand>

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

          {/* Directory card listings */}
          <div
            className="ds-platform-lineup"
            role="tabpanel"
            aria-label={activeLabel}
          >
            {loadingNodes ? (
              <div className="p-8 text-center w-full">
                <p className="type-meta text-sm animate-pulse">Loading directory entries…</p>
              </div>
            ) : filteredNodes.length > 0 ? (
              filteredNodes.map((entry) => (
                <div key={entry.id} className="ds-premium-panel">
                  <p className="ds-category-label">Ogun State</p>
                  <h3 className="ds-platform-lineup__title">{entry.name}</h3>
                  <p className="type-excerpt">{entry.focus}</p>
                  {entry.website && (
                    <Link
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ds-accent-link type-meta mt-2 inline-block"
                    >
                      Visit website →
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <div className="p-12 text-center w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl">
                <p className="text-sm font-semibold mb-1">No nodes found</p>
                <p className="type-meta text-xs">
                  We don&apos;t have any active {activeLabel.toLowerCase()} verified in this region yet.
                </p>
              </div>
            )}
          </div>

          {/* Alert to suggest additions */}
          <p className="type-meta text-xs pt-6 text-[var(--fg-muted)]">
            Know a startup or hub we should add?{' '}
            <Link href="/about#contact" className="ds-accent-link font-semibold">
              Let us know →
            </Link>
          </p>
        </div>
      </SectionBand>

      {/* Newsletter signup */}
      <SectionBand variant="default">
        <div className="container">
          <SectionMarker
            title="Get directory alerts"
            subtitle="Receive an update when we add new listings"
          />
          <div className="ds-platform-coming-soon__aside max-w-xl mx-auto">
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
    </PlatformPageShell>
  )
}
