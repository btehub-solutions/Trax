'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import CategoryEmptyState from '@/components/ui/CategoryEmptyState'
import NewsletterSection from '@/components/ui/NewsletterSection'
import SectionHero from '@/components/ui/SectionHero'
import { SectionBand } from '@/design-system/components'
import { staggerGrid, viewportGrid } from '@/design-system/motion'
import { useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'
import type { Article } from '@/lib/articles'
import { resolveHeroStack } from '@/lib/heroArticles'

export interface CategoryFilter {
  id: string
  label: string
  categories: string[]
}

interface CategoryPageLayoutProps {
  title?: string
  description: string
  categoryName: string
  articles: Article[]
  filters?: CategoryFilter[]
  viewAllHref?: string
}

function matchesFilter(article: Article, filter: CategoryFilter) {
  return filter.categories.includes(article.category)
}

export default function CategoryPageLayout({
  description,
  categoryName,
  articles,
  filters,
  viewAllHref,
}: CategoryPageLayoutProps) {
  const [activeFilterId, setActiveFilterId] = useState(filters?.[0]?.id ?? 'all')
  const grid = useMotionVariants(staggerGrid, 'staggerGrid')

  const visibleArticles = useMemo(() => {
    if (!filters?.length) return articles
    const active = filters.find((filter) => filter.id === activeFilterId) ?? filters[0]
    return articles.filter((article) => matchesFilter(article, active))
  }, [articles, filters, activeFilterId])

  const { lead, featured, remaining } = resolveHeroStack(visibleArticles)

  return (
    <div className="ds-category-page ds-premium-home">
      {lead && (
        <SectionBand variant="default" section={false}>
          <SectionHero
            key={activeFilterId}
            lead={lead}
            featured={featured}
            viewAllHref={viewAllHref}
            headingLevel="h2"
            className="ds-hero-section ds-category-hero"
            ariaLabel={`${categoryName} lead story`}
          />
        </SectionBand>
      )}

      <SectionBand variant={lead ? 'tint' : 'default'}>
        <div className="container ds-category-feed">
          {articles.length === 0 ? (
            <CategoryEmptyState categoryName={categoryName} />
          ) : (
            <>
              {description && (
                <p className="type-excerpt ds-category-feed__intro">{description}</p>
              )}

              {filters && filters.length > 1 && (
                <div
                  className="ds-category-filters"
                  role="tablist"
                  aria-label={`Filter ${categoryName.toLowerCase()} stories`}
                >
                  {filters.map((filter) => {
                    const isActive = filter.id === activeFilterId
                    return (
                      <button
                        key={filter.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`ds-category-filters__pill${isActive ? ' is-active' : ''}`}
                        onClick={() => setActiveFilterId(filter.id)}
                      >
                        {filter.label}
                      </button>
                    )
                  })}
                </div>
              )}

              {visibleArticles.length === 0 ? (
                <p className="type-meta ds-category-feed__empty">
                  No stories in this filter yet. Try another filter or check back soon.
                </p>
              ) : remaining.length > 0 ? (
                <motion.div
                  variants={grid}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportGrid}
                  className="ds-category-feed__grid"
                >
                  {remaining.map((article, index) => (
                    <Card key={article.id} article={article} index={index} staggered />
                  ))}
                </motion.div>
              ) : (
                <p className="type-meta ds-category-feed__empty">
                  More {categoryName.toLowerCase()} stories are on the way.
                </p>
              )}
            </>
          )}
        </div>
      </SectionBand>

      <SectionBand variant="muted">
        <NewsletterSection />
      </SectionBand>
    </div>
  )
}
