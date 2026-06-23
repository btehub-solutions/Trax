'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, MessageCircle, Play, Rss, Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { navLinks } from '@/lib/articles'
import { BASE_URL } from '@/lib/api'

const footerLinks = {
  Company: [
    { label: 'About',     href: '/about'     },
    { label: 'Team',      href: '/team'      },
    { label: 'Advertise', href: '/advertise' },
    { label: 'Careers',   href: '/careers'   },
  ],
  Coverage: [
    { label: 'News',      href: '/news'      },
    { label: 'Startups',  href: '/startups'  },
    { label: 'Ecosystem', href: '/ecosystem' },
    { label: 'Events',    href: '/events'    },
  ],
  Resources: [
    { label: 'Newsletter', href: '/newsletter' },
    { label: 'Ecosystem Map',     href: '/map'        },
    { label: 'Funding DB', href: '/funding'    },
    { label: 'Podcast',    href: '/podcast'    },
  ],
}

const socials = [
  { icon: X,             label: 'Twitter / X', href: 'https://twitter.com'   },
  { icon: Globe,         label: 'LinkedIn',    href: 'https://linkedin.com'  },
  { icon: MessageCircle, label: 'Instagram',   href: 'https://instagram.com' },
  { icon: Play,          label: 'YouTube',     href: 'https://youtube.com'   },
  { icon: Rss,           label: 'RSS Feed',    href: '/rss'                  },
]

export default function Footer() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [timeoutId, setTimeoutId] = useState<any>(null)

  const showToast = (message: string) => {
    if (timeoutId) clearTimeout(timeoutId)
    setToastMessage(message)
    const id = setTimeout(() => setToastMessage(null), 2500)
    setTimeoutId(id)
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
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: 'var(--nav-bg)',
        borderColor:     'rgba(200, 75, 49, 0.09)',
        fontFamily:      'var(--font-dm-sans)',
      }}
      role="contentinfo"
    >
      {/* ── Newsletter Banner ── */}
      <div
        className="border-b"
        style={{ borderColor: 'rgba(200, 75, 49, 0.09)' }}
      >
        <div className="container py-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            {/* Left copy */}
            <div className="flex items-start gap-4 md:max-w-sm">
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(200,75,49,0.15)', border: '1px solid rgba(200,75,49,0.25)' }}
              >
                <Mail size={18} color="#C84B31" />
              </div>
              <div>
                <p
                  className="text-sm font-bold text-white mb-0.5"
                  style={{ fontFamily: 'var(--font-oxanium)' }}
                >
                  Stay ahead of the curve
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-subtle)' }}>
                  Weekly dispatches on Ogun State Tech, free, no spam.
                </p>
              </div>
            </div>

            {/* Right form */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <div className="relative pb-6">
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col sm:flex-row gap-2.5 max-w-lg"
                    >
                      <input
                        id="footer-newsletter-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError('') }}
                        placeholder="Enter your email address"
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          border:          '1px solid rgba(255,255,255,0.08)',
                          color:           '#F4F4F5',
                          fontFamily:      'var(--font-dm-sans)',
                          fontSize:        '16px', // prevents iOS Safari auto-zoom on focus
                          transition:      'border-color 0.2s, box-shadow 0.2s',
                        }}
                        onFocus={(e) => {
                          if (!error) {
                            e.target.style.borderColor = '#C84B31'
                            e.target.style.boxShadow   = '0 0 0 3px rgba(200,75,49,0.12)'
                          }
                        }}
                        onBlur={(e) => {
                          if (!error) {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                            e.target.style.boxShadow   = 'none'
                          }
                        }}
                      />
                      <motion.button
                        id="footer-newsletter-submit"
                        type="submit"
                        disabled={loading}
                        whileHover={{ opacity: 0.92, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white shrink-0 shadow-md transition-all"
                        style={{
                          backgroundImage: 'var(--accent-gradient)',
                          fontFamily:      'var(--font-dm-sans)',
                          cursor:          loading ? 'wait' : 'pointer',
                        }}
                      >
                        {loading ? (
                          <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                            <path d="M12 2a10 10 0 0 1 10 10" />
                          </svg>
                        ) : (
                          <>Subscribe <ArrowRight size={14} /></>
                        )}
                      </motion.button>
                    </motion.form>
                    {error && (
                      <p className="text-xs text-red-500 mt-2 absolute bottom-0 left-0">{error}</p>
                    )}
                  </div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5"
                  >
                    <CheckCircle size={18} color="#10B981" />
                    <p className="text-sm font-medium" style={{ color: '#10B981', fontFamily: 'var(--font-dm-sans)' }}>
                      You&apos;re subscribed! Welcome to Trax.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="container py-14">

        {/* ── Top Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 mb-14">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-flex items-baseline gap-1 mb-4" id="footer-logo">
              <span
                className="text-2xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-oxanium)', color: '#C84B31' }}
              >
                Trax
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--fg-muted)' }}>
              Ogun State&apos;s tech news and startup media platform, covering the
              startups, research, policy and people shaping the continent&apos;s tech future.
            </p>
            {/* Nav links (from main nav) */}
            <div className="flex flex-wrap gap-3 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium transition-colors hover:text-white"
                  style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault()
                    showToast(`${label} page is coming soon!`)
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  id={`footer-social-${label.toLowerCase().replace(/[\s/]+/g, '-')}`}
                  whileHover={{ scale: 1.1, borderColor: '#C84B31', color: '#C84B31' }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg border transition-colors duration-200"
                  style={{ color: 'var(--fg-subtle)', borderColor: 'var(--border)' }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4
                className="text-[10px] font-bold tracking-[0.18em] uppercase mb-5"
                style={{ color: '#C84B31', fontFamily: 'var(--font-oxanium)' }}
              >
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: 'var(--fg-subtle)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="h-px mb-8" style={{ backgroundColor: 'rgba(200, 75, 49, 0.09)' }} />

        {/* ── Bottom Row ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>
            © {new Date().getFullYear()} Trax Media Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Cookie Policy', href: '/cookies' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs transition-colors hover:text-white"
                style={{ color: 'var(--fg-subtle)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border text-sm font-semibold flex items-center gap-2.5 shadow-2xl backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(20,20,20,0.85)',
              borderColor: 'rgba(255,255,255,0.08)',
              color: '#F4F4F5',
            }}
          >
            <span style={{ color: '#C84B31' }}>✦</span>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
