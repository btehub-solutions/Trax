'use client'

import { useTheme } from 'next-themes'
import { Card, SectionMarker, SiteUtilityBar } from '@/design-system/components'
import ThemeToggle from '@/design-system/components/ThemeToggle'
import { Icon, iconNames } from '@/design-system/icons'
import { MotionReveal, MotionStagger, MotionItem, motionDuration, easingCss } from '@/design-system/motion'
import {
  styleLayers,
  premiumExecution,
  dominanceRules,
  componentLayerMap,
  lockedDesignRules,
} from '@/design-system/direction'
import { motion } from 'framer-motion'

function Swatch({
  label,
  token,
  hex,
  className = '',
}: {
  label: string
  token: string
  hex?: string
  className?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-16 w-full rounded-lg ${className}`}
        style={{
          backgroundColor: `var(${token})`,
          border: '1px solid var(--surface-card-border)',
        }}
      />
      <div>
        <p className="text-sm font-semibold text-neutral-text-primary">{label}</p>
        <p className="text-xs text-neutral-text-muted font-mono">{token}</p>
        {hex && <p className="text-xs text-neutral-text-subtle font-mono">{hex}</p>}
      </div>
    </div>
  )
}

function SemanticCard({
  label,
  description,
  bgVar,
  borderVar,
  textVar,
  accentVar,
}: {
  label: string
  description: string
  bgVar: string
  borderVar: string
  textVar: string
  accentVar: string
}) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{
        backgroundColor: `var(${bgVar})`,
        borderColor: `var(${borderVar})`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="h-2.5 w-2.5 rounded-full shrink-0"
          style={{ backgroundColor: `var(${accentVar})` }}
        />
        <span className="text-sm font-bold" style={{ color: `var(${textVar})` }}>
          {label}
        </span>
      </div>
      <p className="text-sm text-neutral-text-secondary">{description}</p>
    </div>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-16">
      <div className="mb-6 pb-4 border-b" style={{ borderColor: 'var(--neutral-border)' }}>
        <h2 className="text-2xl font-bold text-neutral-text-primary mb-1">{title}</h2>
        {description && (
          <p className="text-sm text-neutral-text-muted">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export default function DesignSystemPreview() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text-primary transition-colors duration-300">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b bg-neutral-bg/95 backdrop-blur-md" style={{ borderColor: 'var(--neutral-border)' }}>
        <div className="container flex items-center justify-between py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-0.5">
              Trax Design System
            </p>
            <h1 className="text-xl font-bold">Tokens &amp; Components</h1>
          </div>
          <ThemeToggle
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-neutral-text-secondary hover:bg-neutral-bg-muted transition-colors"
            style={{ borderColor: 'var(--neutral-border)', color: 'var(--fg-muted)' }}
          />
        </div>
      </header>

      <div className="container py-12 max-w-5xl">
        {/* Brand */}
        <Section
          title="Brand"
          description="Primary identity: #E7040D"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              ['50', '#FFF0F0'],
              ['100', '#FFDEDE'],
              ['200', '#FFC2C2'],
              ['300', '#FF9494'],
              ['400', '#FF4A4A'],
              ['500', '#E7040D'],
              ['600', '#C9030B'],
              ['700', '#A30209'],
              ['800', '#7D0207'],
              ['900', '#560104'],
            ].map(([step, hex]) => (
              <Swatch
                key={step}
                label={`brand-${step}`}
                token={`--brand-${step}`}
                hex={hex}
              />
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Swatch label="Primary" token="--brand-primary" hex="#E7040D" />
            <Swatch label="Hover" token="--brand-primary-hover" hex="#C9030B" />
            <Swatch label="On dark" token="--brand-on-dark" hex="#FF2B2B" />
          </div>
        </Section>

        {/* Neutral backgrounds */}
        <Section
          title="Neutral: Backgrounds"
          description="Light: pure white editorial. Dark: #111111 charcoal (CNN / Newsplate inspired)"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Swatch label="bg" token="--neutral-bg" hex={isDark ? '#111111' : '#FFFFFF'} />
            <Swatch label="bg-subtle" token="--neutral-bg-subtle" hex={isDark ? '#1A1A1A' : '#FAFAFA'} />
            <Swatch label="bg-muted" token="--neutral-bg-muted" hex={isDark ? '#1F1F1F' : '#F4F4F5'} />
            <Swatch label="bg-elevated" token="--neutral-bg-elevated" hex={isDark ? '#242424' : '#FFFFFF'} />
            <Swatch label="bg-sunken" token="--neutral-bg-sunken" hex={isDark ? '#0A0A0A' : '#F4F4F5'} />
            <Swatch label="bg-inverse" token="--neutral-bg-inverse" hex={isDark ? '#FFFFFF' : '#18181B'} />
          </div>
        </Section>

        {/* Typography */}
        <Section
          title="Neutral: Typography"
          description="High-contrast hierarchy like CNN / BBC"
        >
          <div className="rounded-xl border p-8 bg-neutral-bg-elevated space-y-4" style={{ borderColor: 'var(--neutral-border)' }}>
            <p className="text-3xl font-bold text-neutral-text-primary">
              Primary: Headlines &amp; titles
            </p>
            <p className="text-lg text-neutral-text-secondary">
              Secondary: Body copy and article excerpts. Clean, readable, professional.
            </p>
            <p className="text-sm text-neutral-text-muted">
              Muted: Dates, categories, metadata (2 hrs ago · Funding)
            </p>
            <p className="text-xs text-neutral-text-subtle">
              Subtle: Placeholders, captions, disabled states
            </p>
            <a href="#" className="text-sm font-medium text-semantic-link hover:text-semantic-link-hover">
              Semantic link: Read full story →
            </a>
          </div>
        </Section>

        {/* Semantic: System */}
        <Section
          title="Semantic: System"
          description="Feedback and status colors"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SemanticCard
              label="Success"
              description="Published, confirmed, subscription active"
              bgVar="--semantic-success-bg"
              borderVar="--semantic-success-border"
              textVar="--semantic-success-text"
              accentVar="--semantic-success"
            />
            <SemanticCard
              label="Warning"
              description="Draft, pending review, expiring soon"
              bgVar="--semantic-warning-bg"
              borderVar="--semantic-warning-border"
              textVar="--semantic-warning-text"
              accentVar="--semantic-warning"
            />
            <SemanticCard
              label="Error"
              description="Failed action, validation error"
              bgVar="--semantic-error-bg"
              borderVar="--semantic-error-border"
              textVar="--semantic-error-text"
              accentVar="--semantic-error"
            />
            <SemanticCard
              label="Info"
              description="Neutral informational notices"
              bgVar="--semantic-info-bg"
              borderVar="--semantic-info-border"
              textVar="--semantic-info-text"
              accentVar="--semantic-info"
            />
          </div>
        </Section>

        {/* Semantic: Editorial */}
        <Section
          title="Semantic: Editorial"
          description="CNN / BBC style news indicators"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SemanticCard
              label="Live"
              description="Live coverage, streaming now"
              bgVar="--semantic-live-bg"
              borderVar="--semantic-live-border"
              textVar="--semantic-live"
              accentVar="--semantic-live"
            />
            <SemanticCard
              label="Breaking"
              description="Breaking news ticker & alerts"
              bgVar="--semantic-breaking-bg"
              borderVar="--semantic-breaking-border"
              textVar="--semantic-breaking"
              accentVar="--semantic-breaking"
            />
            <SemanticCard
              label="Sponsored"
              description="Press room & partner content"
              bgVar="--semantic-sponsored-bg"
              borderVar="--semantic-sponsored-border"
              textVar="--semantic-sponsored-text"
              accentVar="--semantic-sponsored"
            />
          </div>

          {/* Live preview bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide border"
              style={{
                backgroundColor: 'var(--semantic-live-bg)',
                borderColor: 'var(--semantic-live-border)',
                color: 'var(--semantic-live)',
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-semantic-live animate-pulse" />
              Live
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide border"
              style={{
                backgroundColor: 'var(--semantic-breaking-bg)',
                borderColor: 'var(--semantic-breaking-border)',
                color: 'var(--semantic-breaking)',
              }}
            >
              Breaking
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide border"
              style={{
                backgroundColor: 'var(--semantic-sponsored-bg)',
                borderColor: 'var(--semantic-sponsored-border)',
                color: 'var(--semantic-sponsored-text)',
              }}
            >
              Sponsored
            </span>
          </div>
        </Section>

        {/* Surfaces */}
        <Section
          title="Surfaces"
          description="Layered UI: page, cards, nav, footer, panels"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Swatch label="page" token="--surface-page" />
            <Swatch label="section" token="--surface-section" />
            <Swatch label="card" token="--surface-card" />
            <Swatch label="card-hover" token="--surface-card-hover" />
            <Swatch label="nav" token="--surface-nav" />
            <Swatch label="footer" token="--surface-footer" />
            <Swatch label="panel" token="--surface-panel" />
            <Swatch label="input" token="--surface-input" />
            <Swatch label="inverse" token="--surface-inverse" />
          </div>

          {/* Surface preview blocks */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="rounded-lg px-5 py-4 text-sm font-medium"
              style={{
                backgroundColor: 'var(--surface-nav)',
                color: 'var(--surface-nav-text)',
              }}
            >
              Nav surface: brand bar (light) / elevated (dark)
            </div>
            <div className="rounded-lg px-5 py-4 text-sm text-neutral-text-secondary bg-surface-footer border" style={{ borderColor: 'var(--surface-card-border)' }}>
              Footer surface: subtle background
            </div>
          </div>
        </Section>

        {/* Shadows */}
        <Section
          title="Shadows"
          description="Minimal on light (CNN/BBC editorial), depth on dark"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {(['xs', 'sm', 'md', 'lg', 'xl', 'card', 'card-hover', 'dropdown'] as const).map(
              (size) => (
                <div key={size} className="flex flex-col gap-2">
                  <div
                    className="h-20 w-full rounded-lg bg-surface-card border"
                    style={{ boxShadow: `var(--shadow-${size})`, borderColor: 'var(--surface-card-border)' }}
                  />
                  <p className="text-xs font-mono text-neutral-text-muted">--shadow-{size}</p>
                </div>
              )
            )}
          </div>
        </Section>

        {/* Radius */}
        <Section title="Border Radius" description="Consistent corner rounding">
          <div className="flex flex-wrap gap-6">
            {(['sm', 'md', 'lg', 'xl', 'card'] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 bg-surface-card border"
                  style={{ borderRadius: `var(--radius-${size})`, borderColor: 'var(--surface-card-border)' }}
                />
                <p className="text-xs font-mono text-neutral-text-muted">--radius-{size}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Card variants */}
        <Section
          title="Cards"
          description="Editorial card variants: outline for lists, elevated for grids, featured for hero"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default">
              <p className="text-xs font-bold uppercase tracking-wide text-brand mb-2">Default</p>
              <h3 className="text-lg font-bold text-neutral-text-primary mb-2">
                Ogun startup raises seed round
              </h3>
              <p className="text-sm text-neutral-text-secondary">
                Standard card with border. Use for static content blocks.
              </p>
            </Card>

            <Card variant="elevated">
              <p className="text-xs font-bold uppercase tracking-wide text-brand mb-2">Elevated</p>
              <h3 className="text-lg font-bold text-neutral-text-primary mb-2">
                Builder spotlight: Abeokuta fintech
              </h3>
              <p className="text-sm text-neutral-text-secondary">
                Subtle shadow + hover lift. Article grid cards.
              </p>
            </Card>

            <Card variant="outline">
              <p className="text-xs font-bold uppercase tracking-wide text-brand mb-2">Outline</p>
              <h3 className="text-lg font-bold text-neutral-text-primary mb-2">
                Policy update: tech hub incentives
              </h3>
              <p className="text-sm text-neutral-text-secondary">
                Border only, no shadow. CNN/BBC list style.
              </p>
            </Card>

            <Card variant="featured">
              <p className="text-xs font-bold uppercase tracking-wide text-semantic-breaking mb-2">
                Featured
              </p>
              <h3 className="text-xl font-bold text-neutral-text-primary mb-2">
                Tracking Ogun State&apos;s tech movement
              </h3>
              <p className="text-sm text-neutral-text-secondary">
                Hero / lead story. Stronger shadow + hover transform.
              </p>
            </Card>
          </div>

          {/* Flat list style */}
          <div className="mt-6 rounded-lg border overflow-hidden bg-surface-card" style={{ borderColor: 'var(--surface-card-border)' }}>
            {['Funding watch: Series A closes in Lagos corridor', 'Ecosystem radar: new incubator opens in Abeokuta', 'People: founder interview with Trax'].map(
              (title, i) => (
                <Card key={i} variant="flat" padding="md" className="last:border-b-0">
                  <p className="text-xs text-neutral-text-muted mb-1">2 hrs ago · News</p>
                  <h4 className="text-base font-bold text-neutral-text-primary">{title}</h4>
                </Card>
              )
            )}
          </div>
        </Section>

        {/* Dark background showcase */}
        <Section
          title="Dark Background Scale"
          description="Toggle dark mode above to preview. Inspired by Newsplate footer & BBC promo bars."
        >
          <div
            className="rounded-xl overflow-hidden border"
            style={{ backgroundColor: '#111111', borderColor: 'var(--neutral-border)' }}
          >
            {[
              { label: 'Sunken', token: '--neutral-bg-sunken', hex: '#0A0A0A' },
              { label: 'Base', token: '--neutral-bg', hex: '#111111' },
              { label: 'Subtle', token: '--neutral-bg-subtle', hex: '#1A1A1A' },
              { label: 'Muted', token: '--neutral-bg-muted', hex: '#1F1F1F' },
              { label: 'Elevated', token: '--neutral-bg-elevated', hex: '#242424' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-6 py-4 border-b last:border-0"
                style={{ backgroundColor: `var(${row.token})`, borderColor: 'var(--neutral-border-subtle)' }}
              >
                <span className="text-sm font-medium text-white">{row.label}</span>
                <span className="text-xs font-mono text-white/50">{row.hex}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Typography"
          description="Fraunces (editorial) + Instrument Sans (UI) + Space Mono (accent)"
        >
          <div className="relative overflow-hidden rounded-xl border p-8 md:p-12 bg-surface-card mb-8" style={{ borderColor: 'var(--surface-card-border)' }}>
            <p className="type-watermark absolute inset-0 flex items-center justify-center select-none" aria-hidden>
              TRAX
            </p>
            <div className="relative z-10 space-y-8">
              <div>
                <p className="type-label mb-2">Editorial: Fraunces</p>
                <p className="type-hero max-w-3xl">
                  Tracking Ogun State&apos;s tech movement
                </p>
              </div>
              <div>
                <p className="type-label mb-2">Article title</p>
                <p className="type-article-title max-w-2xl">
                  Abeokuta fintech closes seed round amid regional growth
                </p>
              </div>
              <div>
                <p className="type-label mb-2">Article body (reader)</p>
                <p className="type-prose max-w-2xl">
                  Trax documents the builders, investors, and policies shaping Ogun State&apos;s technology ecosystem: with the clarity of a national newsroom and the focus of a regional intelligence platform.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border p-6 bg-surface-card" style={{ borderColor: 'var(--surface-card-border)' }}>
              <p className="type-label mb-4">UI: Instrument Sans</p>
              <p className="font-ui text-2xl font-bold text-neutral-text-primary mb-2">Trax</p>
              <p className="type-card-title mb-2">Funding watch: startup raises Series A</p>
              <p className="type-excerpt mb-3">
                Excerpt text for cards and list items: scannable, neutral, fast.
              </p>
              <p className="type-meta">2 hrs ago · Funding · 5 min read</p>
              <button type="button" className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white font-ui">
                Subscribe
              </button>
            </div>
            <div className="rounded-xl border p-6 bg-surface-card ds-dashboard" style={{ borderColor: 'var(--surface-card-border)' }}>
              <p className="type-label mb-4">Accent: Space Mono</p>
              <p className="font-ui text-sm text-neutral-text-secondary mb-3">Masthead watermark, category labels, dashboard fields:</p>
              <p className="font-mono text-sm text-neutral-text-muted mb-1" data-mono>
                slug: ogun-fintech-seed-round-2026
              </p>
              <p className="font-mono text-xs text-neutral-text-subtle" data-mono>
                2026-07-05T14:32:00Z · article_id: cm4x9k2
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              ['Display', 'var(--text-display)'],
              ['XL', 'var(--text-xl)'],
              ['Base', 'var(--text-base)'],
              ['XS', 'var(--text-xs)'],
            ].map(([label, size]) => (
              <div key={label} className="rounded-lg border p-4 bg-surface-section" style={{ borderColor: 'var(--surface-card-border)' }}>
                <p className="font-ui font-bold text-neutral-text-primary mb-1" style={{ fontSize: size }}>
                  Aa
                </p>
                <p className="text-xs font-mono text-neutral-text-muted">{label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Spacing"
          description="4px base grid: calm editorial rhythm"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {[
              ['1', '4px'],
              ['2', '8px'],
              ['4', '16px'],
              ['6', '24px'],
              ['8', '32px'],
              ['12', '48px'],
              ['16', '64px'],
            ].map(([token, px]) => (
              <div key={token} className="text-center">
                <div
                  className="mx-auto mb-2 bg-brand/20 rounded-sm"
                  style={{ width: '100%', height: `var(--space-${token})`, maxHeight: '4rem' }}
                />
                <p className="text-xs font-mono text-neutral-text-muted">--space-{token}</p>
                <p className="text-xs text-neutral-text-subtle">{px}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Design Direction"
          description="LOCKED: 3 style zones (Brutalism · Swiss · Editorial) + Premium execution (cross-cutting, tight, flat)"
        >
          <div className="space-y-6">
            {[
              {
                layer: `1 · Brutalism — ${styleLayers.brutalism.zone}`,
                desc: styleLayers.brutalism.language,
                sample: (
                  <div className="ds-home border p-6 bg-surface-page relative overflow-hidden" style={{ borderColor: 'var(--surface-card-border)' }}>
                    <p className="type-watermark absolute inset-0 flex items-center justify-center opacity-[0.04]">TRAX</p>
                    <hr className="ds-rule-hard relative z-10" />
                    <p className="type-masthead relative z-10 mt-4 text-3xl">One loud moment.</p>
                    <hr className="ds-rule-hard relative z-10 mt-4" />
                  </div>
                ),
              },
              {
                layer: `2 · Swiss — ${styleLayers.swiss.zone}`,
                desc: styleLayers.swiss.language,
                sample: (
                  <p className="font-ui text-sm text-neutral-text-muted uppercase tracking-label">
                    Funding · 2 hrs ago · 5 min read
                  </p>
                ),
              },
              {
                layer: `3 · Editorial — ${styleLayers.editorial.zone}`,
                desc: styleLayers.editorial.language,
                sample: (
                  <p className="font-editorial text-2xl font-bold text-neutral-text-primary">
                    Ogun startup raises seed as ecosystem accelerates
                  </p>
                ),
              },
              {
                layer: `Premium — ${premiumExecution.applies}`,
                desc: `${premiumExecution.governs.join(' · ')}. ${lockedDesignRules.elevation.stories}`,
                sample: (
                  <div className="ds-premium-panel max-w-sm">
                    <p className="ds-premium-panel__eyebrow">Module example</p>
                    <p className="ds-premium-panel__title">Border only, no elevation</p>
                    <p className="ds-premium-panel__desc">Signup panels and sidebars — not story cards.</p>
                  </div>
                ),
              },
            ].map((row) => (
              <div key={row.layer} className="rounded-xl border p-6 bg-surface-card" style={{ borderColor: 'var(--surface-card-border)' }}>
                <p className="ds-category-label mb-1">{row.layer}</p>
                <p className="type-excerpt mb-4">{row.desc}</p>
                {row.sample}
              </div>
            ))}

            <div className="rounded-xl border p-6 bg-surface-card" style={{ borderColor: 'var(--surface-card-border)' }}>
              <p className="ds-category-label mb-2">Dominance rules</p>
              <ul className="space-y-2 type-meta">
                {Object.entries(dominanceRules).map(([key, rule]) => (
                  <li key={key}>
                    <span className="font-ui font-semibold text-neutral-text-primary">{key}</span>
                    {' — '}
                    {rule}
                  </li>
                ))}
              </ul>
              <p className="type-meta mt-4 text-neutral-text-subtle">
                Mobile masthead: {styleLayers.brutalism.responsive.below768}
              </p>
            </div>

            <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--surface-card-border)' }}>
              <p className="ds-category-label px-6 pt-6 pb-2">Component → layer map</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-t border-b text-left font-ui text-xs uppercase tracking-label text-neutral-text-muted" style={{ borderColor: 'var(--neutral-border)' }}>
                      <th className="px-6 py-3">Component</th>
                      <th className="px-6 py-3">Style layer</th>
                      <th className="px-6 py-3">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(componentLayerMap).map(([name, map]) => (
                      <tr key={name} className="border-b" style={{ borderColor: 'var(--neutral-border)' }}>
                        <td className="px-6 py-2 font-mono text-xs text-neutral-text-primary">{name}</td>
                        <td className="px-6 py-2 capitalize">{map.style}</td>
                        <td className="px-6 py-2 type-meta">{map.premium.join(', ') || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="ds-band border p-4 rounded-lg" style={{ borderColor: 'var(--surface-card-border)' }}>
                <p className="text-xs font-ui font-semibold mb-1">ds-band</p>
                <p className="type-meta">Default page surface</p>
              </div>
              <div className="ds-band-tint border p-4 rounded-lg" style={{ borderColor: 'var(--surface-card-border)' }}>
                <p className="text-xs font-ui font-semibold mb-1">ds-band-tint</p>
                <p className="type-meta">Tinted rhythm band</p>
              </div>
              <div className="ds-band-muted border p-4 rounded-lg" style={{ borderColor: 'var(--surface-card-border)' }}>
                <p className="text-xs font-ui font-semibold mb-1">ds-band-muted</p>
                <p className="type-meta">Muted rhythm band</p>
              </div>
            </div>

            <div className="ds-section-header max-w-md">
              <p className="type-section-title">Section with red marker</p>
              <p className="type-excerpt mt-1">Accent used for markers, links, nav: not rainbow categories</p>
            </div>

            <SectionMarker title="Latest News" subtitle="newsflash-style vertical red bar" />

            <SiteUtilityBar weatherLabel="26.7°C" center={<span className="font-bold">Trax</span>} />

            <div className="flex flex-wrap gap-2">
              <span className="ds-category-pill">Funding</span>
              <span className="ds-category-pill">Ecosystem</span>
            </div>

            <hr className="ds-editorial-divider" />
          </div>
        </Section>

        <Section
          title="Iconography"
          description="Hugeicons Stroke Rounded: semantic names via &lt;Icon name=&quot;…&quot; /&gt;"
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {iconNames.map((name) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 rounded-lg border p-3 bg-surface-card"
                style={{ borderColor: 'var(--surface-card-border)' }}
              >
                <Icon name={name} size="md" />
                <p className="text-[10px] font-mono text-neutral-text-muted text-center">{name}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button type="button" className="ds-icon-btn" aria-label="Search example">
              <Icon name="search" size="sm" />
            </button>
            <p className="type-meta">ds-icon-btn: circular nav search (newsflash)</p>
          </div>
        </Section>

        <Section
          title="Motion &amp; Animation"
          description="Framer Motion + CSS: editorial restraint, Swiss snap, one dramatic homepage beat"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border p-6 bg-surface-card" style={{ borderColor: 'var(--surface-card-border)' }}>
              <p className="ds-category-label mb-4">Duration scale</p>
              <ul className="space-y-2 type-meta text-sm">
                {Object.entries(motionDuration).map(([name, sec]) => (
                  <li key={name} className="flex justify-between font-mono">
                    <span>{name}</span>
                    <span>{sec * 1000}ms</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border p-6 bg-surface-card" style={{ borderColor: 'var(--surface-card-border)' }}>
              <p className="ds-category-label mb-4">Easing curves</p>
              <ul className="space-y-2 type-meta text-sm font-mono">
                {Object.entries(easingCss).map(([name, curve]) => (
                  <li key={name}>
                    <span className="text-neutral-text-primary">{name}</span>
                    <span className="block text-neutral-text-subtle text-xs truncate">{curve}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border p-8 bg-surface-section overflow-hidden" style={{ borderColor: 'var(--surface-card-border)' }}>
            <p className="ds-category-label mb-6">Live: stagger reveal</p>
            <MotionStagger className="grid gap-4 sm:grid-cols-3">
              {['Lead story', 'Funding watch', 'Builder spotlight'].map((label) => (
                <MotionItem key={label}>
                  <div
                    className="rounded-lg border p-5 bg-surface-card ds-motion-hover"
                    style={{ borderColor: 'var(--surface-card-border)' }}
                  >
                    <p className="type-card-title text-base">{label}</p>
                    <p className="type-meta mt-2">Scroll into view to replay</p>
                  </div>
                </MotionItem>
              ))}
            </MotionStagger>
          </div>

          <div className="mt-6 rounded-xl border p-8 bg-surface-page" style={{ borderColor: 'var(--surface-card-border)' }}>
            <p className="ds-category-label mb-4">Live: fade up</p>
            <MotionReveal variant="fadeUp">
              <p className="type-section-title text-xl">Editorial motion feels confident, not flashy.</p>
              <p className="type-excerpt mt-2 max-w-lg">
                Micro UI at 150ms · cards at 550ms · masthead at 850ms · respects prefers-reduced-motion.
              </p>
            </MotionReveal>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: motionDuration.fast }}
              className="px-4 py-2 rounded-md bg-brand text-white text-sm font-semibold"
            >
              Hover me
            </motion.button>
            <span className="type-meta self-center">Framer whileHover / whileTap on CTAs</span>
          </div>
        </Section>

        <p className="text-center text-xs text-neutral-text-subtle pt-4">
          Reference patterns: newsflash utility bar, red nav, section markers, featured sidebar grid
        </p>
      </div>
    </div>
  )
}
