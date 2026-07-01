'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Mail, ArrowRight, CheckCircle, Clock, Sparkles, Users } from 'lucide-react'
import { BASE_URL } from '@/lib/api'

export default function EventsPage() {
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

  const activeEvents = [
    {
      id: 'students-conference-3',
      title: 'Students Conference 3.0: FUTURE READY',
      organizer: 'GEM Educational Foundation',
      edition: 'Future Ready Edition',
      flyerUrl: '/images/students_conference_flyer_new.png',
      registrationUrl: 'https://bit.ly/4vHhjbo',
      isFree: true,
      description: "Every year, thousands of young people leave secondary school excited about admission, but many are unprepared for the realities that come next. That's why we created Students Conference 3.0: FUTURE READY, featuring life-changing conversations, practical guidance, and real preparation.",
    }
  ]

  const upcomingTypes = [
    {
      icon: Sparkles,
      title: 'Abeokuta AI Hackathon',
      focus: 'Local LLMs & AgriTech Integration',
      status: 'Planning Phase (Q3 2026)',
      desc: 'A weekend build session designed for software engineers, ML researchers, and agronomists to develop local-first solutions.',
    },
    {
      icon: Users,
      title: 'Rock City Tech Summit',
      focus: 'Founders, Investors & Policymakers',
      status: 'Core Planning (Q4 2026)',
      desc: 'Ogun State\'s premier tech ecosystem gathering. Highlighting startup sandboxes, policy debates, and venture funding rounds.',
    },
    {
      icon: Calendar,
      title: 'Ogun Dev & Founder Meetups',
      focus: 'Ecosystem Networking & Pitch Practice',
      status: 'Monthly Mixers',
      desc: 'Informal bi-weekly mixers across local tech hubs to demo projects, exchange developer notes, and practice startup pitches.',
    },
  ]

  return (
    <div className="relative pt-28 pb-20 min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none opacity-[0.14]"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Heading & Copy */}
          <div className="lg:col-span-7">
            <span
              className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              TECH CALENDAR
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
              Connecting Ogun State&apos;s Tech Leaders
            </h1>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
            >
              We are curating the definitive tech calendar for Ogun State, connecting developers, startup founders, institutional investors, and policymakers. Sign up below to get early priority notifications, ticket discounts, and alerts the moment event registrations open.
            </p>
          </div>

          {/* Right Column: Sign up Form Card */}
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
                Get Event Alerts
              </h2>
              <p
                className="text-xs mb-6"
                style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
              >
                Join our priority mailing list to receive immediate alerts for ticket releases and scheduling updates.
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
                      id="event-signup-email"
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
                        fontSize: '16px', // prevents iOS Safari auto-zoom
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent)'
                        e.target.style.boxShadow = '0 0 0 3px rgba(255, 26, 26, 0.12)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  <motion.button
                    id="event-signup-submit"
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
                        Notify Me <ArrowRight size={15} />
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
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Active Upcoming Events */}
        <div className="mb-20">
          <h2
            className="text-xl font-bold mb-8 text-white flex items-center gap-2"
            style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" /> Upcoming Ecosystem Events
          </h2>

          {activeEvents.length === 1 ? (
            <div className="max-w-4xl mx-auto">
              {activeEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 md:p-8 rounded-3xl border transition-all duration-300 hover:border-[var(--accent)]/30"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  {/* Left Column: Flyer Image */}
                  <div className="md:col-span-5 flex items-center justify-center">
                    <div className="w-full max-w-[280px] md:max-w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                      <Image
                        src={event.flyerUrl}
                        alt={event.title}
                        width={400}
                        height={600}
                        className="w-full h-auto block transition-transform duration-500 hover:scale-[1.02]"
                        priority
                      />
                    </div>
                  </div>

                  {/* Right Column: Event Details */}
                  <div className="md:col-span-7 flex flex-col justify-between h-full py-2">
                    <div>
                      <span
                        className="inline-block text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full text-white mb-4 shadow-sm"
                        style={{ backgroundColor: 'var(--accent)' }}
                      >
                        {event.organizer}
                      </span>

                      <h3
                        className="text-2xl md:text-3xl font-black mb-4 text-white leading-tight"
                        style={{ fontFamily: 'var(--font-oxanium)' }}
                      >
                        {event.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span
                          className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md"
                          style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--fg-muted)', border: '1px solid var(--border)' }}
                        >
                          {event.edition}
                        </span>
                        {event.isFree && (
                          <span
                            className="text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md"
                            style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.25)' }}
                          >
                            Free Registration
                          </span>
                        )}
                      </div>

                      <p
                        className="text-sm md:text-base leading-relaxed mb-8"
                        style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
                      >
                        {event.description}
                      </p>
                    </div>

                    <div>
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-md transition-all hover:opacity-90 active:scale-98"
                        style={{
                          backgroundImage: 'var(--accent-gradient)',
                          fontFamily: 'var(--font-dm-sans)',
                        }}
                      >
                        Register for Free <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Balanced Grid for Multiple Events */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeEvents.map((event, index) => (
                <motion.a
                  key={event.id}
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col transition-all cursor-pointer"
                >
                  {/* Flyer Image Container */}
                  <div className="w-full max-h-[380px] overflow-hidden rounded-md mb-4 bg-zinc-900 flex items-center justify-center">
                    <Image
                      src={event.flyerUrl}
                      alt={event.title}
                      width={400}
                      height={600}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1">
                    {/* Organizer/Partner badge */}
                    <span
                      className="inline-block text-xs font-extrabold uppercase tracking-wider mb-2 w-fit"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {event.organizer}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-base font-extrabold leading-snug mb-3 line-clamp-3 transition-colors group-hover:text-red-600"
                      style={{ color: 'var(--fg)', fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {event.title}
                    </h3>

                    {/* Register Line */}
                    <div
                      className="mt-auto flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors group-hover:text-red-600"
                      style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
                    >
                      <span>Register now</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* Section: Upcoming Types of Events */}
        <div>
          <h2
            className="text-xl font-bold mb-8 text-white"
            style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
          >
            Tentative Event Lineup
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingTypes.map((event, i) => {
              const Icon = event.icon
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
                        backgroundColor: 'rgba(255, 26, 26, 0.08)',
                        borderColor: 'rgba(255, 26, 26, 0.2)',
                      }}
                    >
                      <Icon size={16} style={{ color: 'var(--accent)' }} />
                    </div>
                    <h3
                      className="text-base font-bold mb-1 text-white"
                      style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="text-xs font-semibold mb-3"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {event.focus}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {event.desc}
                    </p>
                  </div>
                  <div
                    className="mt-6 pt-4 border-t text-[11px] font-bold flex items-center gap-1.5"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg-subtle)' }}
                  >
                    <Clock size={12} />
                    {event.status}
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
