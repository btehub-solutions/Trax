'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import NewsletterSection from '@/components/ui/NewsletterSection'
import type { Article } from '@/lib/articles'

interface CategoryPageLayoutProps {
  title: string
  description: string
  categoryName: string
  articles: Article[]
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export default function CategoryPageLayout({
  title,
  description,
  categoryName,
  articles,
}: CategoryPageLayoutProps) {
  return (
    <>
      {/* ── Category Header ── */}
      <section
        className="relative pt-32 pb-16 overflow-hidden border-b"
        style={{
          backgroundColor: 'var(--bg)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Animated dot grid background for modern aesthetic */}
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        
        {/* Soft radial ambient glow */}
        <div 
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)'
          }}
        />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Tiny accent badge */}
            <span
              className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white mb-4"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {categoryName}
            </span>
            
            <h1
              className="font-extrabold tracking-tight mb-4"
              style={{
                fontFamily: 'var(--font-oxanium)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: 'var(--fg)',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            
            <p
              className="text-base md:text-lg max-w-2xl"
              style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
            >
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Article Feed ── */}
      <section
        className="py-16 min-h-[400px]"
        style={{ backgroundColor: 'var(--bg-alt)' }}
      >
        <div className="container">
          {articles.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {articles.map((article, index) => (
                <Card key={article.id} article={article} index={index} />
              ))}
            </motion.div>
          ) : (
            /* Empty state if no articles exist in category yet */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto text-center py-16 px-6 rounded-2xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(200, 75, 49, 0.1)' }}
              >
                <span className="text-xl" style={{ color: 'var(--accent)' }}>💡</span>
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: 'var(--font-oxanium)', color: 'var(--fg)' }}
              >
                Stories Coming Soon
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
              >
                We are currently researching and writing stories for this beat. Join our newsletter to receive them the moment they drop!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Newsletter section at the bottom ── */}
      <NewsletterSection />
    </>
  )
}
