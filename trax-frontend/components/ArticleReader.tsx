'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, User, Bookmark, Share2, Link2, Check, ChevronRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import type { Article } from '@/lib/articles'
import AdSlot from '@/components/AdSlot'
import { ADS_ENABLED } from '@/lib/ads'
import { SectionBand } from '@/design-system/components'
import SectionMarker from '@/design-system/components/SectionMarker'
import AuthorAvatar from '@/design-system/components/AuthorAvatar'

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
      .split(/[\r\n]+/)
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



  const bodyText = generateBody(article)

  // Share helpers
  const getShareUrl = () => typeof window !== 'undefined' ? window.location.href : ''

  const shareX = () => {
    const url = getShareUrl()
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}&via=traxnewsng`, '_blank')
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


      {/* ── Page ─────────────────────────────────────────────────────────── */}
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="ds-article-reader min-h-screen"
      >
        <motion.div variants={fadeUp} className="ds-article-reader__hero">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="ds-article-reader__hero-image"
            sizes="100vw"
          />
          <div className="ds-article-reader__hero-scrim" aria-hidden />
          {article.breaking && (
            <span className="ds-hero-lead__breaking absolute top-6 left-6">
              Breaking
            </span>
          )}
        </motion.div>

        <div className="container">
          <div className="ds-article-reader__body">

            {/* ── Breadcrumbs ─────────────────────────────────────────── */}
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="ds-article-reader__breadcrumb"
            >
              <ol className="ds-article-reader__breadcrumb-list">
                <li>
                  <Link
                    href="/"
                    className="font-medium transition-colors hover:text-accent"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight size={12} strokeWidth={2} style={{ color: 'var(--fg-subtle)' }} />
                </li>
                <li>
                  <Link
                    href={`/${article.category.toLowerCase()}`}
                    className="font-medium transition-colors hover:text-accent capitalize"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    {article.category}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight size={12} strokeWidth={2} style={{ color: 'var(--fg-subtle)' }} />
                </li>
                <li
                  aria-current="page"
                  className="truncate max-w-[180px] sm:max-w-xs"
                  style={{ color: 'var(--fg-subtle)' }}
                >
                  {article.title}
                </li>
              </ol>
            </motion.nav>

            {/* ── Category tag & Official Link ───────────────────────────────── */}
            <motion.div variants={fadeUp} className="mb-4 flex flex-wrap gap-2 items-center">
              <span className="ds-category-pill">{article.category}</span>
              {article.officialLink && (
                <a
                  href={article.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-md border transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderColor:     'var(--border)',
                    color:           'var(--fg-muted)',
                    fontFamily:      'var(--font-family-ui)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 26, 26, 0.08)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent)';
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
              className="type-article-title"
              style={{ marginBottom: '1.25rem' }}
            >
              {article.title}
            </motion.h1>

            {/* ── Author & Meta row ──────────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="ds-article-reader__meta-row"
            >
              <div className="flex items-center gap-3">
                <AuthorAvatar name={article.author} src={article.authorAvatar} size="md" />
                <div>
                  <p className="type-meta" style={{ fontWeight: 600, color: 'var(--neutral-text-secondary)' }}>
                    {article.author}
                  </p>
                  <p className="type-meta">{article.authorRole || 'Trax Editorial'}</p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-5 self-center" style={{ backgroundColor: 'var(--border)' }} />

              <div className="type-meta flex items-center gap-3">
                <time dateTime={article.date} className="flex items-center gap-1.5">
                  <User size={12} strokeWidth={1.75} />
                  {article.date}
                </time>
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
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.88 }}
                className="ml-auto p-2.5 rounded-xl border transition-all duration-200"
                style={{
                  borderColor:     bookmarked ? 'var(--accent)' : 'var(--border)',
                  color:           bookmarked ? 'var(--accent)' : 'var(--fg-muted)',
                  backgroundColor: bookmarked ? 'rgba(255, 26, 26, 0.08)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <Bookmark
                  size={16}
                  fill={bookmarked ? 'var(--accent)' : 'none'}
                  strokeWidth={bookmarked ? 0 : 1.75}
                />
              </motion.button>
            </motion.div>

            {/* ── Share bar ──────────────────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-2 py-4 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <span
                className="text-xs font-bold uppercase tracking-wide mr-1 flex items-center gap-1.5"
                style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-family-ui)', letterSpacing: '0.06em' }}
              >
                <Share2 size={12} strokeWidth={2} />
                Share
              </span>

              {/* X / Twitter */}
              <motion.button
                id="article-share-x"
                aria-label="Share on X / Twitter"
                onClick={shareX}
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200"
                style={{
                  borderColor:     'var(--border)',
                  color:           'var(--fg-muted)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  fontFamily:      'var(--font-family-ui)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000'
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.08)'
                  e.currentTarget.style.color = 'var(--fg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.color = 'var(--fg-muted)'
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
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200"
                style={{
                  borderColor:     'var(--border)',
                  color:           'var(--fg-muted)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  fontFamily:      'var(--font-family-ui)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0A66C2'
                  e.currentTarget.style.backgroundColor = 'rgba(10,102,194,0.08)'
                  e.currentTarget.style.color = '#0A66C2'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.color = 'var(--fg-muted)'
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
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200"
                style={{
                  borderColor:     copied ? '#10B981' : 'var(--border)',
                  color:           copied ? '#10B981' : 'var(--fg-muted)',
                  backgroundColor: copied ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)',
                  fontFamily:      'var(--font-family-ui)',
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
              className="ds-article-reader__prose type-prose"
            >
              {bodyText.map((para, i) => (
                <React.Fragment key={i}>
                  <p
                    className="mb-7"
                    style={{
                      fontSize:   i === 0 ? '1.25rem' : '1.125rem',
                      lineHeight: i === 0 ? 'var(--leading-relaxed)' : 'var(--leading-prose)',
                      color:      i === 0 ? 'var(--fg)' : 'var(--fg-muted)',
                      fontWeight: i === 0 ? 600 : 400,
                    }}
                  >
                    {/* Pull-quote style for direct quotes */}
                    {para.startsWith('"') ? (
                      <span
                        className="block pl-5 border-l-4 italic"
                        style={{
                          borderColor: 'var(--accent)',
                          color:       'var(--fg)',
                          fontStyle:   'italic',
                        }}
                      >
                        {para}
                      </span>
                    ) : para}
                  </p>

                  {ADS_ENABLED && i === 1 && (
                    <div className="my-10 flex justify-center">
                      <AdSlot size="inline" label="Advertisement" />
                    </div>
                  )}
                </React.Fragment>
              ))}

              <div className="ds-article-reader__endmark">
                <div className="ds-article-reader__endmark-rule" />
                <span className="ds-category-label">Trax</span>
                <div className="ds-article-reader__endmark-rule" />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="type-meta">Topics</span>
                <Link href={`/${article.category.toLowerCase()}`} className="ds-category-pill">
                  {article.category}
                </Link>
                {article.trending && <span className="ds-category-pill">Trending</span>}
                {article.breaking && <span className="ds-hero-lead__breaking">Breaking</span>}
              </div>

              {ADS_ENABLED && (
                <div className="mt-10 flex justify-center">
                  <AdSlot size="rectangle" label="Sponsor Square" />
                </div>
              )}
            </motion.div>

          </div>
        </div>

        {related.length > 0 && (
          <SectionBand variant="tint" className="ds-article-reader__related">
            <div className="container ds-category-page">
              <SectionMarker title="Related stories" subtitle="More from across the corridor" />
              <div className="ds-category-feed__grid">
                {related.map((rel, i) => (
                  <Card key={rel.id} article={rel} index={i} staggered />
                ))}
              </div>
            </div>
          </SectionBand>
        )}
      </motion.div>
    </>
  )
}
