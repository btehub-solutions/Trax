'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import type { Article } from '@/lib/articles'
import { ArrowRight } from 'lucide-react'
import AdSlot from '@/components/AdSlot'

interface ArticleGridProps {
  title: string
  subtitle?: string
  articles: Article[]
  variant?: 'default' | 'featured-first'
  id?: string
  viewAllHref?: string
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function ArticleGrid({
  title,
  subtitle,
  articles,
  variant = 'default',
  id,
  viewAllHref = '/news',
}: ArticleGridProps) {
  if (variant === 'featured-first') {
    const [featured, ...rest] = articles
    return (
      <section className="section" id={id} style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-8 border-t pt-8"
            style={{ borderColor: 'var(--border)' }}
          >
            <div>
              <h2
                className="text-2xl md:text-3xl font-extrabold"
                style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--fg)' }}
              >
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm" style={{ color: 'var(--fg-muted)' }}>
                  {subtitle}
                </p>
              )}
            </div>
            <Link
              href={viewAllHref}
              className="hidden md:flex items-center gap-1.5 text-sm font-extrabold uppercase transition-colors hover:text-[#E8000F] group"
              style={{ color: '#E8000F', fontFamily: 'var(--font-dm-sans)' }}
            >
              <span>View all</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Layout: big featured left + sidebar right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {featured && <Card article={featured} variant="featured" />}
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col divide-y" style={{ borderColor: 'var(--border)' }}>
                {rest.slice(0, 3).map((article, i) => (
                  <Card key={article.id} article={article} variant="compact" index={i} />
                ))}
              </div>
              {/* Sidebar Square Ad */}
              <div className="pt-6 border-t flex justify-center" style={{ borderColor: 'var(--border)' }}>
                <AdSlot size="rectangle" label="Sponsor Advertisement" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="section"
      id={id}
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8 border-t pt-8"
          style={{ borderColor: 'var(--border)' }}
        >
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--fg)' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm" style={{ color: 'var(--fg-muted)' }}>
                {subtitle}
              </p>
            )}
          </div>
          <Link
            href={viewAllHref}
            className="hidden md:flex items-center gap-1.5 text-sm font-extrabold uppercase transition-colors hover:text-[#E8000F] group"
            style={{ color: '#E8000F', fontFamily: 'var(--font-dm-sans)' }}
          >
            <span>View all</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {articles.map((article, i) => (
            <Card key={article.id} article={article} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
