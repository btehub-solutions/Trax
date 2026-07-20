'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionButton } from '@/design-system/components'
import { primaryNav, menuSocials } from '@/lib/navigation'
import {
  NEWSLETTER_ALREADY_TEXT,
  NEWSLETTER_ALREADY_TITLE,
  NEWSLETTER_PENDING_TEXT,
  NEWSLETTER_PENDING_TITLE,
} from '@/lib/newsletter'
import { useNewsletterSubscribe } from '@/components/newsletter/NewsletterSubscribeFields'
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
  const {
    email,
    setEmail,
    loading,
    error,
    status,
    message,
    handleSubmit,
  } = useNewsletterSubscribe()

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 2500)
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
              {status === 'idle' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                <form onSubmit={handleSubmit} className="ds-footer-subscribe">
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
                      onChange={(e) => setEmail(e.target.value)}
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
                      {loading ? 'Sending link…' : 'Subscribe'}
                    </MotionButton>
                  </div>
                  {error && <p className="ds-footer-subscribe__error">{error}</p>}
                </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ds-footer-subscribe__success"
                >
                  <p className="ds-newsletter-card__success-title">
                    {status === 'already' ? NEWSLETTER_ALREADY_TITLE : NEWSLETTER_PENDING_TITLE}
                  </p>
                  <p className="type-meta">
                    {status === 'already'
                      ? NEWSLETTER_ALREADY_TEXT
                      : message || NEWSLETTER_PENDING_TEXT}
                  </p>
                </motion.div>
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
              {menuSocials.map(({ label, href, placeholder }) => (
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
