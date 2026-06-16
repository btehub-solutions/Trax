'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Clock, User, Bookmark, Share2, Link2, Check, ArrowLeft } from 'lucide-react'
import ArticleCard from '@/components/ArticleCard'
import type { Article } from '@/lib/articles'
import AdSlot from '@/components/AdSlot'

// ── Category colour map ───────────────────────────────────────────────────────
const categoryColors: Record<string, { bg: string; color: string; border: string }> = {
  Funding:   { bg: 'rgba(16,185,129,0.12)',  color: '#059669', border: 'rgba(16,185,129,0.25)' },
  Profiles:  { bg: 'rgba(139,92,246,0.12)',  color: '#7C3AED', border: 'rgba(139,92,246,0.25)' },
  Health:    { bg: 'rgba(59,130,246,0.12)',   color: '#2563EB', border: 'rgba(59,130,246,0.25)' },
  Policy:    { bg: 'rgba(245,158,11,0.12)',  color: '#D97706', border: 'rgba(245,158,11,0.25)' },
  Research:  { bg: 'rgba(236,72,153,0.12)',   color: '#DB2777', border: 'rgba(236,72,153,0.25)' },
  Ecosystem: { bg: 'rgba(200,75,49,0.12)',     color: '#C84B31', border: 'rgba(200,75,49,0.25)'   },
  Events:    { bg: 'rgba(6,182,212,0.12)',    color: '#0891B2', border: 'rgba(6,182,212,0.25)'  },
  Interview: { bg: 'rgba(99,102,241,0.12)',   color: '#4F46E5', border: 'rgba(99,102,241,0.25)' },
  Startups:  { bg: 'rgba(16,185,129,0.12)',  color: '#10B981', border: 'rgba(16,185,129,0.25)' },
  People:    { bg: 'rgba(139,92,246,0.12)',  color: '#8B5CF6', border: 'rgba(139,92,246,0.25)' },
  Tools:     { bg: 'rgba(59,130,246,0.12)',   color: '#3B82F6', border: 'rgba(59,130,246,0.25)' },
  default:   { bg: 'rgba(200,75,49,0.12)',     color: '#C84B31', border: 'rgba(200,75,49,0.25)'   },
}

// ── Inline SVG brand icons (Lucide removed social brand icons) ────────────────
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ── Generated article body paragraphs ────────────────────────────────────────
function generateBody(article: Article): string[] {
  if ((article as any).body) {
    return (article as any).body
      .split(/\n\s*\n/)
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 0)
  }
  return [
    article.excerpt,
    `The latest data from across Nigeria's thriving technology ecosystem paints a picture of remarkable resilience and ambition. Investors who were cautious just eighteen months ago are now moving with conviction, drawn by a maturing regulatory environment, a deepening talent pool, and a series of high-profile exits that have validated the long-term thesis for Ogun State Tech.`,
    `"What we're seeing is not just capital flowing in, but smart capital," says one Abeokuta-based partner at a pan-Ogun State venture firm who asked not to be named. "Founders are more sophisticated. They understand unit economics. They're building for the state first, not pitching a Western market as an afterthought."`,
    `Central to this shift is the role of homegrown research. A growing number of Nigerian engineers and data scientists who trained at institutions like MIT, Stanford and ETH Zurich are returning home, armed with both technical depth and global networks. Their presence is transforming what once felt like a consumer-internet gold rush into something more foundational.`,
    `The sectors drawing the most attention are perhaps unsurprising: financial services, agriculture, and healthcare, which are verticals where Ogun State's structural challenges are acute enough to justify novel digital-native approaches, and where the addressable markets run into the hundreds of millions.`,
    `Policy is also moving, albeit cautiously. Nigeria's Federal Ministry of Innovation signalled last month that a revised AI regulatory sandbox is in the works, one that could give startups more room to experiment without triggering existing fintech or healthcare regulations. Whether that framework arrives before the end of the year remains to be seen.`,
    `For now, the mood across Abeokuta, Ijebu Ode and Sagamu is one of measured optimism. The record quarter has not triggered hubris so much as a sharpened focus: build products that last, hire deliberately, and treat this moment as a starting gun, not a finish line.`,
  ]
}

// ── Page entrance variants ────────────────────────────────────────────────────
const pageVariants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

// ── Component ─────────────────────────────────────────────────────────────────
interface ArticleReaderProps {
  article:  Article
  related:  Article[]
}

