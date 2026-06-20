'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'
import type { ReactNode } from 'react'

const fallbackImage =
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&q=85'

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function formatDate(article: Article) {
  return article.date || 'June 2026'
}

function StoryMeta({ article }: { article: Article }) {
  return (
    <p className="mt-3 text-xs" style={{ color: 'var(--fg-subtle)' }}>
      {article.author} <span className="mx-2">|</span> {formatDate(article)}
    </p>
  )
}

function CategoryLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="mb-3 inline-block text-xs font-extrabold uppercase"
      style={{ color: '#FF3D16', fontFamily: 'var(--font-dm-sans)' }}
    >
      {children}
    </span>
  )
}

interface LatestStoriesHeroProps {
  articles?: Article[]
}

export default function LatestStoriesHero({ articles = [] }: LatestStoriesHeroProps) {
  const [lead, second, third, fourth, fifth] = articles
  const secondary = [second, third].filter(Boolean)
  const pulse = [fourth, fifth, ...articles.slice(5, 8)].filter(Boolean)

  if (!lead) {
    return (
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container border-t pt-10" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            No stories found. Please publish articles in the dashboard.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-12 pt-8 md:pb-16" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="border-t pt-8"
          style={{ borderColor: 'var(--border)' }}
        >
          <motion.div variants={itemVariants} className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-extrabold uppercase" style={{ color: '#FF3D16' }}>
                Ogun Startup Pulse
              </p>
              <h1
                className="max-w-4xl text-4xl font-black md:text-6xl"
                style={{ color: 'var(--fg)', lineHeight: 0.96, letterSpacing: 0 }}
              >
                Local intelligence for West Africa&apos;s builders
              </h1>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-extrabold uppercase"
              style={{ color: '#FF3D16' }}
            >
              Latest intelligence <ArrowRight size={15} />
            </Link>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <motion.article variants={itemVariants} className="group lg:col-span-6">
              <Link href={`/articles/${lead.slug}`} className="block">
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-md md:aspect-[16/9]">
                  <Image
                    src={lead.image || fallbackImage}
                    alt={lead.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <CategoryLabel>{lead.category}</CategoryLabel>
                <h2
                  className="text-3xl font-black leading-tight transition-colors group-hover:text-[#FF3D16] md:text-5xl"
                  style={{ color: 'var(--fg)', letterSpacing: 0 }}
                >
                  {lead.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                  {lead.excerpt}
                </p>
                <StoryMeta article={lead} />
              </Link>
            </motion.article>

            <div className="grid gap-8 md:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
              {secondary.map((article) => (
                <motion.article key={article.id} variants={itemVariants} className="group">
                  <Link href={`/articles/${article.slug}`} className="block">
                    <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-md">
                      <Image
                        src={article.image || fallbackImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <CategoryLabel>{article.category}</CategoryLabel>
                    <h3
                      className="text-xl font-black leading-snug transition-colors group-hover:text-[#FF3D16]"
                      style={{ color: 'var(--fg)', letterSpacing: 0 }}
                    >
                      {article.title}
                    </h3>
                    <StoryMeta article={article} />
                  </Link>
                </motion.article>
              ))}
            </div>

            <motion.aside
              variants={itemVariants}
              className="border-t pt-6 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="mb-5 text-xs font-extrabold uppercase" style={{ color: '#FF3D16' }}>
                West Africa Tracker
              </p>
              <div className="flex flex-col divide-y" style={{ borderColor: 'var(--border)' }}>
                {pulse.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group py-5 first:pt-0"
                  >
                    <CategoryLabel>{article.category}</CategoryLabel>
                    <h4
                      className="text-lg font-black leading-snug transition-colors group-hover:text-[#FF3D16]"
                      style={{ color: 'var(--fg)', letterSpacing: 0 }}
                    >
                      {article.title}
                    </h4>
                    <StoryMeta article={article} />
                  </Link>
                ))}
              </div>
            </motion.aside>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
