'use client'

import { useState } from 'react'
import { MapPin, Clock, Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BASE_URL } from '@/lib/api'

type Tab = 'startups' | 'hubs' | 'labs'

const tabs: { id: Tab; label: string }[] = [
  { id: 'startups', label: 'Startups' },
  { id: 'hubs',     label: 'Tech Hubs & Incubators' },
  { id: 'labs',     label: 'Academic & Labs' },
]

export default function MapPage() {
  const [activeTab, setActiveTab] = useState<Tab>('startups')
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

  return (
    <div className="relative pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="container relative z-10 max-w-4xl">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            ECOSYSTEM DIRECTORY
          </span>
          <h1
            className="font-extrabold tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-oxanium)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              color: 'var(--fg)',
              lineHeight: 1.1,
            }}
          >
            Ogun State Tech Map
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            A curated directory mapping active startup platforms, corporate labs, research centers, and infrastructure providers across the region.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2.5 border-b mb-10 overflow-x-auto py-1" style={{ borderColor: 'var(--border)' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  // Reset form on tab change
                  setEmail('')
                  setError('')
                  setSubmitted(false)
                }}
                className="px-4 py-3 text-xs md:text-sm font-semibold tracking-wide border-b-2 transition-all shrink-0"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  borderColor: isActive ? 'var(--accent)' : 'transparent',
                  color:       isActive ? 'var(--accent)' : 'var(--fg-muted)',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Coming Soon Card with Alert Form */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-10 rounded-3xl border items-center"
          style={{
            borderColor:     'var(--card-border)',
            backgroundColor: 'var(--card-bg)',
            boxShadow:       'var(--shadow-sm)',
          }}
        >
          {/* Left: Info */}
          <div className="md:col-span-7">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border"
              style={{
                backgroundColor: 'rgba(255, 26, 26, 0.08)',
                borderColor:     'rgba(255, 26, 26, 0.2)',
              }}
            >
              <MapPin size={20} style={{ color: 'var(--accent)' }} />
            </div>
            
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
              style={{ backgroundColor: 'rgba(232, 0, 15, 0.06)', color: 'var(--accent)' }}
            >
              <Clock size={11} /> Directory In Progress
            </span>

            <h2
              className="text-xl md:text-2xl font-bold mb-3 text-white"
              style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)', lineHeight: 1.2 }}
            >
              Mapping the {tabs.find((t) => t.id === activeTab)?.label} Ecosystem
            </h2>
            
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
            >
              We are currently verifying and onboarding tech nodes across Yewa, Ijebu, and Abeokuta to build a comprehensive directory of Ogun State&apos;s digital infrastructure. Get notified immediately when we publish the live interactive map.
            </p>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-5 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-8" style={{ borderColor: 'var(--border)' }}>
            <h3
              className="text-sm font-bold mb-2 text-white"
              style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
            >
              Get Directory Alerts
            </h3>
            <p
              className="text-xs mb-5"
              style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}
            >
              Receive an update the instant we publish our data for {tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--fg-subtle)' }}
                  />
                  <input
                    id="map-alerts-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none transition-all"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border)',
                      color: 'var(--fg)',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '16px', // avoids iOS zoom
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(255, 26, 26, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <motion.button
                  id="map-alerts-submit"
                  type="submit"
                  disabled={loading}
                  whileHover={{ opacity: 0.95, y: -0.5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-white transition-all"
                  style={{
                    backgroundImage: 'var(--accent-gradient)',
                    fontFamily: 'var(--font-dm-sans)',
                    cursor: loading ? 'wait' : 'pointer',
                  }}
                >
                  {loading ? (
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                  ) : (
                    <>
                      Notify Me <ArrowRight size={13} />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 py-4"
              >
                <CheckCircle size={18} color="#10B981" />
                <p className="text-xs font-semibold" style={{ color: '#10B981', fontFamily: 'var(--font-dm-sans)' }}>
                  You&apos;re on the alert list!
                </p>
              </motion.div>
            )}

            {error && (
              <p className="mt-2 text-xs text-red-500 text-center" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                {error}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
