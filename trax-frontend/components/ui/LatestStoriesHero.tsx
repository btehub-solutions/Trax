'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// ── Article data ─────────────────────────────────────────────────────────────
const articlesData = [
  {
    category: 'ECOSYSTEM',
    title: 'How Nigerian Founders Are Using AI to Fix Broken Supply Chains',
    description:
      'From Abeokuta to Sagamu, a new wave of startups is rebuilding logistics from the ground up.',
    publishDate: 'Jun 5, 2026',
    readMoreLink: '/articles/ogun-founders-ecommerce-supply-chains',
    image: 'https://images.unsplash.com/photo-1558174685-430919a96c8d?w=900&h=900&fit=crop&q=80',
  },
  {
    category: 'FUNDING',
    title: "Ogun State's Startups Raised $48M in Q1 2026: Details and Funding Winners",
    description:
      'A breakdown of the biggest funding rounds, who the investors are, and what sectors they are betting on.',
    publishDate: 'May 28, 2026',
    readMoreLink: '/articles/ogun-state-tech-funding-q1-2026',
    image: 'https://images.unsplash.com/photo-1466228432269-af42b400b934?w=900&h=900&fit=crop&q=80',
  },
  {
    category: 'TOOLS',
    title: 'The Tech Tools Every Ogun State Developer Should Know in 2026',
    description:
      'Practical, affordable, and built for low-bandwidth environments, these tools are changing how Ogun State devs build.',
    publishDate: 'May 20, 2026',
    readMoreLink: '/articles/essential-tech-tools-ogun-developers-2026',
    image: 'https://images.unsplash.com/photo-1605907126120-f68611516ecc?w=900&h=900&fit=crop&q=80',
  },
]

// ── Framer Motion variants ────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const headerVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

interface LatestStoriesHeroProps {
  articles?: any[]
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function LatestStoriesHero({ articles }: LatestStoriesHeroProps) {
  const displayArticles = articles
    ? articles.slice(0, 3).map(a => ({
        category: (typeof a.category === 'object' ? a.category?.name : a.category)?.toUpperCase() || 'TECH NEWS',
        title: a.title,
        description: a.excerpt,
        publishDate: (() => {
          const dateSource = a.publishedAt || a.date || a.createdAt;
          if (!dateSource) return 'Jun 5, 2026';
          const parsed = new Date(dateSource);
          return isNaN(parsed.getTime())
            ? (typeof dateSource === 'string' ? dateSource : 'Jun 5, 2026')
            : parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        })(),
        readMoreLink: `/articles/${a.slug}`,
        image: a.image || 'https://images.unsplash.com/photo-1558174685-430919a96c8d?w=900&h=900&fit=crop&q=80',
      }))
    : articlesData;

  return (
    <section
      className="px-4 py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <motion.div
          className="mb-8 text-center sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-48px' }}
          variants={headerVariants}
        >
          <p
            className="mb-3 text-xs font-medium uppercase tracking-widest sm:mb-4"
            style={{
              color:      '#C84B31',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            TRACKING OGUN STATE&apos;S TECH MOVEMENT
          </p>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontFamily:    'var(--font-oxanium)',
              color:         'var(--fg)',
              fontSize:      'clamp(1.6rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              lineHeight:    1.1,
            }}
          >
            Latest from Trax
          </h2>
        </motion.div>

        {displayArticles.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-2xl" style={{ borderColor: 'var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}>
              No stories found. Please publish some articles in the admin dashboard.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-64px' }}
            variants={containerVariants}
          >
            {displayArticles.map((article, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group cursor-pointer border backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg"
                style={{
                  borderColor:     'var(--card-border)',
                  backgroundColor: 'var(--card-bg)',
                  boxShadow:       'var(--shadow-sm)',
                }}
                whileHover={{
                  boxShadow: 'var(--shadow-hover)',
                  y:          -4,
                  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                {/* ── Image block ─────────────────────────────────────────── */}
                <div className="relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                    height={560}
                    width={900}
                    style={{ objectFit: 'cover' }}
                  />

                  {/* Category badge ── #C84B31 accent */}
                  <span
                    className="absolute left-0 top-0 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white sm:text-xs"
                    style={{ backgroundColor: '#C84B31', fontFamily: 'var(--font-dm-sans)' }}
                  >
                    #{article.category}
                  </span>
                </div>

                {/* ── Card body ───────────────────────────────────────────── */}
                <div className="px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
                  {/* Title: DM Sans */}
                  <h3
                    className="mb-2 leading-snug tracking-tight sm:mb-3"
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      color:      'var(--fg)',
                      fontSize:   'clamp(1.1rem, 1.5vw, 1.35rem)',
                      fontWeight: 700,
                    }}
                  >
                    {article.title}
                  </h3>

                  {/* Description: DM Sans */}
                  <p
                    className="mb-5 text-xs leading-relaxed sm:text-sm"
                    style={{
                      color:      'var(--fg-muted)',
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                  >
                    {article.description}
                  </p>

                  {/* Footer row */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    {/* Read more: ArrowRight animation preserved */}
                    <Link
                      href={article.readMoreLink}
                      className="group/link relative flex items-center overflow-hidden text-xs font-medium transition-colors sm:text-sm"
                      style={{ color: 'var(--fg)', fontFamily: 'var(--font-dm-sans)' }}
                    >
                      <span
                        className="relative mr-2 overflow-hidden p-2 transition-colors duration-300 ease-in sm:p-3"
                        style={{
                          border:      '1px solid var(--border)',
                          borderRadius: 0,
                        }}
                      >
                        {/* outgoing arrow */}
                        <ArrowRight
                          className="h-3 w-3 translate-x-0 opacity-100 transition-all duration-500 ease-in group-hover/link:translate-x-8 group-hover/link:opacity-0 sm:h-4 sm:w-4"
                        />
                        {/* incoming arrow */}
                        <ArrowRight
                          className="absolute top-1/2 -left-4 h-3 w-3 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover/link:left-2 sm:-left-5 sm:h-4 sm:w-4 sm:group-hover/link:left-3"
                          style={{ color: '#C84B31' }}
                        />
                      </span>
                      <span className="transition-colors duration-200 group-hover/link:text-[#C84B31]">
                        Read more
                      </span>
                    </Link>

                    {/* Publish date */}
                    <span
                      className="flex items-center gap-2 text-[10px] sm:gap-3 sm:text-xs"
                      style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {article.publishDate}
                      <span
                        className="w-6 border-t sm:w-14"
                        style={{ borderColor: 'var(--border)' }}
                      />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
