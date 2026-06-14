'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Disc, Headphones, Calendar } from 'lucide-react'

export default function PodcastPage() {
  const [playingEpisode, setPlayingEpisode] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const episodes = [
    {
      number: 'EP 1',
      title: 'Welcome to the TRAX Podcast',
      guest: 'Trax Team',
      guestTitle: 'Host',
      duration: '2:38 mins',
      date: 'June 14, 2026',
      audioUrl: '/audio/ep1.mp3',
      desc: `An introduction to the TRAX Podcast, exploring our vision to highlight the innovators, builders, and creators shaping the future of technology in Ogun State.`,
    }
  ]

  const togglePlay = (idx: number) => {
    if (!audioRef.current) return

    if (playingEpisode === idx) {
      audioRef.current.pause()
      setPlayingEpisode(null)
    } else {
      audioRef.current.src = episodes[idx].audioUrl
      audioRef.current.play().catch(err => {
        console.error('Audio playback failed:', err)
      })
      setPlayingEpisode(idx)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      setPlayingEpisode(null)
    }

    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="relative pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Hidden HTML5 Audio Element */}
      <audio ref={audioRef} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
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
            className="text-base md:text-lg"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            Conversations with the engineers, researchers, founders, and policy analysts building and regulating Ogun State&apos;s intelligent future.
          </p>
        </div>

        {/* Podcast Listing */}
        <div className="max-w-4xl space-y-6" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          {episodes.map((episode, idx) => {
            const isPlaying = playingEpisode === idx
            return (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl border flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: isPlaying ? 'var(--accent)' : 'var(--card-border)',
                  boxShadow: isPlaying ? '0 8px 32px rgba(200, 75, 49, 0.08)' : 'var(--shadow-sm)',
                }}
              >
                {/* Audio controls + episode number */}
                <div className="flex gap-4 items-center shrink-0">
                  <motion.button
                    onClick={() => togglePlay(idx)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--accent)' }}
                    aria-label={isPlaying ? 'Pause episode' : 'Play episode'}
                  >
                    {isPlaying ? (
                      <Pause size={18} fill="currentColor" />
                    ) : (
                      <Play size={18} fill="currentColor" className="ml-1" />
                    )}
                  </motion.button>
                  <div className="flex flex-col">
                    <span
                      className="text-sm font-extrabold"
                      style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--accent)' }}
                    >
                      {episode.number}
                    </span>
                    <span className="text-[10px] flex items-center gap-1 mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                      <Headphones size={10} /> {episode.duration}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] flex items-center gap-1.5 mb-1.5" style={{ color: 'var(--fg-subtle)' }}>
                    <Calendar size={11} /> {episode.date}
                  </span>
                  <h3
                    className="text-base md:text-lg font-bold mb-1 leading-snug"
                    style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
                  >
                    {episode.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-4 text-xs font-semibold" style={{ color: 'var(--fg-muted)' }}>
                    <span>{episode.guest}</span>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'var(--fg-subtle)' }} />
                    <span className="opacity-75">{episode.guestTitle}</span>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--fg-muted)' }}>
                    {episode.desc}
                  </p>
                </div>

                {/* Ambient vinyl graphic spinning when audio plays */}
                {isPlaying && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    className="hidden lg:block shrink-0"
                    style={{ color: 'var(--accent)' }}
                  >
                    <Disc size={36} className="opacity-70" />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