export default function ArticleReader({ article, related }: ArticleReaderProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [copied,     setCopied]     = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Reading progress via Framer Motion useScroll
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 })

  const cat     = categoryColors[article.category] ?? categoryColors.default
  const bodyText = generateBody(article)

  // Share helpers
  const getShareUrl = () => typeof window !== 'undefined' ? window.location.href : ''

  const shareX = () => {
    const url = getShareUrl()
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareLinkedIn = () => {
    const url = getShareUrl()
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
  }

  const copyLink = async () => {
    const url = getShareUrl()
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* ── Reading progress bar ─────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] origin-left"
        style={{
          scaleX,
          height:          '3px',
          backgroundColor: '#C84B31',
          boxShadow:       '0 0 8px rgba(200,75,49,0.6)',
        }}
      />

      {/* ── Page ─────────────────────────────────────────────────────────── */}
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-16"
        style={{ backgroundColor: 'var(--bg)' }}
      >
        {/* ── Hero image ───────────────────────────────────────────────── */}
        <motion.div variants={fadeUp} className="relative w-full" style={{ height: 'clamp(280px, 50vw, 560px)' }}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* gradient scrim */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)',
            }}
          />
          {/* Breaking badge */}
          {article.breaking && (
            <span
              className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full text-white"
              style={{ backgroundColor: '#C84B31' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Breaking
            </span>
          )}
        </motion.div>

        {/* ── Article container ─────────────────────────────────────────── */}
        <div className="container">
          <div className="max-w-2xl mx-auto">

            {/* ── Back link ──────────────────────────────────────────────── */}
            <motion.div variants={fadeUp} className="pt-8 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#C84B31]"
                style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
              >
                <ArrowLeft size={15} strokeWidth={1.9} />
                Back to Trax
              </Link>
            </motion.div>

            {/* ── Category tag & Official Link ───────────────────────────────── */}
            <motion.div variants={fadeUp} className="mb-4 flex flex-wrap gap-2 items-center">
              <span
                className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full border tracking-wide"
                style={{
                  backgroundColor: cat.bg,
                  color:           cat.color,
                  borderColor:     cat.border,
                  fontFamily:      'var(--font-dm-sans)',
                }}
              >
                {article.category}
              </span>
              {article.officialLink && (
                <a
                  href={article.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border tracking-wide transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderColor:     'var(--border)',
                    color:           'var(--fg-muted)',
                    fontFamily:      'var(--font-dm-sans)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(200, 75, 49, 0.1)';
                    e.currentTarget.style.borderColor = '#C84B31';
                    e.currentTarget.style.color = '#C84B31';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--fg-muted)';
                  }}
                >
                  Visit Website ↗
                </a>
              )}
            </motion.div>

            {/* ── Title ──────────────────────────────────────────────────── */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily:    'var(--font-oxanium)',
                color:         'var(--fg)',
                fontSize:      'clamp(1.75rem, 4vw, 2.75rem)',
                lineHeight:    1.1,
                letterSpacing: '-0.03em',
                fontWeight:    700,
                marginBottom:  '1.25rem',
              }}
            >
              {article.title}
            </motion.h1>

            {/* ── Meta row ───────────────────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 pb-6 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Author avatar placeholder + info */}
              <div className="flex items-center gap-3">
                {article.authorAvatar ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-neutral-800">
                    <Image
                      src={article.authorAvatar}
                      alt={article.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: '#C84B31', fontFamily: 'var(--font-oxanium)' }}
                  >
                    {article.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p
                    className="text-sm font-semibold leading-none mb-0.5"
                    style={{ color: 'var(--fg)', fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {article.author}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {article.authorRole}
                  </p>
                </div>
              </div>

              <div
                className="hidden sm:block w-px h-5 self-center"
                style={{ backgroundColor: 'var(--border)' }}
              />

              {/* Date + read time */}
              <div
                className="flex items-center gap-3 text-xs"
                style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}
              >
                <span className="flex items-center gap-1.5">
                  <User size={12} strokeWidth={1.75} />
                  {article.date}
                </span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--fg-subtle)' }} />
                <span className="flex items-center gap-1.5">
                  <Clock size={12} strokeWidth={1.75} />
                  {article.readTime}
                </span>
              </div>

              {/* Bookmark: pushed right */}
              <motion.button
                id="article-bookmark"
                aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this article'}
                onClick={() => setBookmarked((b) => !b)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                className="ml-auto p-2 rounded-lg border transition-all duration-200"
                style={{
                  borderColor:     bookmarked ? '#C84B31' : 'var(--border)',
                  color:           bookmarked ? '#C84B31' : 'var(--fg-muted)',
                  backgroundColor: bookmarked ? 'rgba(200,75,49,0.08)' : 'transparent',
                }}
              >
                <Bookmark
                  size={17}
                  fill={bookmarked ? '#C84B31' : 'none'}
                  strokeWidth={bookmarked ? 0 : 1.75}
                />
              </motion.button>
            </motion.div>

            {/* ── Share bar ──────────────────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 py-4 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <span
                className="text-xs font-semibold mr-2 flex items-center gap-1.5"
                style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
              >
                <Share2 size={13} strokeWidth={1.75} />
                Share
              </span>

              {/* X / Twitter */}
              <motion.button
                id="article-share-x"
                aria-label="Share on X / Twitter"
                onClick={shareX}
                whileHover={{ scale: 1.08, color: '#000', backgroundColor: '#f0f0f0' }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200"
                style={{
                  borderColor:     'var(--border)',
                  color:           'var(--fg-muted)',
                  backgroundColor: 'transparent',
                  fontFamily:      'var(--font-dm-sans)',
                }}
              >
                <XIcon size={13} />
                Post
              </motion.button>

              {/* LinkedIn */}
              <motion.button
                id="article-share-linkedin"
                aria-label="Share on LinkedIn"
                onClick={shareLinkedIn}
                whileHover={{ scale: 1.08, color: '#0A66C2', borderColor: '#0A66C2' }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200"
                style={{
                  borderColor:     'var(--border)',
                  color:           'var(--fg-muted)',
                  backgroundColor: 'transparent',
                  fontFamily:      'var(--font-dm-sans)',
                }}
              >
                <LinkedInIcon size={13} />
                Share
              </motion.button>

              {/* Copy link */}
              <motion.button
                id="article-share-copy"
                aria-label="Copy article link"
                onClick={copyLink}
                whileHover={{ scale: 1.08, color: '#C84B31', borderColor: '#C84B31' }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200"
                style={{
                  borderColor:     copied ? '#10B981' : 'var(--border)',
                  color:           copied ? '#10B981' : 'var(--fg-muted)',
                  backgroundColor: copied ? 'rgba(16,185,129,0.08)' : 'transparent',
                  fontFamily:      'var(--font-dm-sans)',
                }}
              >
                {copied ? <Check size={13} /> : <Link2 size={13} />}
                {copied ? 'Copied!' : 'Copy link'}
              </motion.button>
            </motion.div>

            {/* ── Article body ────────────────────────────────────────────── */}
            <motion.div
              ref={bodyRef}
              variants={fadeUp}
              className="pt-8 pb-12"
            >
              {bodyText.map((para, i) => (
                <React.Fragment key={i}>
                  <p
                    className="mb-6"
                    style={{
                      fontFamily:  'var(--font-dm-sans)',
                      fontSize:    '1.0625rem',
                      lineHeight:  1.85,
                      color:       i === 0 ? 'var(--fg)' : 'var(--fg-muted)',
                      fontWeight:  i === 0 ? 500 : 400,
                    }}
                  >
                    {/* Pull-quote style for direct quotes */}
                    {para.startsWith('"') ? (
                      <span
                        className="block pl-5 border-l-4 italic"
                        style={{
                          borderColor: '#C84B31',
                          color:       'var(--fg)',
                          fontStyle:   'italic',
                        }}
                      >
                        {para}
                      </span>
                    ) : para}
                  </p>

                  {/* Inline ad slot in the middle of the article (after paragraph 2) */}
                  {i === 1 && (
                    <div className="my-8 flex justify-center">
                      <AdSlot size="inline" label="Advertisement" />
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/* Article end mark */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#C84B31', fontFamily: 'var(--font-oxanium)' }}
                >
                  Trax
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
              </div>

              {/* Post-article Rectangle Ad */}
              <div className="mt-8 flex justify-center">
                <AdSlot size="rectangle" label="Sponsor Square" />
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Related articles ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section
            className="section border-t"
            style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--border)' }}
          >
            <div className="container">
              {/* Section header */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: '#C84B31' }} />
                <h2
                  className="font-bold"
                  style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
                >
                  Related Stories
                </h2>
              </motion.div>

              {/* 3-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rel, i) => (
                  <ArticleCard
                    key={rel.id}
                    image={rel.image}
                    category={rel.category}
                    title={rel.title}
                    author={rel.author}
                    date={rel.date}
                    readTime={rel.readTime}
                    slug={rel.slug}
                    breaking={rel.breaking}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </motion.div>
    </>
  )
}
