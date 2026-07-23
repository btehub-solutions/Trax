'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { MotionButton, SectionBand, SectionMarker } from '@/design-system/components'
import { Icon } from '@/design-system/icons'

const packages = [
  {
    name: 'Newsletter Sponsor',
    price: '₦150k / week',
    desc: 'Reach founders, VCs, and developers directly in their inbox.',
    features: [
      'Primary header placement',
      '100-word product description',
      'Call-to-action button',
      'Performance analytics report',
    ],
  },
  {
    name: 'Sponsored Feature',
    price: '₦250k / article',
    desc: 'Work with our editorial team to tell your story or launch products.',
    features: [
      'Granular feature article',
      'Homepage visibility for 7 days',
      'Social media shares',
      'Indefinite search inclusion',
    ],
    featured: true,
  },
  {
    name: 'Event Partnerships',
    price: 'Custom packages',
    desc: 'Collaborate on webinars, pitch nights, hackathons, or summits.',
    features: [
      'Co-branding & logo inclusion',
      'Keynote/panel opportunities',
      'Attendee registry list',
      'Custom media assets coverage',
    ],
  },
] as const

export default function AdvertisePageLayout() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('https://formspree.io/f/maqgevgz', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Partnership/Advertise Inquiry',
          form_name: 'Partnership / Advertise Form',
        }),
      })
      if (response.ok) {
        setSubmitted(true)
      } else {
        const data = await response.json()
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      alert('Network error. Please check your internet connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PlatformPageShell>
      <PlatformPageIntro
        label="Partnerships"
        title="Partner with Trax"
        description="Connect your brand with the decision-makers, venture capitalists, technical founders, and developers building Ogun State's tech future."
      />

      <SectionBand variant="tint">
        <div className="container">
          <SectionMarker
            title="Sponsorship packages"
            subtitle="Editorial-first placements across newsletter, features, and events"
          />
          <div className="ds-platform-lineup">
            {packages.map((pkg) => {
              const featured = 'featured' in pkg && pkg.featured
              return (
              <div
                key={pkg.name}
                className={`ds-premium-panel ds-platform-package${featured ? ' ds-platform-package--featured' : ''}`}
              >
                {featured && (
                  <span className="ds-platform-package__badge">Most popular</span>
                )}
                <p className="ds-category-label">{pkg.name}</p>
                <p className="ds-platform-package__price">{pkg.price}</p>
                <p className="type-excerpt">{pkg.desc}</p>
                <ul className="ds-platform-package__features">
                  {pkg.features.map((feat) => (
                    <li key={feat}>
                      <Icon name="check-circle" size="xs" aria-hidden />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="ds-platform-package__cta"
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Inquire now
                </button>
              </div>
            )})}
          </div>
        </div>
      </SectionBand>

      <SectionBand variant="default">
        <div className="container">
          <div id="contact-form" className="ds-premium-panel ds-platform-contact">
            <p className="ds-premium-panel__eyebrow">Get in touch</p>
            <p className="ds-premium-panel__title">Start a partnership</p>
            <p className="ds-premium-panel__desc">
              Fill out the form below or email{' '}
              <a href="mailto:traxnewsng@gmail.com" className="ds-accent-link">
                traxnewsng@gmail.com
              </a>{' '}
              and we will follow up with our sponsorship deck.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ds-platform-contact__form"
                >
                  <div className="ds-platform-contact__row">
                    <div className="ds-platform-contact__field">
                      <label htmlFor="advertise-name">Name</label>
                      <input
                        id="advertise-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Kola"
                        className="ds-platform-page__input"
                      />
                    </div>
                    <div className="ds-platform-contact__field">
                      <label htmlFor="advertise-company">Company</label>
                      <input
                        id="advertise-company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Venti Tech"
                        className="ds-platform-page__input"
                      />
                    </div>
                  </div>

                  <div className="ds-platform-contact__field">
                    <label htmlFor="advertise-email">Work email</label>
                    <input
                      id="advertise-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="kola@company.com"
                      className="ds-platform-page__input"
                    />
                  </div>

                  <div className="ds-platform-contact__field">
                    <label htmlFor="advertise-message">Inquiry details</label>
                    <textarea
                      id="advertise-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your campaign goals, budget, or preferred packages…"
                      className="ds-platform-page__input ds-platform-contact__textarea"
                    />
                  </div>

                  <MotionButton type="submit" variant="primary" disabled={loading} className="w-full">
                    {loading ? 'Sending request…' : 'Send inquiry'}
                  </MotionButton>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ds-platform-page__success ds-platform-contact__success"
                >
                  Inquiry received · An account partner will be in touch shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
