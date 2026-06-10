'use client'

import { motion } from 'framer-motion'
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
            className="flex items-end justify-between mb-10"
          >
            <div>
              <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: '#C84B31' }} />
              <h2
                className="font-bold"
                style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
              >
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm" style={{ color: 'var(--fg-muted)' }}>
                  {subtitle}
                </p>
              )}
            </div>
            <motion.button
              whileHover={{ x: 4, color: '#C84B31' }}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
            >
              View all <ArrowRight size={14} />
            </motion.button>
          </motion.div>

          {/* Layout: big featured left + sidebar right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              <div className="pt-4 border-t flex justify-center" style={{ borderColor: 'var(--border)' }}>
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
      style={{ backgroundColor: 'var(--bg-alt)' }}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: '#C84B31' }} />
            <h2
              className="font-bold"
              style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm" style={{ color: 'var(--fg-muted)' }}>
                {subtitle}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ x: 4, color: '#C84B31' }}
            className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
          >
            View all <ArrowRight size={14} />
          </motion.button>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {articles.map((article, i) => (
            <Card key={article.id} article={article} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
