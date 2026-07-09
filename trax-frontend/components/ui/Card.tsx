'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  fadeUp,
  fadeUpSoft,
  fadeInLeft,
  cardHover,
  cardHoverReduced,
  viewportGrid,
  viewportFeed,
  transitionEditorial,
} from '@/design-system/motion'
import { useMotionEnabled, useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'
import type { Article } from '@/lib/articles'
import { storyExcerpt, storyTitle } from '@/lib/truncateWords'

interface CardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact'
  index?: number
  staggered?: boolean
}

export default function Card({
  article,
  variant = 'default',
  index = 0,
  staggered = false,
}: CardProps) {
  const motionOn = useMotionEnabled()
  const hoverLift = motionOn ? cardHover : cardHoverReduced
  const soft = useMotionVariants(fadeUpSoft, 'fadeUpSoft')
  const left = useMotionVariants(fadeInLeft, 'fadeInLeft')
  const up = useMotionVariants(fadeUp, 'fadeUp')

  if (variant === 'compact') {
    return (
      <Link href={`/articles/${article.slug}`} className="block">
        <motion.article
          variants={staggered ? left : undefined}
          initial={staggered ? undefined : { opacity: 0, x: -16 }}
          whileInView={staggered ? undefined : { opacity: 1, x: 0 }}
          viewport={staggered ? undefined : viewportFeed}
          transition={staggered ? undefined : { ...transitionEditorial, delay: index * 0.05 }}
          className="ds-article-card ds-article-card--compact group"
        >
          <div className="ds-article-card__thumb ds-article-card__thumb--sm">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover object-center ds-motion-image"
              sizes="96px"
            />
          </div>
          <div className="ds-article-card__body">
            <span className="ds-category-label">{article.category}</span>
            <h4 className="ds-article-card__title ds-article-card__title--sm" title={article.title}>
              {storyTitle(article.title)}
            </h4>
            <p className="type-meta ds-article-card__meta">
              {article.author}
              <span aria-hidden>·</span>
              {article.date}
              {article.readTime && (
                <>
                  <span aria-hidden>·</span>
                  {article.readTime}
                </>
              )}
            </p>
          </div>
        </motion.article>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <motion.article
        variants={staggered ? up : undefined}
        initial={staggered ? undefined : { opacity: 0, y: 32 }}
        whileInView={staggered ? undefined : { opacity: 1, y: 0 }}
        viewport={staggered ? undefined : viewportGrid}
        transition={staggered ? undefined : transitionEditorial}
        whileHover={hoverLift}
        className="ds-article-card ds-article-card--featured group"
      >
        <Link href={`/articles/${article.slug}`} className="ds-article-card__media-link">
          <div className="ds-article-card__thumb ds-article-card__thumb--featured">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover object-center ds-motion-image"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
          {article.breaking && (
            <span className="ds-article-card__breaking">Breaking</span>
          )}
        </Link>
        <div className="ds-article-card__body ds-article-card__body--featured">
          <span className="ds-category-label">{article.category}</span>
          <Link href={`/articles/${article.slug}`}>
            <h2 className="ds-article-card__title ds-article-card__title--featured" title={article.title}>
              {storyTitle(article.title)}
            </h2>
          </Link>
          <p className="type-excerpt ds-article-card__excerpt" title={article.excerpt}>
            {storyExcerpt(article.excerpt)}
          </p>
          <p className="type-meta ds-article-card__meta">
            {article.author}
            <span aria-hidden>·</span>
            {article.date}
            {article.readTime && (
              <>
                <span aria-hidden>·</span>
                {article.readTime}
              </>
            )}
          </p>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      variants={staggered ? soft : undefined}
      initial={staggered ? undefined : { opacity: 0, y: 24 }}
      whileInView={staggered ? undefined : { opacity: 1, y: 0 }}
      viewport={staggered ? undefined : viewportGrid}
      transition={staggered ? undefined : { ...transitionEditorial, delay: index * 0.07 }}
      whileHover={hoverLift}
      className="ds-article-card group"
    >
      <Link href={`/articles/${article.slug}`} className="ds-article-card__media-link">
        <div className="ds-article-card__thumb">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover object-center ds-motion-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="ds-article-card__body">
        <span className="ds-category-label">{article.category}</span>
        <Link href={`/articles/${article.slug}`}>
          <h3 className="ds-article-card__title" title={article.title}>
            {storyTitle(article.title)}
          </h3>
        </Link>
        <p className="type-meta ds-article-card__meta">
          {article.author}
          <span aria-hidden>·</span>
          {article.date}
        </p>
      </div>
    </motion.article>
  )
}
