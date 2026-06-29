'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Clock, Mail, ArrowRight, CheckCircle, Shield, TrendingUp, BarChart } from 'lucide-react'
import { BASE_URL } from '@/lib/api'

export default function FundingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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

  const databaseModules = [
    {
      icon: TrendingUp,
      title: 'Deal Tracker',
      desc: 'Verify equity rounds, seed stages, debt financing, and institutional compute grants in real-time.',
    },
    {
      icon: BarChart,
      title: 'Investor Directory',
      desc: 'Profiles of active angel syndicates, venture funds, and private offices operating in West Africa.',
    },
    {
      icon: Shield,
      title: 'Market Analytics',
      desc: 'Consolidated reports detailing sector-by-sector funding patterns, valuation benchmarks, and capital flows.',
    },
  ]

  return (
    <div className="relative pt-28 pb-20 min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Info */}
          <div className="lg:col-span-7">
            <span
              className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              RESOURCE DATABASE
            </span>
            <h1
              className="font-extrabold tracking-tight mb-6"
              style={{
                fontFamily: 'var(--font-oxanium)',
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                color: 'var(--fg)',
                lineHeight: 1.1,
              }}
            >
              Venture &amp; Funding Database
            </h1>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
            >
              We are building the first comprehensive venture database tracking early-stage investments, grants, and seed rounds flowing into startups across Ogun State. Get direct insight into corporate actions, valuation models, and active regional investors.
            </p>
          </div>

          {/* Right: Signup Form Card */}
          <div className="lg:col-span-5">
            <div
              className="p-8 rounded-2xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h2
                className="text-lg font-bold mb-2 text-white"
                style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
              >
                Request Database Access
              </h2>
              <p
                className="text-xs mb-6"
                style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
              >
                Sign up below to receive beta alerts and priority invitations when our deal log system goes live.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2"
                      style={{ color: 'var(--fg-subtle)' }}
                    />
                    <input
                      id="funding-alerts-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError('') }}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border)',
                        color: 'var(--fg)',
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: '16px', // prevents iOS auto-zoom
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent)'
                        e.target.style.boxShadow = '0 0 0 3px rgba(232, 0, 15,0.12)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  <motion.button
                    id="funding-alerts-submit"
                    type="submit"
                    disabled={loading}
                    whileHover={{ opacity: 0.92, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shrink-0 shadow-md transition-all"
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
                        Request Access <ArrowRight size={15} />
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 py-6"
                >
                  <CheckCircle size={22} color="#10B981" />
                  <p className="text-sm font-semibold" style={{ color: '#10B981', fontFamily: 'var(--font-dm-sans)' }}>
                    You&apos;re on the priority list!
                  </p>
                </motion.div>
              )}

              {error && (
                <p className="mt-3 text-xs text-red-500 text-center" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                  {error}
                </p>
              )}

              <p className="mt-4 text-[10px] text-center" style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}>
                Your data is secure and encrypted.
              </p>
            </div>
          </div>

        </div>

        {/* Database Modules Grid */}
        <div>
          <h2
            className="text-xl font-bold mb-8 text-white"
            style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
          >
            Database Focus Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {databaseModules.map((mod, i) => {
              const Icon = mod.icon
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border flex flex-col justify-between"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                      style={{
                        backgroundColor: 'rgba(232, 0, 15, 0.08)',
                        borderColor: 'rgba(232, 0, 15, 0.2)',
                      }}
                    >
                      <Icon size={16} style={{ color: 'var(--accent)' }} />
                    </div>
                    <h3
                      className="text-base font-bold mb-3 text-white"
                      style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
                    >
                      {mod.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {mod.desc}
                    </p>
                  </div>
                  <div
                    className="mt-6 pt-4 border-t text-[11px] font-bold flex items-center gap-1.5"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg-subtle)' }}
                  >
                    <Clock size={12} /> Database In Progress
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
