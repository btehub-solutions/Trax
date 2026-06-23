'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { BASE_URL } from '@/lib/api'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', padding: '56px 0' }}
      id="newsletter"
    >
      <div className="container relative z-10">
        <div className="grid gap-8 md:grid-cols-[1fr_420px] md:items-center rounded-md p-6 md:p-10" style={{ backgroundColor: '#F7D8CF' }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Label */}
            <p
              className="text-xs font-extrabold uppercase mb-4"
              style={{ color: '#FF3D16', fontFamily: 'var(--font-dm-sans)' }}
            >
              Newsletter
            </p>

            {/* Headline */}
            <h2
              className="font-extrabold mb-4 max-w-xl"
              style={{ color: '#1F2933', fontFamily: 'var(--font-dm-sans)', letterSpacing: 0 }}
            >
              Get the best African tech stories in your inbox
            </h2>

            {/* Subtext */}
            <p
              className="mb-10 text-base"
              style={{ color: '#4A2931', fontFamily: 'var(--font-dm-sans)', lineHeight: 1.65 }}
            >
              Join Ogun State&apos;s growing tech community and get weekly
              dispatches on Ogun State Tech, covering funding rounds, founder stories, research breakthroughs,
              and the week's essential reads.
            </p>
          </motion.div>

            {/* Form */}
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-md text-sm outline-none transition-all"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(42,7,24,0.16)',
                    color: '#1F2933',
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '16px', // prevents iOS Safari auto-zoom on focus
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#C84B31'
                    e.target.style.boxShadow = '0 0 0 3px rgba(200,75,49,0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <motion.button
                  id="newsletter-submit"
                  type="submit"
                  disabled={loading}
                  whileHover={{ opacity: 0.92, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-md font-extrabold text-sm text-white shrink-0 transition-all"
                  style={{
                    backgroundImage: 'var(--accent-gradient)',
                    fontFamily: 'var(--font-dm-sans)',
                    cursor: loading ? 'wait' : 'pointer',
                  }}
                >
                  {loading ? (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                  ) : (
                    <>
                      Subscribe <ArrowRight size={15} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center gap-3 py-4"
              >
                <CheckCircle size={22} color="#10B981" />
                <p className="text-base font-medium" style={{ color: '#10B981', fontFamily: 'var(--font-dm-sans)' }}>
                  You&apos;re in! Welcome to Trax.
                </p>
              </motion.div>
            )}

            {/* Inline error */}
            {error && !submitted && (
              <p className="mt-3 text-xs text-center text-red-500" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                {error}
              </p>
            )}

            {!submitted && (
              <p className="mt-4 text-xs" style={{ color: '#6B4A52', fontFamily: 'var(--font-dm-sans)' }}>
                No spam. Unsubscribe anytime. We send one email per week.
              </p>
            )}
        </div>
      </div>
    </section>
  )
}
