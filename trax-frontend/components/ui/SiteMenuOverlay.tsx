'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import TraxWordmark from '@/design-system/components/TraxWordmark'
import { MotionButton } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import {
  menuGroups,
  menuSocials,
  primaryNav,
  isNavActive,
} from '@/lib/navigation'

interface SiteMenuOverlayProps {
  open: boolean
  mounted: boolean
  onClose: () => void
  onOpenSearch: () => void
}

export default function SiteMenuOverlay({
  open,
  mounted,
  onClose,
  onOpenSearch,
}: SiteMenuOverlayProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(null), 2500)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="ds-site-menu__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            id="nav-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="ds-site-menu"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ds-site-menu__header">
              <TraxWordmark id="menu-logo" className="ds-site-menu__logo" />
              <button
                type="button"
                onClick={onClose}
                className="ds-site-menu__close"
                aria-label="Close menu"
              >
                <Icon name="close" size="md" />
              </button>
            </div>

            <div className="ds-site-menu__sections" aria-label="Editorial sections">
              {primaryNav.map((item) => {
                const active = isNavActive(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`ds-site-menu__section-link${active ? ' is-active' : ''}`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="ds-site-menu__body">
              <aside className="ds-site-menu__sidebar">
                <div className="ds-site-menu__sidebar-block">
                  <p className="ds-site-menu__label">Search platform</p>
                  <button
                    type="button"
                    className="ds-site-menu__search"
                    onClick={() => {
                      onClose()
                      onOpenSearch()
                    }}
                  >
                    <Icon name="search" size="sm" />
                    <span>Search articles, topics…</span>
                  </button>
                </div>

                <div className="ds-site-menu__sidebar-block">
                  <p className="ds-site-menu__label">Display theme</p>
                  <div className="ds-menu-segment ds-site-menu__theme">
                    <button
                      type="button"
                      onClick={() => setTheme('light')}
                      className={`ds-menu-segment__btn${mounted && theme !== 'dark' ? ' is-active' : ''}`}
                    >
                      <Icon name="sun" size="xs" />
                      Light
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme('dark')}
                      className={`ds-menu-segment__btn${mounted && theme === 'dark' ? ' is-active' : ''}`}
                    >
                      <Icon name="moon" size="xs" />
                      Dark
                    </button>
                  </div>
                </div>

                <div className="ds-site-menu__sidebar-block">
                  <p className="ds-site-menu__label">Follow us</p>
                  <ul className="ds-site-menu__socials">
                    {menuSocials.map(({ label, href, placeholder }) => (
                      <li key={label}>
                        <a
                          href={href}
                          className="ds-site-menu__social-link"
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
                </div>
              </aside>

              <div className="ds-site-menu__columns">
                {menuGroups.map((group) => (
                  <div key={group.title} className="ds-site-menu__column">
                    <h3 className="ds-site-menu__column-title">{group.title}</h3>
                    <ul className="ds-site-menu__links">
                      {group.links.map((link) => (
                        <li key={`${group.title}-${link.href}-${link.label}`}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="ds-site-menu__link"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <aside className="ds-site-menu__promo">
                <p className="ds-site-menu__label">Featured dispatch</p>
                <div className="ds-site-menu__promo-card">
                  <p className="ds-site-menu__promo-title">
                    Never miss a beat from the corridor.
                  </p>
                  <p className="ds-site-menu__promo-text">
                    Weekly briefing on Ogun startups, funding, and ecosystem moves. Free, one email.
                  </p>
                  <MotionButton
                    href="/#newsletter"
                    onClick={onClose}
                    arrow
                    variant="inverse"
                    className="ds-site-menu__promo-btn"
                  >
                    Subscribe free
                  </MotionButton>
                </div>
              </aside>
            </div>

            <div className="ds-site-menu__footer">
              <p className="ds-site-menu__copy">
                © {new Date().getFullYear()} Trax Media Ltd. All rights reserved.
              </p>
              <nav className="ds-site-menu__legal" aria-label="Legal">
                <Link href="/privacy" onClick={onClose} className="ds-site-menu__legal-link">
                  Privacy Policy
                </Link>
                <span aria-hidden>·</span>
                <Link href="/terms" onClick={onClose} className="ds-site-menu__legal-link">
                  Terms of Service
                </Link>
              </nav>
            </div>

            {toastMessage && (
              <div className="ds-site-menu__toast" role="status">
                {toastMessage}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
