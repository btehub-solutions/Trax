'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import SectionMarker from '@/design-system/components/SectionMarker'
import { Icon } from '@/design-system/icons'
import { staggerGrid, viewportGrid } from '@/design-system/motion'
import { useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'
import type { Article } from '@/lib/articles'

interface FundingWatchStripProps {
  articles: Article[]
}

export default function FundingWatchStrip({ articles }: FundingWatchStripProps) {
  const grid = useMotionVariants(staggerGrid, 'staggerGrid')

  // Filter for funding articles, fallback to general articles if fewer than 4 funding stories
  const fundingArticles = articles.filter(
    (a) => a.category.toLowerCase() === 'funding' || a.category.toLowerCase() === 'venture'
  )
  const displayArticles = (fundingArticles.length >= 4 ? fundingArticles : articles).slice(0, 4)

  if (displayArticles.length === 0) return null

  return (
    <div className="container ds-funding-watch-strip">
      <SectionMarker
        title="Funding Watch"
        subtitle="Pre-seed to growth rounds, angel networks, and venture capital deal logs"
        action={
          <Link href="/funding" className="ds-accent-link ds-home-section__action">
            Explore Funding DB
            <Icon name="arrow-right" size="xs" />
          </Link>
        }
        className="mb-6"
      />

      <motion.div
        variants={grid}
        initial="hidden"
        whileInView="visible"
        viewport={viewportGrid}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {displayArticles.map((article, index) => (
          <Card key={article.id} article={article} index={index} staggered />
        ))}
      </motion.div>
    </div>
  )
}
