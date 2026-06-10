'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Bookmark, Clock, User } from 'lucide-react'
import { useState } from 'react'

// ── Category accent colours ──────────────────────────────────────────────────
const categoryColors: Record<string, { bg: string; color: string; border: string }> = {
  Funding:   { bg: 'rgba(16,185,129,0.12)',  color: '#059669', border: 'rgba(16,185,129,0.25)' },
  Profiles:  { bg: 'rgba(139,92,246,0.12)',  color: '#7C3AED', border: 'rgba(139,92,246,0.25)' },
  Health:    { bg: 'rgba(59,130,246,0.12)',   color: '#2563EB', border: 'rgba(59,130,246,0.25)' },
  Policy:    { bg: 'rgba(245,158,11,0.12)',  color: '#D97706', border: 'rgba(245,158,11,0.25)' },
  Research:  { bg: 'rgba(236,72,153,0.12)',   color: '#DB2777', border: 'rgba(236,72,153,0.25)' },
  Ecosystem: { bg: 'rgba(200,75,49,0.12)',     color: '#C84B31', border: 'rgba(200,75,49,0.25)'   },
  Events:    { bg: 'rgba(6,182,212,0.12)',    color: '#0891B2', border: 'rgba(6,182,212,0.25)'  },
  Interview: { bg: 'rgba(99,102,241,0.12)',   color: '#4F46E5', border: 'rgba(99,102,241,0.25)' },
  // fallback → brand accent
  default:   { bg: 'rgba(200,75,49,0.12)',     color: '#C84B31', border: 'rgba(200,75,49,0.25)'   },
}

// ── Props ────────────────────────────────────────────────────────────────────
export interface ArticleCardProps {
  image:    string
  category: string
  title:    string
  author:   string
  date:     string
  readTime: string
  slug:     string
  /** Optional: show a BREAKING badge */
  breaking?: boolean
  /** Stagger index for entrance animation delay */
  index?: number
}

// ── Component ────────────────────────────────────────────────────────────────
export default function ArticleCard({
  image,
  category,
  title,
  author,
  date,
  readTime,
  slug,
  breaking = false,
  index = 0,
}: ArticleCardProps) {
  const [bookmarked, setBookmarked] = useState(false)

  const cat    = categoryColors[category] ?? categoryColors.default
  const href   = `/articles/${slug}`

  return (
    <motion.article
      // ── Entrance ──
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{
        duration: 0.55,
        delay:    index * 0.07,
        ease:     [0.22, 1, 0.36, 1],
      }}
      // ── Hover lift ──
      whileHover={{
        y:         -6,
        boxShadow: 'var(--shadow-hover)',
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor:     'var(--card-border)',
        boxShadow:       'var(--shadow-sm)',
      }}
    >
      {/* ── Image ──────────────────────────────────────────────────────────── */}
      <Link href={href} aria-label={title} tabIndex={-1} className="block">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={image?.includes('localhost:4000') || image?.includes('supabase.co')}
          />
          {/* subtle scrim on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* BREAKING badge */}
          {breaking && (
            <span
              className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: '#C84B31' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Breaking
            </span>
          )}
        </div>
      </Link>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5">

        {/* Category tag */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full border tracking-wide"
            style={{
              backgroundColor: cat.bg,
              color:           cat.color,
              borderColor:     cat.border,
              fontFamily:      'var(--font-dm-sans)',
            }}
          >
            {category}
          </span>

          {/* Bookmark icon: top-right of body */}
          <motion.button
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
            onClick={(e) => {
              e.preventDefault()
              setBookmarked((b) => !b)
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            className="p-1 rounded-lg transition-colors duration-200"
            style={{ color: bookmarked ? '#C84B31' : 'var(--fg-subtle)' }}
          >
            <Bookmark
              size={16}
              fill={bookmarked ? '#C84B31' : 'none'}
              strokeWidth={bookmarked ? 0 : 1.75}
            />
          </motion.button>
        </div>

        {/* Title */}
        <Link href={href} className="block flex-1">
          <h3
            className="font-bold leading-snug mb-3 line-clamp-2 transition-colors duration-200 group-hover:text-[#C84B31]"
            style={{
              fontFamily:    'var(--font-oxanium)',
              color:         'var(--fg)',
              fontSize:      'clamp(0.95rem, 1.5vw, 1.1rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h3>
        </Link>

        {/* Divider */}
        <div className="h-px my-3" style={{ backgroundColor: 'var(--border)' }} />

        {/* Meta row */}
        <div
          className="flex items-center gap-3 text-xs flex-wrap"
          style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}
        >
          <span className="flex items-center gap-1.5">
            <User size={11} strokeWidth={1.75} />
            <span style={{ color: 'var(--fg-muted)' }}>{author}</span>
          </span>

          <span
            className="w-1 h-1 rounded-full shrink-0"
            style={{ backgroundColor: 'var(--fg-subtle)' }}
          />

          <span>{date}</span>

          <span
            className="w-1 h-1 rounded-full shrink-0"
            style={{ backgroundColor: 'var(--fg-subtle)' }}
          />

          <span className="flex items-center gap-1">
            <Clock size={11} strokeWidth={1.75} />
            {readTime}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
