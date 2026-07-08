'use client'

import { useState } from 'react'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { MotionButton, SectionBand, SectionMarker } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import { BASE_URL } from '@/lib/api'

type Tab = 'startups' | 'hubs' | 'labs'

const tabs: { id: Tab; label: string }[] = [
  { id: 'startups', label: 'Startups' },
  { id: 'hubs', label: 'Tech hubs & incubators' },
  { id: 'labs', label: 'Academic & labs' },
]

export default function MapPageLayout() {
  const [activeTab, setActiveTab] = useState<Tab>('startups')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const activeLabel = tabs.find((t) => t.id === activeTab)?.label ?? 'Startups'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Subscription failed')
      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = (tab: Tab) => {
    setActiveTab(tab)
    setEmail('')
    setError('')
    setSubmitted(false)
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
                onClick={() => resetForm(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="ds-premium-panel ds-platform-coming-soon">
            <div className="ds-platform-coming-soon__copy">
              <span className="ds-platform-coming-soon__status">
                <Icon name="clock" size="xs" aria-hidden />
                Directory in progress
              </span>
              <h2 className="ds-platform-coming-soon__title">
                Mapping the {activeLabel.toLowerCase()} ecosystem
              </h2>
              <p className="type-excerpt">
                We are verifying and onboarding tech nodes across Yewa, Ijebu, and Abeokuta to
                build a comprehensive directory of Ogun State&apos;s digital infrastructure.
              </p>
            </div>

            <div className="ds-platform-coming-soon__aside">
              <p className="ds-premium-panel__title">Get directory alerts</p>
              <p className="ds-premium-panel__desc">
                Receive an update when we publish data for {activeLabel.toLowerCase()}.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="ds-platform-page__form">
                  <label htmlFor="map-alerts-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="map-alerts-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    placeholder="you@company.com"
                    className="ds-platform-page__input"
                  />
                  <MotionButton type="submit" variant="primary" disabled={loading} className="w-full">
                    {loading ? 'Subscribing…' : 'Notify me'}
                  </MotionButton>
                  {error && <p className="ds-platform-page__error">{error}</p>}
                </form>
              ) : (
                <p className="ds-platform-page__success">You&apos;re on the alert list.</p>
              )}
            </div>
          </div>
        </div>
      </SectionBand>

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
