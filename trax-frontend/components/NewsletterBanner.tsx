'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { BASE_URL } from '@/lib/api'

interface NewsletterBannerProps {
  /** Optional override headline */
  headline?: string
  /** Optional override subtext */
  subtext?: string
  /** Visual variant: default full-width dark band, 'card' for an inline card */
  variant?: 'banner' | 'card'
}

export default function NewsletterBanner({
  headline = "Get Ogun State's tech news in your inbox",
  subtext  = 'Weekly digest. No spam. Free.',
  variant  = 'banner',
}: NewsletterBannerProps) {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')

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
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isBanner = variant === 'banner'

  return (
    <motion.section
      id="newsletter-banner"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
      style={
        isBanner
          ? {
              backgroundColor: '#0A0A0A',
              padding: 'clamp(56px, 8vw, 96px) 0',
            }
          : {
              backgroundColor: 'var(--card-bg)',
              border:          '1px solid var(--card-border)',
              borderRadius:    '1.25rem',
              padding:         '2.5rem',
              boxShadow:       'var(--shadow-md)',
            }
      }
    >
      {/* ── Dot-grid background (banner only) ── */}
      {isBanner && (
        <>
          <div className="absolute inset-0 dot-grid" style={{ opacity: 0.22 }} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,75,49,0.09) 0%, transparent 70%)',
            }}
          />
        </>
      )}

      <div className={`relative z-10 ${isBanner ? 'container' : ''}`}>
        <div className="max-w-xl mx-auto text-center">

          {/* ── Icon ── */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 mx-auto"
            style={{
              backgroundColor: 'rgba(200,75,49,0.15)',
              border:          '1px solid rgba(200,75,49,0.3)',
            }}
          >
            <Mail size={24} color="#C84B31" strokeWidth={1.75} />
          </motion.div>

          {/* ── Eyebrow ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-1.5"
            style={{ color: '#C84B31', fontFamily: 'var(--font-oxanium)' }}
          >
            <Sparkles size={11} />
            Newsletter
          </motion.p>

          {/* ── Headline ── */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold mb-3"
            style={{
              fontFamily:    'var(--font-oxanium)',
              color:         isBanner ? '#FFFFFF' : 'var(--fg)',
              fontSize:      'clamp(1.4rem, 3vw, 2rem)',
              lineHeight:    1.15,
              letterSpacing: '-0.025em',
            }}
          >
            {headline}
          </motion.h2>

          {/* ── Subtext ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="text-sm mb-8"
            style={{
              color:       isBanner ? 'rgba(255,255,255,0.55)' : 'var(--fg-muted)',
              fontFamily:  'var(--font-dm-sans)',
              lineHeight:  1.65,
            }}
          >
            {subtext}
          </motion.p>

          {/* ── Form / Success ── */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                transition={{ delay: 0.3, duration: 0.45 }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                noValidate
              >
                {/* Email input */}
                <div className="flex-1 relative">
                  <input
                    id="newsletter-banner-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    placeholder="you@example.com"
                    aria-label="Email address"
                    aria-describedby={error ? 'newsletter-error' : undefined}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: isBanner
                        ? 'rgba(255,255,255,0.08)'
                        : 'var(--bg)',
                      border:     `1px solid ${error ? '#EF4444' : isBanner ? 'rgba(255,255,255,0.15)' : 'var(--border)'}`,
                      color:      isBanner ? '#F0F0F0' : 'var(--fg)',
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                    onFocus={(e) => {
                      if (!error) {
                        e.target.style.borderColor = '#C84B31'
                        e.target.style.boxShadow   = '0 0 0 3px rgba(200,75,49,0.15)'
                      }
                    }}
                    onBlur={(e) => {
                      if (!error) {
                        e.target.style.borderColor = isBanner
                          ? 'rgba(255,255,255,0.15)'
                          : 'var(--border)'
                        e.target.style.boxShadow = 'none'
                      }
                    }}
                  />
                </div>

                {/* CTA button */}
                <motion.button
                  id="newsletter-banner-submit"
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { backgroundColor: '#A93B24', scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white shrink-0 transition-colors duration-200"
                  style={{
                    backgroundColor: '#C84B31',
                    fontFamily:      'var(--font-dm-sans)',
                    cursor:          loading ? 'wait' : 'pointer',
                    boxShadow:       '0 4px 14px rgba(200,75,49,0.35)',
                  }}
                >
                  {loading ? (
                    /* Spinner */
                    <svg
                      className="animate-spin"
                      width="16" height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                  ) : (
                    <>
                      <Mail size={15} strokeWidth={2} />
                      Subscribe
                      <ArrowRight size={14} strokeWidth={2} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              /* Success state */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center gap-3 py-4"
              >
                <CheckCircle size={22} color="#10B981" />
                <p
                  className="font-medium text-base"
                  style={{ color: '#10B981', fontFamily: 'var(--font-dm-sans)' }}
                >
                  You&apos;re subscribed! First issue hits your inbox soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inline error */}
          {error && !submitted && (
            <motion.p
              id="newsletter-error"
              role="alert"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs text-center"
              style={{ color: '#EF4444', fontFamily: 'var(--font-dm-sans)' }}
            >
              {error}
            </motion.p>
          )}

          {/* Trust note */}
          {!submitted && (
            <p
              className="mt-4 text-[11px]"
              style={{
                color:      isBanner ? 'rgba(255,255,255,0.28)' : 'var(--fg-subtle)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              Join 12,000+ readers. Unsubscribe any time.
            </p>
          )}
        </div>
      </div>
    </motion.section>
  )
}
