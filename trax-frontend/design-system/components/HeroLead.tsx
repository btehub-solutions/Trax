'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'
import AuthorAvatar from '@/design-system/components/AuthorAvatar'
import { fadeUp, viewportEditorial, readMoreParent, readMoreLabel, readMoreRule } from '@/design-system/motion'
import { useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'
import { storyExcerpt, storyTitle } from '@/lib/truncateWords'

const MotionLink = motion.create(Link)

const fallbackImage =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&q=85'

function formatDate(article: Article) {
  return article.date || 'June 2026'
}

export interface HeroLeadProps {
  article: Article
  priority?: boolean
  preview?: boolean
  headingLevel?: 'h1' | 'h2'
}

/** Text-first lead — headline hero, image as supporting evidence */
export default function HeroLead({
  article,
  priority = true,
  preview = false,
  headingLevel = 'h1',
}: HeroLeadProps) {
  const item = useMotionVariants(fadeUp, 'fadeUp')
  const href = preview ? undefined : `/articles/${article.slug}`
  const Heading = headingLevel

  const body = (
    <>
      <div className="ds-hero-lead__media">
        <Image
          src={article.image || fallbackImage}
          alt={article.title}
          fill
          priority={priority}
          sizes="(max-width: 1023px) 100vw, 55vw"
          className="object-cover object-center ds-motion-image"
        />
      </div>

      <div className="ds-hero-lead__copy">
        <div className="ds-hero-lead__meta">
          {article.breaking && (
            <span className="ds-hero-lead__breaking">Breaking</span>
          )}
          <span className="ds-category-pill">{article.category}</span>
        </div>

        <Heading className="ds-hero-lead__title" title={article.title}>
          {storyTitle(article.title)}
        </Heading>

        {article.excerpt && (
          <div className="ds-hero-lead__deck">
            <p className="ds-hero-lead__excerpt type-excerpt" title={article.excerpt}>
              {storyExcerpt(article.excerpt)}
            </p>
            {!preview && (
              <motion.span
                className="ds-hero-lead__read-more"
                variants={readMoreLabel}
              >
                Read more
                <motion.span
                  className="ds-hero-lead__read-more-rule"
                  variants={readMoreRule}
                  aria-hidden
                />
              </motion.span>
            )}
          </div>
        )}

        <div className="ds-hero-lead__author-bar type-meta">
          <AuthorAvatar name={article.author} src={article.authorAvatar} size="md" />
          <span className="ds-hero-lead__author-name">{article.author}</span>
          <span className="ds-hero-lead__author-sep" aria-hidden>
            |
          </span>
          <span className="ds-hero-lead__author-category">{article.category}</span>
          <time className="ds-hero-lead__author-time">{formatDate(article)}</time>
          {article.readTime && (
            <>
              <span className="ds-hero-lead__author-sep" aria-hidden>
                ·
              </span>
              <span>{article.readTime}</span>
            </>
          )}
        </div>
      </div>
    </>
  )

  return (
    <motion.article
      className="ds-hero-lead group"
      initial="hidden"
      whileInView="visible"
      viewport={viewportEditorial}
      variants={item}
    >
      {href ? (
        <MotionLink
          href={href}
          className="ds-hero-lead__link"
          initial="rest"
          animate="rest"
          whileHover="hover"
          variants={readMoreParent}
        >
          {body}
        </MotionLink>
      ) : (
        <div className="ds-hero-lead__link">{body}</div>
      )}
    </motion.article>
  )
}
