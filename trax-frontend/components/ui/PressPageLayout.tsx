'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import NewsletterSection from '@/components/ui/NewsletterSection'
import SectionHero from '@/components/ui/SectionHero'
import { SectionBand } from '@/design-system/components'
import type { Article } from '@/lib/articles'
import { resolveHeroStack } from '@/lib/heroArticles'
import { staggerGrid, viewportGrid } from '@/design-system/motion'
import { useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'

export interface PressPartner {
  id: string
  name: string
  logoUrl?: string
}

export interface PressArticle {
  id: string
  slug: string
  title: string
  excerpt?: string
  image?: string
  publishedAt: string
  partner?: PressPartner
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&q=85'

function toLeadArticle(article: PressArticle): Article {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt ?? '',
    image: article.image ?? FALLBACK_IMAGE,
    category: 'Partner',
    author: article.partner?.name ?? 'Partner',
    authorRole: 'Press Room',
    date: article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '',
    readTime: '',
    featured: true,
  }
}

interface PressPageLayoutProps {
  description: string
  articles: PressArticle[]
  partners?: PressPartner[]
}

export default function PressPageLayout({
  description,
  articles,
  partners = [],
}: PressPageLayoutProps) {
  const [partnerId, setPartnerId] = useState<string | null>(null)
  const grid = useMotionVariants(staggerGrid, 'staggerGrid')

  const filtered = useMemo(() => {
    if (!partnerId) return articles
    return articles.filter((a) => a.partner?.id === partnerId)
  }, [articles, partnerId])

  const leadArticles = useMemo(() => filtered.map(toLeadArticle), [filtered])
  const { lead, featured } = resolveHeroStack(leadArticles)

  const remainingPress = useMemo(() => {
    const heroIds = new Set<string>()
    if (lead) heroIds.add(lead.id)
    featured.forEach((item) => heroIds.add(item.id))
    return filtered.filter((item) => !heroIds.has(item.id))
  }, [filtered, lead, featured])

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="ds-category-page ds-premium-home">
      {lead && (
        <SectionBand variant="default" section={false}>
          <SectionHero
            lead={lead}
            featured={featured}
            headingLevel="h2"
            className="ds-hero-section ds-category-hero"
            ariaLabel="Press room lead story"
          />
        </SectionBand>
      )}

      <SectionBand variant={lead ? 'tint' : 'default'}>
        <div className="container ds-category-feed">
          <p className="type-excerpt ds-category-feed__intro">{description}</p>

          {partners.length > 0 && (
            <div
              className="ds-category-filters"
              role="tablist"
              aria-label="Filter by partner"
            >
              <button
                type="button"
                role="tab"
                aria-selected={partnerId === null}
                className={`ds-category-filters__pill${partnerId === null ? ' is-active' : ''}`}
                onClick={() => setPartnerId(null)}
              >
                All partners
              </button>
              {partners.map((partner) => (
                <button
                  key={partner.id}
                  type="button"
                  role="tab"
                  aria-selected={partnerId === partner.id}
                  className={`ds-category-filters__pill${partnerId === partner.id ? ' is-active' : ''}`}
                  onClick={() => setPartnerId(partner.id)}
                >
                  {partner.name}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="type-meta ds-category-feed__empty">
              No press releases for this partner yet. Check back soon.
            </p>
          ) : remainingPress.length > 0 ? (
            <motion.div
              variants={grid}
              initial="hidden"
              whileInView="visible"
              viewport={viewportGrid}
              className="ds-press-room__grid"
            >
              {remainingPress.map((article) => {
                const mapped = toLeadArticle(article)
                return (
                  <article key={article.id} className="ds-press-room__card group">
                    <Link href={`/articles/${article.slug}`} className="ds-press-room__card-inner">
                      <div className="ds-press-room__thumb">
                        <Image
                          src={mapped.image}
                          alt={mapped.title}
                          fill
                          sizes="(max-width: 767px) 100vw, 33vw"
                          className="object-cover object-center ds-motion-image"
                        />
                      </div>
                      <div className="ds-press-room__card-body">
                        <span className="ds-category-label">Partner</span>
                        <h3 className="ds-press-room__title">{mapped.title}</h3>
                        <p className="type-meta ds-press-room__meta">
                          {article.partner?.name ?? 'Partner'}
                          <span aria-hidden>·</span>
                          {formatDate(article.publishedAt)}
                        </p>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </motion.div>
          ) : (
            <p className="type-meta ds-category-feed__empty">
              More partner stories are on the way.
            </p>
          )}
        </div>
      </SectionBand>

      <SectionBand variant="muted">
        <NewsletterSection />
      </SectionBand>
    </div>
  )
}
