'use client'

import Card from '@/components/ui/Card'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'
import SectionMarker from '@/design-system/components/SectionMarker'
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
  const feedArticles = articles.slice(0, 4).filter(Boolean)
  const pulse = articles.slice(4, 8).filter(Boolean)
  const container = useMotionVariants(staggerSection, 'staggerSection')
  const itemSoft = useMotionVariants(fadeUpSoft, 'fadeUpSoft')

  if (feedArticles.length === 0 && pulse.length === 0) {
    return null
  }

  return (
    <section className="ds-home-feed ds-premium-section" aria-label="More stories">
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
              {feedArticles.map((article, i) => (
                <Card
                  key={article.id}
                  article={article}
                  variant="default"
                  index={i}
                  staggered
                />
              ))}
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
