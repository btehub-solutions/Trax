'use client'

import { useEffect, useRef, useState } from 'react'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import { MotionButton, SectionBand, SectionMarker } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import { BASE_URL } from '@/lib/api'

const showSegments = [
  {
    title: 'Founder stories',
    desc: 'Deep conversations with entrepreneurs building digital startups, logistics platforms, and agritech engines in Nigeria.',
  },
  {
    title: 'Tech policy panel',
    desc: 'Analyzing regulatory frameworks, computational rights, and model governance with local digital policy advocates.',
  },
  {
    title: 'Technical deep dives',
    desc: 'Interviews with engineers and researchers discussing architectures, open-source libraries, and dataset curation.',
  },
] as const

export default function PodcastPageLayout() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    audioRef.current = new Audio('/audio/ep1.mp3')
    audioRef.current.onended = () => setIsPlaying(false)
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      void audioRef.current.play()
      setIsPlaying(true)
    }
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
      if (!response.ok) throw new Error(data.message || 'Subscription failed')
      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PlatformPageShell>
      <PlatformPageIntro
        label="Audio stories"
        title="Trax Podcast"
        description="Conversations with the engineers, researchers, founders, and policy analysts building and regulating Ogun State's intelligent future."
      />

      <SectionBand variant="tint">
        <div className="container">
          <SectionMarker title="Latest episode" subtitle="Episode 1 — now playing" />
          <article className="ds-premium-panel ds-platform-podcast-player">
            <div className="ds-platform-podcast-player__controls">
              <button
                type="button"
                onClick={togglePlay}
                className="ds-platform-podcast-player__play"
                aria-label={isPlaying ? 'Pause podcast' : 'Play podcast'}
              >
                {isPlaying ? (
                  <span className="ds-platform-podcast-player__pause" aria-hidden />
                ) : (
                  <span className="ds-platform-podcast-player__icon" aria-hidden>▶</span>
                )}
              </button>
              <div>
                <p className="ds-category-label">Ep 1</p>
                <p className="type-meta">
                  <Icon name="clock" size="xs" aria-hidden /> 2:38 mins
                </p>
              </div>
            </div>

            <div className="ds-platform-podcast-player__meta">
              <p className="type-meta">
                <Icon name="calendar" size="xs" aria-hidden /> June 14, 2026
              </p>
              <h2 className="ds-platform-podcast-player__title">Welcome to the Trax Podcast</h2>
              <p className="type-meta">Trax Team · Host</p>
              <p className="type-excerpt">
                An introduction to the Trax Podcast — our vision to highlight the innovators,
                builders, and creators shaping technology in Ogun State.
              </p>
            </div>
          </article>
        </div>
      </SectionBand>

      <SectionBand variant="default">
        <div className="container">
          <SectionMarker title="Show segments" subtitle="Formats in development for the corridor" />
          <div className="ds-platform-lineup">
            {showSegments.map((seg) => (
              <div key={seg.title} className="ds-premium-panel">
                <p className="ds-category-label">{seg.title}</p>
                <p className="type-excerpt">{seg.desc}</p>
                <p className="type-meta ds-platform-lineup__status">
                  <Icon name="clock" size="xs" aria-hidden /> Show in development
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionBand>

      <SectionBand variant="tint">
        <div className="container ds-platform-page__intro">
          <div className="ds-platform-page__intro-copy">
            <p className="ds-category-label">New episodes</p>
            <h2 className="ds-platform-page__title">Never miss an episode</h2>
            <p className="type-excerpt ds-platform-page__desc">
              Get notified when new conversations drop — founders, policy, and technical deep dives.
            </p>
          </div>

          <div className="ds-premium-panel">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="ds-platform-page__form">
                <label htmlFor="podcast-alerts-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="podcast-alerts-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="you@company.com"
                  className="ds-platform-page__input"
                />
                <MotionButton type="submit" variant="primary" disabled={loading} className="w-full">
                  {loading ? 'Subscribing…' : 'Get episode alerts'}
                </MotionButton>
                {error && <p className="ds-platform-page__error">{error}</p>}
              </form>
            ) : (
              <p className="ds-platform-page__success">You&apos;re on the episode alert list.</p>
            )}
          </div>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
