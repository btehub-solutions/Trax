'use client'

import type { Article } from '@/lib/articles'
import { resolveHeroStack } from '@/lib/heroArticles'
import SectionHero from '@/components/ui/SectionHero'

interface HomeHeroProps {
  articles?: Article[]
  isPreview?: boolean
}

export default function HomeHero({ articles = [], isPreview = false }: HomeHeroProps) {
  const { lead, featured } = resolveHeroStack(articles)

  if (!lead) {
    return null
  }

  return (
    <SectionHero
      lead={lead}
      featured={featured}
      isPreview={isPreview}
      viewAllHref="/news"
      headingLevel="h1"
      className="ds-hero-section ds-home-hero"
    />
  )
}
