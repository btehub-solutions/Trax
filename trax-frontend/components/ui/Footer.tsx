'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionButton } from '@/design-system/components'
import { primaryNav } from '@/lib/navigation'
import { BASE_URL } from '@/lib/api'
import TraxWordmark from '@/design-system/components/TraxWordmark'

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Advertise', href: '/advertise' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/about#contact' },
]

const resourceLinks = [
  { label: 'Press Room', href: '/press' },
  { label: 'Funding DB', href: '/funding' },
  { label: 'Newsletter', href: '/#newsletter' },
]

const socials = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com/traxnewsng?s=11',
    placeholder: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    placeholder: true,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    placeholder: true,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    placeholder: true,
  },
]

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="ds-footer-col">
      <h3 className="ds-footer-col__title">{title}</h3>
      {children}
    </div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(null), 2500)
  }

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
      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed')
      }
      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const categoryLinks = primaryNav.filter((item) => item.href !== '/')

  return (
    <footer className="ds-site-footer" role="contentinfo">
      <div className="container ds-site-footer__body">
        <div className="ds-site-footer__mast">
          <TraxWordmark id="footer-logo" className="ds-site-footer__logo" />
          <div className="ds-site-footer__mast-copy">
            <p className="ds-site-footer__tagline">
              Ogun State&apos;s tech newsroom for startups, funding, people, and policy from the corridor.
            </p>
            <a href="mailto:traxnewsng@gmail.com" className="ds-footer-link ds-site-footer__email">
              traxnewsng@gmail.com
            </a>
          </div>
        </div>

        <div className="ds-site-footer__grid">
          <FooterColumn title="Get the briefing">
            <p className="ds-footer-col__text">
              Weekly dispatches on funding, founders, and ecosystem moves across Ogun and West Africa.
              Free. One email, no noise.
            </p>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ds-footer-subscribe"
                >
                  <div className="ds-footer-subscribe__fields">
                    <label htmlFor="footer-newsletter-email" className="ds-visually-hidden">
                      Email address
                    </label>
                    <input
                      id="footer-newsletter-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      placeholder="you@company.com"
                      className="ds-footer-subscribe__input"
                    />
                    <MotionButton
                      id="footer-newsletter-submit"
                      type="submit"
                      disabled={loading}
                      size="sm"
                      className="ds-footer-subscribe__btn"
                    >
                      {loading ? 'Joining…' : 'Subscribe'}
                    </MotionButton>
                  </div>
                  {error && <p className="ds-footer-subscribe__error">{error}</p>}
                </motion.form>
              ) : (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ds-footer-subscribe__success"
                >
                  You&apos;re on the list. The next briefing is on its way.
                </motion.p>
              )}
            </AnimatePresence>
          </FooterColumn>

          <FooterColumn title="Coverage">
            <ul className="ds-footer-links ds-footer-links--split">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="ds-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Company">
            <ul className="ds-footer-links">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="ds-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Connect">
            <ul className="ds-footer-links">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="ds-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="ds-footer-social" aria-label="Social media">
              {socials.map(({ label, href, placeholder }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="ds-footer-social__link"
                    onClick={(e) => {
                      if (placeholder) {
                        e.preventDefault()
                        showToast(`${label} is coming soon`)
                      }
                    }}
                    target={placeholder ? undefined : '_blank'}
                    rel={placeholder ? undefined : 'noopener noreferrer'}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>
      </div>

      <div className="ds-site-footer__bar">
        <div className="container ds-site-footer__bar-inner">
          <p className="ds-site-footer__copy">
            © {new Date().getFullYear()} Trax Media Ltd. All rights reserved.
          </p>
          <nav className="ds-site-footer__legal" aria-label="Legal">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Cookies', href: '/cookies' },
              { label: 'Corrections', href: '/about#corrections' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="ds-footer-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="ds-footer-toast"
            role="status"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
