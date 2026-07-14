'use client'

import Image from 'next/image'
import Link from 'next/link'
import SectionMarker from '@/design-system/components/SectionMarker'
import { Icon } from '@/design-system/icons'
import type { PressArticle } from '@/lib/server-api'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&q=85'

interface PressRoomSectionProps {
  articles: PressArticle[]
  isDemo?: boolean
}

export default function PressRoomSection({ articles, isDemo = false }: PressRoomSectionProps) {
  if (!articles.length) return null

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="container ds-press-room">
      <SectionMarker
        title="Press Room"
        subtitle="Partner stories and sponsored dispatches"
        action={
          <Link href="/press" className="ds-accent-link ds-home-section__action">
            View all
            <Icon name="arrow-right" size="xs" />
          </Link>
        }
        className="ds-press-room__header"
      />

      <div className="ds-press-room__grid">
        {articles.slice(0, 6).map((article) => (
          <article key={article.id} className="ds-press-room__card group">
            {isDemo ? (
              <div className="ds-press-room__card-inner">
                <PressCardContent article={article} formatDate={formatDate} />
              </div>
            ) : (
              <Link href={`/articles/${article.slug}`} className="ds-press-room__card-inner">
                <PressCardContent article={article} formatDate={formatDate} />
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

function PressCardContent({
  article,
  formatDate,
}: {
  article: PressArticle
  formatDate: (d: string) => string
}) {
  return (
    <>
      <div className="ds-press-room__thumb">
        <Image
          src={article.image || FALLBACK_IMAGE}
          alt={article.title}
          fill
          sizes="(max-width: 767px) 100vw, 33vw"
          className="object-cover object-center ds-motion-image"
        />
      </div>
      <div className="ds-press-room__card-body">
        <span className="ds-category-label">Partner</span>
        <h3 className="ds-press-room__title">{article.title}</h3>
        <p className="type-meta ds-press-room__meta">
          {article.partner?.name || 'Partner'}
          <span aria-hidden>·</span>
          {formatDate(article.publishedAt)}
        </p>
      </div>
    </>
  )
}
