'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Headphones, Clock, Mail, ArrowRight, CheckCircle, Mic, Play, Radio, Volume2, Calendar } from 'lucide-react'
import { BASE_URL } from '@/lib/api'

export default function PodcastPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/audio/ep1.mp3')
    audioRef.current.onended = () => setIsPlaying(false)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

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

  const showSegments = [
    {
      icon: Mic,
      title: 'Founder Stories',
      desc: 'Deep conversations with the entrepreneurs building digital startups, logistics platforms, and agritech engines in Nigeria.',
    },
    {
      icon: Radio,
      title: 'Tech Policy Panel',
      desc: 'Analyzing regulatory frameworks, computational rights, and model governance with local digital policy advocates.',
    },
    {
      icon: Volume2,
      title: 'Technical Deep Dives',
      desc: 'Interviews with engineers and researchers discussing codebase architectures, open-source libraries, and dataset curation.',
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
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span
            className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            AUDIO STORIES
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
            Trax Podcast
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            Conversations with the engineers, researchers, founders, and policy analysts building and regulating Ogun State&apos;s intelligent future.
          </p>
        </div>

        {/* Active Episode Player Card */}
        <div
          className="p-8 rounded-3xl border mb-16"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left Play Controls */}
            <div className="flex items-center gap-6 shrink-0 border-b md:border-b-0 pb-6 md:pb-0 md:pr-8 md:border-r" style={{ borderColor: 'var(--border)' }}>
              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all bg-[#E8000F] hover:bg-[#9B0008] text-white shadow-lg active:scale-95"
                aria-label={isPlaying ? 'Pause Podcast' : 'Play Podcast'}
              >
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="4" y="4" width="4" height="16" rx="1" />
                    <rect x="16" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                  EP 1
                </span>
                <p className="text-xs flex items-center gap-1.5 mt-1" style={{ color: 'var(--fg-subtle)' }}>
                  <Headphones size={13} /> 2:38 mins
                </p>
              </div>
            </div>

            {/* Right Episode Metadata */}
            <div className="flex-1">
              <span className="text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5" style={{ color: 'var(--fg-subtle)' }}>
                <Calendar size={11} /> June 14, 2026
              </span>
              <h3
                className="text-xl font-bold mt-2 mb-1 text-white"
                style={{ fontFamily: 'var(--font-oxanium)' }}
              >
                Welcome to the TRAX Podcast
              </h3>
              <p className="text-xs font-semibold mb-4" style={{ color: 'var(--fg-muted)' }}>
                Trax Team <span className="mx-1.5">•</span> Host
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
              >
                An introduction to the TRAX Podcast, exploring our vision to highlight the innovators, builders, and creators shaping the future of technology in Ogun State.
              </p>
            </div>
          </div>
        </div>

        {/* Podcast Segments Grid */}
        <div>
          <h2
            className="text-xl font-bold mb-8 text-white"
            style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
          >
            Show Segments &amp; Coverage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showSegments.map((seg, i) => {
              const Icon = seg.icon
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
                      {seg.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {seg.desc}
                    </p>
                  </div>
                  <div
                    className="mt-6 pt-4 border-t text-[11px] font-bold flex items-center gap-1.5"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg-subtle)' }}
                  >
                    <Clock size={12} /> Show In Development
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
