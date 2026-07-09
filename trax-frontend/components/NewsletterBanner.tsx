'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import {
  NEWSLETTER_ALREADY_TEXT,
  NEWSLETTER_ALREADY_TITLE,
  NEWSLETTER_PENDING_TEXT,
  NEWSLETTER_PENDING_TITLE,
} from '@/lib/newsletter'
import { useNewsletterSubscribe } from '@/components/newsletter/NewsletterSubscribeFields'

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
  subtext = 'Weekly digest. No spam. Free.',
  variant = 'banner',
}: NewsletterBannerProps) {
  const {
    email,
    setEmail,
    loading,
    error,
    status,
    message,
    handleSubmit,
  } = useNewsletterSubscribe()

  const isBanner = variant === 'banner'
  const isSuccess = status === 'pending' || status === 'already'

  return (
    <motion.section
      id="newsletter-banner"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -64px 0px' }}
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
              border: '1px solid var(--card-border)',
              borderRadius: '1.25rem',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)',
            }
      }
    >
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
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 mx-auto"
            style={{
              backgroundColor: 'rgba(255, 26, 26, 0.15)',
              border: '1px solid rgba(255, 26, 26, 0.3)',
            }}
          >
            <Mail size={24} color="var(--accent-bright)" strokeWidth={1.75} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-1.5"
            style={{ color: 'var(--accent-bright)', fontFamily: 'var(--font-family-editorial)' }}
          >
            <Sparkles size={11} />
            Newsletter
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold mb-3"
            style={{
              fontFamily: 'var(--font-family-editorial)',
              color: isBanner ? '#FFFFFF' : 'var(--fg)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
            }}
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="text-sm mb-8"
            style={{
              color: isBanner ? 'rgba(255,255,255,0.55)' : 'var(--fg-muted)',
              fontFamily: 'var(--font-family-ui)',
              lineHeight: 1.65,
            }}
          >
            {subtext}
          </motion.p>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.45 }}
              >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                noValidate
              >
                <div className="flex-1 relative">
                  <input
                    id="newsletter-banner-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-label="Email address"
                    aria-describedby={error ? 'newsletter-error' : undefined}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: isBanner
                        ? 'rgba(255,255,255,0.08)'
                        : 'var(--bg)',
                      border: `1px solid ${error ? '#EF4444' : isBanner ? 'rgba(255,255,255,0.15)' : 'var(--border)'}`,
                      color: isBanner ? '#F0F0F0' : 'var(--fg)',
                      fontFamily: 'var(--font-family-ui)',
                      fontSize: '16px',
                    }}
                    onFocus={(e) => {
                      if (!error) {
                        e.target.style.borderColor = 'var(--accent)'
                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 26, 26, 0.15)'
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

                <motion.button
                  id="newsletter-banner-submit"
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { backgroundColor: 'var(--accent-hover)', scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white shrink-0 transition-colors duration-200"
                  style={{
                    backgroundColor: 'var(--accent)',
                    fontFamily: 'var(--font-family-ui)',
                    cursor: loading ? 'wait' : 'pointer',
                    boxShadow: '0 4px 14px rgba(255, 26, 26, 0.35)',
                  }}
                >
                  {loading ? (
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
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
              </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center gap-2 py-4"
              >
                <CheckCircle size={22} color="#10B981" />
                <p
                  className="font-semibold text-base"
                  style={{ color: '#10B981', fontFamily: 'var(--font-family-ui)' }}
                >
                  {status === 'already' ? NEWSLETTER_ALREADY_TITLE : NEWSLETTER_PENDING_TITLE}
                </p>
                <p
                  className="text-sm max-w-sm"
                  style={{
                    color: isBanner ? 'rgba(255,255,255,0.65)' : 'var(--fg-muted)',
                    fontFamily: 'var(--font-family-ui)',
                  }}
                >
                  {status === 'already'
                    ? NEWSLETTER_ALREADY_TEXT
                    : message || NEWSLETTER_PENDING_TEXT}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {error && !isSuccess && (
            <motion.p
              id="newsletter-error"
              role="alert"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs text-center"
              style={{ color: '#EF4444', fontFamily: 'var(--font-family-ui)' }}
            >
              {error}
            </motion.p>
          )}

          {!isSuccess && (
            <p
              className="mt-4 text-[11px]"
              style={{
                color: isBanner ? 'rgba(255,255,255,0.28)' : 'var(--fg-subtle)',
                fontFamily: 'var(--font-family-ui)',
              }}
            >
              Join Ogun State&apos;s growing tech community.{' '}
              <a href="/newsletter/unsubscribe" className="underline underline-offset-2">
                Unsubscribe anytime
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </motion.section>
  )
}
