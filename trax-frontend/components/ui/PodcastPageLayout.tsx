'use client'

import { useEffect, useRef, useState } from 'react'
import PlatformPageShell from '@/components/ui/PlatformPageShell'
import PlatformPageIntro from '@/components/ui/PlatformPageIntro'
import NewsletterSubscribeFields from '@/components/newsletter/NewsletterSubscribeFields'
import { SectionBand, SectionMarker } from '@/design-system/components'
import { Icon } from '@/design-system/icons'

// ── Episode config ────────────────────────────────────────────────────────────
// To add a new episode, prepend an object to this array.
// The FIRST episode in the array is always the one shown in the main player.

interface Episode {
  id: string
  /** File path relative to /public, e.g. '/audio/ep2.mp3' */
  audioSrc: string
  label: string
  duration: string
  date: string
  title: string
  host: string
  description: string
}

const EPISODES: Episode[] = [
  {
    id: 'ep1',
    audioSrc: '/audio/ep1.mp3',
    label: 'Ep 1',
    duration: '2:38 mins',
    date: 'June 14, 2026',
    title: 'Welcome to the Trax Podcast',
    host: 'Trax Team · Host',
    description:
      'An introduction to the Trax Podcast · Our vision to highlight the innovators, builders, and creators shaping technology in Ogun State.',
  },
]

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
  const [activeEpisodeId, setActiveEpisodeId] = useState(EPISODES[0].id)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const activeEpisode = EPISODES.find((e) => e.id === activeEpisodeId) ?? EPISODES[0]

  useEffect(() => {
    // Clean up previous audio when episode changes
    audioRef.current?.pause()
    audioRef.current = new Audio(activeEpisode.audioSrc)
    audioRef.current.onended = () => setIsPlaying(false)
    setIsPlaying(false)
    return () => {
      audioRef.current?.pause()
    }
  }, [activeEpisodeId, activeEpisode.audioSrc])

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

  const selectEpisode = (id: string) => {
    setActiveEpisodeId(id)
  }

  return (
    <PlatformPageShell>
      <PlatformPageIntro
        label="Audio stories"
        title="Trax Podcast"
        description="Conversations with the engineers, researchers, founders, and policy analysts building and regulating Ogun State's intelligent future."
      />

      {/* ── Main player ───────────────────────────────────────────────── */}
      <SectionBand variant="tint">
        <div className="container">
          <SectionMarker
            title="Latest episode"
            subtitle={`${activeEpisode.label} · Now playing`}
          />
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
                <p className="ds-category-label">{activeEpisode.label}</p>
                <p className="type-meta">
                  <Icon name="clock" size="xs" aria-hidden /> {activeEpisode.duration}
                </p>
              </div>
            </div>

            <div className="ds-platform-podcast-player__meta">
              <p className="type-meta">
                <Icon name="calendar" size="xs" aria-hidden /> {activeEpisode.date}
              </p>
              <h2 className="ds-platform-podcast-player__title">{activeEpisode.title}</h2>
              <p className="type-meta">{activeEpisode.host}</p>
              <p className="type-excerpt">{activeEpisode.description}</p>
            </div>
          </article>
        </div>
      </SectionBand>

      {/* ── Episode catalogue (only shown when there are 2+ episodes) ─── */}
      {EPISODES.length > 1 && (
        <SectionBand variant="default">
          <div className="container">
            <SectionMarker title="All episodes" subtitle="Browse past conversations" />
            <div className="ds-platform-lineup">
              {EPISODES.map((ep) => (
                <button
                  key={ep.id}
                  type="button"
                  onClick={() => selectEpisode(ep.id)}
                  className={`ds-premium-panel ds-platform-podcast-episode${ep.id === activeEpisodeId ? ' is-active' : ''}`}
                  aria-pressed={ep.id === activeEpisodeId}
                >
                  <p className="ds-category-label">{ep.label} · {ep.duration}</p>
                  <h3 className="ds-platform-lineup__title">{ep.title}</h3>
                  <p className="type-meta">{ep.date}</p>
                  <p className="type-excerpt">{ep.description}</p>
                </button>
              ))}
            </div>
          </div>
        </SectionBand>
      )}

      {/* ── Show segments ─────────────────────────────────────────────── */}
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

      {/* ── Newsletter signup — kept exactly as before ────────────────── */}
      <SectionBand variant="tint">
        <div className="container ds-platform-page__intro">
          <div className="ds-platform-page__intro-copy">
            <p className="ds-category-label">New episodes</p>
            <h2 className="ds-platform-page__title">Never miss an episode</h2>
            <p className="type-excerpt ds-platform-page__desc">
              Get notified when new conversations drop: founders, policy, and technical deep dives.
            </p>
          </div>

          <div className="ds-premium-panel">
            <NewsletterSubscribeFields
              id="podcast-alerts-email"
              submitLabel="Get episode alerts"
              loadingLabel="Sending link…"
            />
          </div>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
