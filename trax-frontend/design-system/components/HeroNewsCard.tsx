'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/articles'

const fallbackImage =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&q=85'

function formatDate(article: Article) {
  return article.date || 'June 2026'
}

export interface HeroNewsCardProps {
  article: Article
  priority?: boolean
  preview?: boolean
}

/** Beat 2 — calm editorial lead (brutalism lives in the masthead band only) */
export default function HeroNewsCard({
  article,
  priority = false,
  preview = false,
}: HeroNewsCardProps) {
  const href = preview ? undefined : `/articles/${article.slug}`

  const inner = (
    <>
      <div className="ds-hero-news-card__media">
        <Image
          src={article.image || fallbackImage}
          alt={article.title}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover object-center ds-motion-image"
        />
      </div>

      <div className="ds-hero-news-card__copy">
        <div className="ds-hero-news-card__meta">
          <span className="ds-category-label">{article.category}</span>
          {article.breaking && (
            <span className="ds-hero-news-card__breaking">Breaking</span>
          )}
          <time className="type-meta">{formatDate(article)}</time>
        </div>

        <h1 className="ds-hero-news-card__title">{article.title}</h1>
        <p className="type-excerpt ds-hero-news-card__excerpt">{article.excerpt}</p>

        <p className="ds-hero-news-card__byline type-meta">
          <span>{article.author}</span>
          {article.readTime && (
            <>
              <span aria-hidden>·</span>
              <span>{article.readTime}</span>
            </>
          )}
        </p>
      </div>
    </>
  )

  return (
    <article className={`ds-hero-news-card group${preview ? ' ds-hero-news-card--preview' : ''}`}>
      {href ? (
        <Link href={href} className="ds-hero-news-card__link">
          {inner}
        </Link>
      ) : (
        <div className="ds-hero-news-card__link">{inner}</div>
      )}
    </article>
  )
}
