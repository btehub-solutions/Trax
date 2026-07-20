'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, Bookmark, Share2, Link2, Check, Eye } from 'lucide-react'
import Card from '@/components/ui/Card'
import type { Article } from '@/lib/articles'
import AdSlot from '@/components/AdSlot'
import { ADS_ENABLED } from '@/lib/ads'
import { SectionBand } from '@/design-system/components'
import SectionMarker from '@/design-system/components/SectionMarker'
import AuthorAvatar from '@/design-system/components/AuthorAvatar'
import { Icon } from '@/design-system/icons'
import { resolveCategoryHref } from '@/lib/navigation'
import { storyTitle } from '@/lib/truncateWords'

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function generateBody(article: Article): string[] {
  const body = (article as Article & { body?: string }).body
  if (body) {
    return body
      .split(/[\r\n]+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
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

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

interface ArticleReaderProps {
  article: Article
  related: Article[]
  prev: Article | null
  next: Article | null
  isPreview?: boolean
}

function ArticlePagerLink({
  article,
  direction,
}: {
  article: Article
  direction: 'prev' | 'next'
}) {
  const isPrev = direction === 'prev'

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`ds-article-reader__pager-link${isPrev ? ' ds-article-reader__pager-link--prev' : ' ds-article-reader__pager-link--next'}`}
    >
      <span className="ds-article-reader__pager-label">
        <Icon name={isPrev ? 'arrow-left' : 'arrow-right'} size="xs" aria-hidden />
        {isPrev ? 'Previous story' : 'Next story'}
      </span>
      <span className="ds-article-reader__pager-title">{storyTitle(article.title)}</span>
      <span className="ds-article-reader__pager-meta type-meta">{article.category}</span>
    </Link>
  )
}

export default function ArticleReader({ article, related, prev, next, isPreview }: ArticleReaderProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)

  const bodyText = generateBody(article)
  const categoryHref = resolveCategoryHref(article.category)

  const getShareUrl = () => (typeof window !== 'undefined' ? window.location.href : '')

  const shareX = () => {
    const url = getShareUrl()
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}&via=traxnewsng`,
      '_blank',
    )
  }

  const shareLinkedIn = () => {
    const url = getShareUrl()
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
    )
  }

  const copyLink = async () => {
    const url = getShareUrl()
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.article
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="ds-article-reader"
    >
      {isPreview && (
        <div 
          className="sticky top-0 z-50 py-3 px-4 text-center text-sm font-semibold tracking-wide uppercase select-none shadow-md flex items-center justify-center gap-2 border-b font-ui"
          style={{ 
            backgroundColor: '#E7040D', 
            color: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <Eye size={16} className="animate-pulse" />
          Draft Preview Mode — This article is not yet published
        </div>
      )}
      <div className="ds-article-reader__toolbar">
        <div className="container ds-article-reader__toolbar-inner">
          <Link href={categoryHref} className="ds-article-reader__back">
            <Icon name="arrow-left" size="sm" aria-hidden />
            Back to {article.category}
          </Link>
          <Link href="/" className="ds-article-reader__home-link type-meta">
            All stories
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="ds-article-reader__layout">
          <motion.header variants={fadeUp} className="ds-article-reader__header">
            <div className="ds-article-reader__header-top">
              <Link href={categoryHref} className="ds-category-pill">
                {article.category}
              </Link>
              {article.breaking && (
                <span className="ds-hero-lead__breaking">Breaking</span>
              )}
              {article.officialLink && (
                <a
                  href={article.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ds-article-reader__official-link"
                >
                  Visit website
                  <Icon name="arrow-right" size="xs" aria-hidden />
                </a>
              )}
            </div>

            <h1 className="ds-article-reader__title type-article-title">{article.title}</h1>

            <div className="ds-article-reader__meta-row">
              <div className="ds-article-reader__author">
                <AuthorAvatar name={article.author} src={article.authorAvatar} size="md" />
                <div>
                  <p className="ds-article-reader__author-name">{article.author}</p>
                </div>
              </div>

              <div className="ds-article-reader__meta-stats type-meta">
                <time dateTime={article.date}>{article.date}</time>
                <span className="ds-article-reader__meta-dot" aria-hidden />
                <span className="ds-article-reader__read-time">
                  <Clock size={12} strokeWidth={1.75} aria-hidden />
                  {article.readTime}
                </span>
              </div>

              <button
                type="button"
                id="article-bookmark"
                aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this article'}
                onClick={() => setBookmarked((b) => !b)}
                className={`ds-article-reader__bookmark${bookmarked ? ' is-active' : ''}`}
              >
                <Bookmark
                  size={16}
                  fill={bookmarked ? 'currentColor' : 'none'}
                  strokeWidth={bookmarked ? 0 : 1.75}
                />
              </button>
            </div>
          </motion.header>

          <motion.figure variants={fadeUp} className="ds-article-reader__figure">
            <div className="ds-article-reader__figure-frame">
              <Image
                src={article.image}
                alt={article.title}
                width={1200}
                height={800}
                priority
                className="ds-article-reader__figure-image"
                sizes="(max-width: 768px) 100vw, 42rem"
              />
            </div>
          </motion.figure>

          <motion.div variants={fadeUp} className="ds-article-reader__share">
            <span className="ds-article-reader__share-label">
              <Share2 size={12} strokeWidth={2} aria-hidden />
              Share
            </span>
            <button
              type="button"
              id="article-share-x"
              aria-label="Share on X"
              onClick={shareX}
              className="ds-article-reader__share-btn"
            >
              <XIcon size={13} />
              Post
            </button>
            <button
              type="button"
              id="article-share-linkedin"
              aria-label="Share on LinkedIn"
              onClick={shareLinkedIn}
              className="ds-article-reader__share-btn ds-article-reader__share-btn--linkedin"
            >
              <LinkedInIcon size={13} />
              Share
            </button>
            <button
              type="button"
              id="article-share-copy"
              aria-label="Copy article link"
              onClick={copyLink}
              className={`ds-article-reader__share-btn${copied ? ' is-copied' : ''}`}
            >
              {copied ? <Check size={13} /> : <Link2 size={13} />}
              {copied ? (
                'Copied'
              ) : (
                <>
                  <span className="sm:hidden">Copy</span>
                  <span className="hidden sm:inline">Copy link</span>
                </>
              )}
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="ds-article-reader__prose type-prose">
            {article.excerpt && (
              <aside 
                aria-label="Executive Summary and Key Takeaways" 
                className="ds-article-reader__key-takeaways mb-6 p-4 rounded-xl border border-[var(--border)] bg-[rgba(255,255,255,0.03)] dark:bg-[rgba(0,0,0,0.2)]"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-1 flex items-center gap-1.5 font-ui">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
                  Key Takeaway
                </p>
                <p className="text-sm font-medium leading-relaxed text-[var(--fg)] opacity-90 font-ui">
                  {article.excerpt}
                </p>
              </aside>
            )}
            {bodyText.map((para, i) => (
              <React.Fragment key={i}>
                <p
                  className={
                    i === 0
                      ? 'ds-article-reader__lede'
                      : para.startsWith('"')
                        ? 'ds-article-reader__quote'
                        : undefined
                  }
                >
                  {para}
                </p>

                {ADS_ENABLED && i === 1 && (
                  <div className="ds-article-reader__ad">
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

            <div className="ds-article-reader__topics">
              <span className="type-meta">Topics</span>
              <Link href={categoryHref} className="ds-category-pill">
                {article.category}
              </Link>
              {article.trending && <span className="ds-category-pill">Trending</span>}
              {article.breaking && <span className="ds-hero-lead__breaking">Breaking</span>}
            </div>

            {ADS_ENABLED && (
              <div className="ds-article-reader__ad">
                <AdSlot size="rectangle" label="Sponsor Square" />
              </div>
            )}
          </motion.div>

          {(prev || next) && (
            <motion.nav
              variants={fadeUp}
              className="ds-article-reader__pager"
              aria-label="Continue reading"
            >
              {prev ? <ArticlePagerLink article={prev} direction="prev" /> : <div />}
              {next ? <ArticlePagerLink article={next} direction="next" /> : <div />}
            </motion.nav>
          )}

          <motion.div variants={fadeUp} className="ds-article-reader__footer-nav">
            <Link href={categoryHref} className="ds-article-reader__footer-link">
              <Icon name="arrow-left" size="xs" aria-hidden />
              More in {article.category}
            </Link>
            <Link href="/" className="ds-article-reader__footer-link">
              Latest stories
              <Icon name="arrow-right" size="xs" aria-hidden />
            </Link>
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
    </motion.article>
  )
}
