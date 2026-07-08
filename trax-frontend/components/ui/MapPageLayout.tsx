'use client'

import { useState } from 'react'
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
