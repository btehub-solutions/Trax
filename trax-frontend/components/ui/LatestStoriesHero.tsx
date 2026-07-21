'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'
import SectionMarker from '@/design-system/components/SectionMarker'
import { MotionButton } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import {
  staggerSection,
  fadeUpSoft,
  viewportEditorial,
} from '@/design-system/motion'
import { useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'
import { storyTitle } from '@/lib/truncateWords'

function formatDate(article: Article) {
  return article.date || 'June 2026'
}

interface LatestStoriesHeroProps {
  articles?: Article[]
  isPreview?: boolean
}

/** Homepage feed — stories after hero stack, with Ogun Tech Tracker sidebar */
export default function LatestStoriesHero({
  articles = [],
  isPreview = false,
}: LatestStoriesHeroProps) {
  const [visibleCount, setVisibleCount] = useState(4)

  const availableArticles = articles.filter(Boolean)
  const initialArticles = availableArticles.slice(0, 4)
  const extraArticles = availableArticles.slice(4, visibleCount)
  const pulse = availableArticles.slice(0, 4)
  const hasMore = visibleCount < availableArticles.length
  const canShowLess = visibleCount > 4

  const handleShowLess = () => {
    setVisibleCount(4)
    document.getElementById('more-stories')?.scrollIntoView({ behavior: 'smooth' })
  }

  const container = useMotionVariants(staggerSection, 'staggerSection')
  const itemSoft = useMotionVariants(fadeUpSoft, 'fadeUpSoft')

  if (availableArticles.length === 0 && pulse.length === 0) {
    return null
  }

  return (
    <section id="more-stories" className="ds-home-feed ds-premium-section" aria-label="More stories">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportEditorial}
          variants={container}
        >
          <motion.div variants={itemSoft} className="ds-home-feed__header">
            <SectionMarker
              title="More Stories"
              subtitle="From across Ogun State's tech corridor"
            />
          </motion.div>

          <div className="ds-home-feed__grid">
            <div className="ds-home-feed__grid-list">
              {initialArticles.map((article, i) => (
                <Card
                  key={article.id}
                  article={article}
                  variant="default"
                  index={i}
                  staggered={false}
                />
              ))}

              {!canShowLess && hasMore && (
                <div className="pt-2 flex justify-center col-span-full sm:col-span-2">
                  <MotionButton
                    type="button"
                    variant="outline"
                    onClick={() => setVisibleCount((prev) => prev + 4)}
                    className="w-full sm:w-auto text-sm"
                  >
                    Load More Stories
                  </MotionButton>
                </div>
              )}
            </div>

            <motion.aside variants={itemSoft} className="ds-home-feed__sidebar">
              <div className="ds-premium-panel ds-home-feed__tracker-panel">
                <SectionMarker title="Ogun Tech Tracker" className="ds-home-feed__tracker-marker" />

                <div className="ds-home-feed__tracker-list">
                  {pulse.map((article, index) =>
                    isPreview ? (
                      <div key={article.id} className="ds-home-feed__tracker-item group">
                        <TrackerCopy article={article} index={index} />
                      </div>
                    ) : (
                      <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        className="ds-home-feed__tracker-item group"
                      >
                        <TrackerCopy article={article} index={index} />
                      </Link>
                    ),
                  )}
                </div>
              </div>

              <div className="ds-premium-panel">
                <p className="ds-premium-panel__eyebrow">Weekly digest</p>
                <p className="ds-premium-panel__title">Get the Trax briefing</p>
                <p className="ds-premium-panel__desc">
                  Ogun tech, distilled weekly. Funding, founders, and corridor signals.
                </p>
                <Link href="#newsletter" className="ds-premium-panel__link">
                  Subscribe free
                  <Icon name="arrow-right" size="xs" />
                </Link>
              </div>
            </motion.aside>
          </div>

          {extraArticles.length > 0 && (
            <div className="mt-8 lg:mt-12 pt-8 border-t border-[var(--neutral-border)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {extraArticles.map((article, i) => (
                  <Card
                    key={article.id}
                    article={article}
                    variant="default"
                    index={i}
                    staggered={false}
                  />
                ))}
              </div>
            </div>
          )}

          {canShowLess && (
            <div className="mt-8 pt-4 flex flex-wrap justify-center gap-3">
              {hasMore && (
                <MotionButton
                  type="button"
                  variant="outline"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="w-full sm:w-auto text-sm"
                >
                  Load More Stories
                </MotionButton>
              )}
              <MotionButton
                type="button"
                variant="ghost"
                onClick={handleShowLess}
                className="w-full sm:w-auto text-sm"
              >
                Show Less
              </MotionButton>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function TrackerCopy({ article, index }: { article: Article; index: number }) {
  const formattedIndex = String(index + 1).padStart(2, '0')
  return (
    <>
      <div className="ds-home-feed__tracker-number">{formattedIndex}</div>
      <div className="ds-home-feed__tracker-details">
        <span className="ds-category-label">{article.category}</span>
        <h4 className="ds-home-feed__tracker-title" title={article.title}>
          {storyTitle(article.title)}
        </h4>
        <p className="type-meta ds-home-feed__meta">
          <span>{article.author}</span>
          <span aria-hidden>·</span>
          <time>{formatDate(article)}</time>
        </p>
      </div>
    </>
  )
}
