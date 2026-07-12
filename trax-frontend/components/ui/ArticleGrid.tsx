'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import SectionMarker from '@/design-system/components/SectionMarker'
import { Icon } from '@/design-system/icons'
import type { Article } from '@/lib/articles'
import AdSlot from '@/components/AdSlot'
import { ADS_ENABLED } from '@/lib/ads'
import Card from '@/components/ui/Card'
import {
  fadeUpSoft,
  staggerGrid,
  viewportEditorial,
  viewportGrid,
} from '@/design-system/motion'
import { useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'

interface ArticleGridProps {
  title: string
  subtitle?: string
  articles: Article[]
  variant?: 'default' | 'featured-first'
  id?: string
  viewAllHref?: string
  embedded?: boolean
}

function SectionHeader({
  title,
  subtitle,
  viewAllHref,
}: {
  title: string
  subtitle?: string
  viewAllHref: string
}) {
  const header = useMotionVariants(fadeUpSoft, 'fadeUpSoft')

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportEditorial}
      variants={header}
      className="ds-home-section__header"
    >
      <SectionMarker
        title={title}
        subtitle={subtitle}
        action={
          <Link href={viewAllHref} className="ds-accent-link ds-home-section__action">
            View all
            <Icon name="arrow-right" size="xs" />
          </Link>
        }
      />
    </motion.div>
  )
}

export default function ArticleGrid({
  title,
  subtitle,
  articles,
  variant = 'default',
  id,
  viewAllHref = '/news',
  embedded = false,
}: ArticleGridProps) {
  const Wrapper = embedded ? 'div' : 'section'
  const wrapperClass = embedded ? '' : 'section ds-band'
  const container = useMotionVariants(staggerGrid, 'staggerGrid')

  const content =
    variant === 'featured-first' ? (
      <>
        <SectionHeader title={title} subtitle={subtitle} viewAllHref={viewAllHref} />
        <div className="ds-home-briefing-grid">
          <div className="ds-home-briefing-grid__top">
            {articles.slice(0, 2).map((article, i) => (
              <Card key={article.id} article={article} variant="featured" index={i} staggered />
            ))}
          </div>
          <div className="ds-home-briefing-grid__bottom">
            {articles.slice(2, 5).map((article, i) => (
              <Card key={article.id} article={article} variant="default" index={i} staggered />
            ))}
          </div>
        </div>
      </>
    ) : (
      <>
        <SectionHeader title={title} subtitle={subtitle} viewAllHref={viewAllHref} />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportGrid}
          className="ds-grid md:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => (
            <Card key={article.id} article={article} staggered />
          ))}
        </motion.div>
      </>
    )

  return (
    <Wrapper id={id} className={wrapperClass}>
      <div className="container">{content}</div>
    </Wrapper>
  )
}
