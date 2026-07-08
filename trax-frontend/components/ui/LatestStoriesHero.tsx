'use client'

import Image from 'next/image'
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
import { storyExcerpt, storyTitle } from '@/lib/truncateWords'

const fallbackImage =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&q=85'

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
  const feedArticles = articles.slice(0, 5).filter(Boolean)
  const pulse = articles.slice(5, 9).filter(Boolean)
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
            <div className="ds-home-feed__list">
              {feedArticles.map((article) => (
                <motion.article key={article.id} variants={itemSoft} className="ds-home-feed__item group">
                  {isPreview ? (
                    <div className="ds-home-feed__item-inner">
                      <FeedThumb article={article} />
                      <FeedCopy article={article} />
                    </div>
                  ) : (
                    <Link href={`/articles/${article.slug}`} className="ds-home-feed__item-inner">
                      <FeedThumb article={article} />
                      <FeedCopy article={article} />
                    </Link>
                  )}
                </motion.article>
              ))}
            </div>

            <motion.aside variants={itemSoft} className="ds-home-feed__sidebar">
              <div className="ds-premium-panel ds-home-feed__tracker-panel">
                <SectionMarker title="Ogun Tech Tracker" className="ds-home-feed__tracker-marker" />

                <div className="ds-home-feed__tracker-list">
                  {pulse.map((article) =>
                    isPreview ? (
                      <div key={article.id} className="ds-home-feed__tracker-item group">
                        <TrackerCopy article={article} />
                      </div>
                    ) : (
                      <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        className="ds-home-feed__tracker-item group"
                      >
                        <TrackerCopy article={article} />
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

function FeedThumb({ article }: { article: Article }) {
  return (
    <div className="ds-home-feed__thumb">
      <Image
        src={article.image || fallbackImage}
        alt={article.title}
        fill
        sizes="(max-width: 640px) 100vw, 200px"
        className="object-cover object-center ds-motion-image"
      />
    </div>
  )
}

function FeedCopy({ article }: { article: Article }) {
  return (
    <div className="ds-home-feed__copy">
      <span className="ds-category-label">{article.category}</span>
      <h3 className="ds-home-feed__title" title={article.title}>
        {storyTitle(article.title)}
      </h3>
      {article.excerpt && (
        <p className="type-excerpt ds-home-feed__excerpt" title={article.excerpt}>
          {storyExcerpt(article.excerpt)}
        </p>
      )}
      <p className="type-meta ds-home-feed__meta">
        <span>{article.author}</span>
        <span aria-hidden>·</span>
        <time>{formatDate(article)}</time>
        {article.readTime && (
          <>
            <span aria-hidden>·</span>
            <span>{article.readTime}</span>
          </>
        )}
      </p>
    </div>
  )
}

function TrackerCopy({ article }: { article: Article }) {
  return (
    <>
      <span className="ds-category-label">{article.category}</span>
      <h4 className="ds-home-feed__tracker-title" title={article.title}>
        {storyTitle(article.title)}
      </h4>
      <p className="type-meta ds-home-feed__meta">
        <span>{article.author}</span>
        <span aria-hidden>·</span>
        <time>{formatDate(article)}</time>
      </p>
    </>
  )
}
