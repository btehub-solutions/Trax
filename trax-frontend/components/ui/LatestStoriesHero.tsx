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
  const lead = articles[0]
  const secondary = articles.slice(1, 3).filter(Boolean)
  const feedArticles = articles.slice(3, 6).filter(Boolean)
  const pulse = articles.slice(6, 11).filter(Boolean)

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
                Local intelligence for Ogun&apos;s tech builders
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

          {/* ── Row 1: Featured Hero Grid (Lead + Secondary) ── */}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 mb-12">
            {/* Lead Article (Left 8 cols) */}
            <motion.article variants={itemVariants} className="group lg:col-span-8">
              <Link href={`/articles/${lead.slug}`} className="block">
                <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-md">
                  <Image
                    src={lead.image || fallbackImage}
                    alt={lead.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <CategoryLabel>{lead.category}</CategoryLabel>
                <h2
                  className="text-3xl font-black leading-tight transition-colors group-hover:text-[#FF3D16] md:text-5xl"
                  style={{ color: 'var(--fg)', letterSpacing: 0 }}
                >
                  {lead.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                  {lead.excerpt}
                </p>
                <StoryMeta article={lead} />
              </Link>
            </motion.article>

            {/* Secondary Articles (Right 4 cols) */}
            <div className="grid gap-8 md:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              {secondary.map((article) => (
                <motion.article key={article.id} variants={itemVariants} className="group">
                  <Link href={`/articles/${article.slug}`} className="block">
                    <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-md">
                      <Image
                        src={article.image || fallbackImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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
          </div>

          {/* ── Row 2: Subsequent Feed + Sidebar (Tracker) ── */}
          {(feedArticles.length > 0 || pulse.length > 0) && (
            <div className="grid gap-8 border-t pt-10 lg:grid-cols-12 lg:gap-10" style={{ borderColor: 'var(--border)' }}>
              {/* Left Side: Subsequent News Feed (8 cols) */}
              <div className="lg:col-span-8 flex flex-col divide-y" style={{ borderColor: 'var(--border)' }}>
                {feedArticles.map((article) => (
                  <motion.article
                    key={article.id}
                    variants={itemVariants}
                    className="group py-6 first:pt-0 last:pb-0"
                  >
                    <Link href={`/articles/${article.slug}`} className="flex flex-col sm:flex-row gap-6">
                      <div className="relative aspect-[16/10] w-full sm:w-48 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={article.image || fallbackImage}
                          alt={article.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 200px"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <CategoryLabel>{article.category}</CategoryLabel>
                        <h3
                          className="text-lg font-black leading-snug transition-colors group-hover:text-[#FF3D16]"
                          style={{ color: 'var(--fg)', letterSpacing: 0 }}
                        >
                          {article.title}
                        </h3>
                        <p className="mt-2 text-sm line-clamp-2 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                          {article.excerpt}
                        </p>
                        <StoryMeta article={article} />
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {/* Right Side: Sidebar West Africa Tracker (4 cols) */}
              <motion.aside
                variants={itemVariants}
                className="lg:col-span-4 lg:border-l lg:pl-8 lg:pt-0 border-t pt-8 lg:border-t-0"
                style={{ borderColor: 'var(--border)' }}
              >
                <p className="mb-5 text-xs font-extrabold uppercase" style={{ color: '#FF3D16' }}>
                  Ogun Tech Tracker
                </p>
                <div className="flex flex-col divide-y" style={{ borderColor: 'var(--border)' }}>
                  {pulse.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="group py-5 first:pt-0 last:pb-0"
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

                {/* ── Newsletter CTA Card ── */}
                <Link
                  href="/newsletter"
                  className="group mt-6 block relative overflow-hidden rounded-2xl border transition-all duration-300 hover:border-[#FF3D16]/40"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Image
                    src="/images/trax_newsletter_card.png"
                    alt="Trax Newsletter Subscription"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </Link>
              </motion.aside>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
