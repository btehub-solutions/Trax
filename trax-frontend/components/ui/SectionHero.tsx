'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'
import HeroLead from '@/design-system/components/HeroLead'
import AuthorAvatar from '@/design-system/components/AuthorAvatar'
import SectionMarker from '@/design-system/components/SectionMarker'
import { Icon } from '@/design-system/icons'
import {
  staggerSection,
  fadeUpSoft,
  viewportEditorial,
} from '@/design-system/motion'
import { useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'
import { storyTitle } from '@/lib/truncateWords'

const fallbackImage =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&q=85'

const showDevPreview = process.env.NODE_ENV === 'development'

function formatDate(article: Article) {
  return article.date || 'June 2026'
}

export interface SectionHeroProps {
  lead: Article
  featured?: Article[]
  isPreview?: boolean
  viewAllHref?: string
  headingLevel?: 'h1' | 'h2'
  className?: string
  ariaLabel?: string
  showPreviewNote?: boolean
}

export default function SectionHero({
  lead,
  featured = [],
  isPreview = false,
  viewAllHref,
  headingLevel = 'h1',
  className = 'ds-hero-section',
  ariaLabel = 'Lead stories',
  showPreviewNote = false,
}: SectionHeroProps) {
  const container = useMotionVariants(staggerSection, 'staggerSection')
  const itemSoft = useMotionVariants(fadeUpSoft, 'fadeUpSoft')

  return (
    <section className={className} aria-label={ariaLabel}>
      <div className="container">
        {isPreview && showPreviewNote && showDevPreview && (
          <p className="ds-hero-section__preview-note">
            Dev preview: <Link href="/dashboard">publish stories</Link> for live data.
          </p>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportEditorial}
          variants={container}
          className="ds-hero-section__grid"
        >
          <HeroLead
            article={lead}
            preview={isPreview}
            headingLevel={headingLevel}
          />

          {featured.length > 0 && (
            <motion.aside variants={itemSoft} className="ds-hero-section__sidebar">
              <SectionMarker
                title="Featured"
                action={
                  viewAllHref ? (
                    <Link href={viewAllHref} className="ds-accent-link ds-home-section__action">
                      View all
                      <Icon name="arrow-right" size="xs" />
                    </Link>
                  ) : undefined
                }
                className="ds-hero-section__sidebar-marker"
              />

              <ul className="ds-hero-section__featured-list">
                {featured.map((article) => (
                  <li key={article.id}>
                    {isPreview ? (
                      <div className="ds-hero-section__featured-item">
                        <FeaturedThumb article={article} />
                        <FeaturedCopy article={article} />
                      </div>
                    ) : (
                      <Link
                        href={`/articles/${article.slug}`}
                        className="ds-hero-section__featured-item group"
                      >
                        <FeaturedThumb article={article} />
                        <FeaturedCopy article={article} />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.aside>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedThumb({ article }: { article: Article }) {
  return (
    <div className="ds-hero-section__featured-thumb">
      <Image
        src={article.image || fallbackImage}
        alt={article.title}
        fill
        sizes="112px"
        className="object-cover object-center ds-motion-image"
      />
    </div>
  )
}

function FeaturedCopy({ article }: { article: Article }) {
  return (
    <div className="ds-hero-section__featured-copy">
      <h3 className="ds-hero-section__featured-title" title={article.title}>
        {storyTitle(article.title)}
      </h3>
      <p className="ds-hero-section__featured-author type-meta">
        <AuthorAvatar name={article.author} src={article.authorAvatar} size="sm" />
        <span className="ds-hero-section__featured-author-name">{article.author}</span>
        <span aria-hidden>·</span>
        <span className="ds-hero-section__featured-category">{article.category}</span>
        <time className="ds-hero-section__featured-time">{formatDate(article)}</time>
      </p>
    </div>
  )
}
