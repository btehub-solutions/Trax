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

  // Strictly filter for funding & venture deal stories only
  const displayArticles = articles
    .filter(
      (a) => a.category.toLowerCase() === 'funding' || a.category.toLowerCase() === 'venture'
    )
    .slice(0, 4)

  if (displayArticles.length === 0) return null

  const gridColsClass =
    displayArticles.length === 1
      ? 'grid grid-cols-1 max-w-md gap-5'
      : displayArticles.length === 2
      ? 'grid grid-cols-1 sm:grid-cols-2 max-w-2xl gap-5'
      : displayArticles.length === 3
      ? 'grid grid-cols-1 sm:grid-cols-3 gap-5'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'

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
        className={gridColsClass}
      >
        {displayArticles.map((article, index) => (
          <Card key={article.id} article={article} index={index} staggered />
        ))}
      </motion.div>
    </div>
  )
}
