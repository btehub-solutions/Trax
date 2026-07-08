'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import type { Article } from '@/lib/articles'
import { Icon } from '@/design-system/icons'
import { useReducedMotion } from '@/design-system/motion/hooks/useReducedMotion'

const fallbackImage =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&h=900&fit=crop&q=85'

const AUTO_PLAY_MS = 7000

function formatDate(article: Article) {
  return article.date || 'June 2026'
}

export interface HeroCarouselProps {
  articles: Article[]
  preview?: boolean
  priority?: boolean
}

export default function HeroCarousel({
  articles,
  preview = false,
  priority = true,
}: HeroCarouselProps) {
  const slides = articles.filter(Boolean).slice(0, 4)
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const count = slides.length
  const active = slides[index]

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return
      setIndex(((next % count) + count) % count)
    },
    [count],
  )

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])
  const goNext = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (count <= 1 || reducedMotion || paused) return
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, AUTO_PLAY_MS)
    return () => window.clearInterval(timer)
  }, [count, reducedMotion, paused, index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  if (!active) return null

  const href = preview ? undefined : `/articles/${active.slug}`

  const slideContent = (
    <>
      <Image
        src={active.image || fallbackImage}
        alt=""
        fill
        priority={priority && index === 0}
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="object-cover object-center"
      />
      <div className="ds-hero-carousel__scrim" aria-hidden />
      <div className="ds-hero-carousel__content">
        <div className="ds-hero-carousel__meta">
          <span className="ds-hero-carousel__category">{active.category}</span>
          {active.breaking && <span className="ds-hero-carousel__breaking">Breaking</span>}
          <time className="ds-hero-carousel__date">{formatDate(active)}</time>
        </div>
        <h1 className="ds-hero-carousel__title">{active.title}</h1>
        {active.excerpt && (
          <p className="ds-hero-carousel__excerpt">{active.excerpt}</p>
        )}
        <p className="ds-hero-carousel__byline">
          <span>{active.author}</span>
          {active.readTime && (
            <>
              <span aria-hidden>·</span>
              <span>{active.readTime}</span>
            </>
          )}
        </p>
      </div>
    </>
  )

  return (
    <div
      className="ds-hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Lead stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="ds-hero-carousel__viewport">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            className="ds-hero-carousel__slide"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {href ? (
              <Link href={href} className="ds-hero-carousel__slide-link">
                {slideContent}
              </Link>
            ) : (
              <div className="ds-hero-carousel__slide-link">{slideContent}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="ds-hero-carousel__nav ds-hero-carousel__nav--prev"
            onClick={goPrev}
            aria-label="Previous story"
          >
            <Icon name="arrow-left" size="sm" />
          </button>
          <button
            type="button"
            className="ds-hero-carousel__nav ds-hero-carousel__nav--next"
            onClick={goNext}
            aria-label="Next story"
          >
            <Icon name="arrow-right" size="sm" />
          </button>

          <div className="ds-hero-carousel__footer">
            <div className="ds-hero-carousel__dots" role="tablist" aria-label="Choose story">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Story ${i + 1}: ${slide.title}`}
                  className={`ds-hero-carousel__dot${i === index ? ' ds-hero-carousel__dot--active' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <span className="ds-hero-carousel__count" aria-live="polite">
              {index + 1} / {count}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
