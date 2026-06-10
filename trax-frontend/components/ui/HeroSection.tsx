'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Radio, Clock, User, TrendingUp } from 'lucide-react'
import { articles, topicPills } from '@/lib/articles'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
}

const itemVariants = {
  hidden:   { opacity: 0, y: 30 },
  visible:  {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const categoryBadgeStyle: Record<string, { bg: string; color: string; border: string }> = {
  Funding:   { bg: 'rgba(16,185,129,0.18)',  color: '#10B981', border: 'rgba(16,185,129,0.35)' },
  Profiles:  { bg: 'rgba(139,92,246,0.18)',  color: '#A78BFA', border: 'rgba(139,92,246,0.35)' },
  Health:    { bg: 'rgba(59,130,246,0.18)',  color: '#60A5FA', border: 'rgba(59,130,246,0.35)' },
  Policy:    { bg: 'rgba(245,158,11,0.18)',  color: '#FBBF24', border: 'rgba(245,158,11,0.35)' },
  Research:  { bg: 'rgba(236,72,153,0.18)',  color: '#F472B6', border: 'rgba(236,72,153,0.35)' },
  Ecosystem: { bg: 'rgba(200,75,49,0.18)',    color: '#D96248', border: 'rgba(200,75,49,0.35)'   },
  Events:    { bg: 'rgba(6,182,212,0.18)',   color: '#22D3EE', border: 'rgba(6,182,212,0.35)'  },
  Interview: { bg: 'rgba(99,102,241,0.18)',  color: '#818CF8', border: 'rgba(99,102,241,0.35)' },
}

export default function HeroSection() {
  // Use the first featured article as the hero story
  const featured = articles.find((a) => a.featured) ?? articles[0]
  const badge = categoryBadgeStyle[featured.category] ?? categoryBadgeStyle.Ecosystem

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}
      aria-label="Hero: featured story"
    >
      {/* ── Full-width background image ── */}
      <div className="absolute inset-0">
        <Image
          src={featured.image}
          alt={featured.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized={featured.image?.includes('localhost:4000') || featured.image?.includes('supabase.co')}
        />
        {/* Layered overlays for dramatic effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.97) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(200,75,49,0.08) 0%, transparent 70%)',
          }}
        />
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 dot-grid"
          style={{ opacity: 0.25 }}
        />
      </div>

      {/* ── Content ── */}
      <div
        className="container relative z-10 flex flex-col justify-end"
        style={{ minHeight: '100vh', paddingBottom: '80px', paddingTop: '120px' }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* ── Live badge ── */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
            <span
              className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"
              style={{ color: '#C84B31', fontFamily: 'var(--font-oxanium)' }}
            >
              <Radio size={12} className="animate-pulse" />
              Ogun State&apos;s AI Media Platform
            </span>
            <div
              className="h-px w-12"
              style={{ backgroundColor: '#C84B31', opacity: 0.5 }}
            />
          </motion.div>

          {/* ── Category tag ── */}
          <motion.div variants={itemVariants} className="mb-5">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{
                backgroundColor: badge.bg,
                color:           badge.color,
                borderColor:     badge.border,
                fontFamily:      'var(--font-dm-sans)',
              }}
            >
              {featured.breaking && (
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              )}
              {featured.breaking ? 'BREAKING · ' : ''}{featured.category}
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <motion.h1
            variants={itemVariants}
            className="font-bold text-white mb-5"
            style={{
              fontFamily:    'var(--font-oxanium)',
              fontSize:      'clamp(2.2rem, 5.5vw, 4.25rem)',
              lineHeight:    1.07,
              letterSpacing: '-0.03em',
            }}
          >
            {featured.title}
          </motion.h1>

          {/* ── Excerpt ── */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg mb-8 max-w-2xl"
            style={{
              color:       'rgba(240,240,240,0.78)',
              fontFamily:  'var(--font-dm-sans)',
              lineHeight:  1.75,
            }}
          >
            {featured.excerpt}
          </motion.p>

          {/* ── Meta + CTA row ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center gap-5 mb-12"
          >
            {/* Author / time meta */}
            <div
              className="flex items-center gap-4 text-sm"
              style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-dm-sans)' }}
            >
              <span className="flex items-center gap-1.5">
                <User size={13} />
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{featured.author}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{featured.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {featured.readTime}
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 sm:ml-auto">
              <Link
                href={`/articles/${featured.slug}`}
                id="hero-cta-read"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  backgroundColor: '#C84B31',
                  fontFamily:      'var(--font-dm-sans)',
                  boxShadow:       '0 0 32px rgba(200,75,49,0.35)',
                }}
              >
                Read Story
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/news"
                id="hero-cta-browse"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:border-white/50 hover:text-white"
                style={{
                  border:      '1px solid rgba(255,255,255,0.22)',
                  color:       'rgba(255,255,255,0.75)',
                  fontFamily:  'var(--font-dm-sans)',
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                }}
              >
                Browse All
              </Link>
            </div>
          </motion.div>

          {/* ── Stats bar ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 pt-8 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            {[
              { value: '12K+', label: 'Monthly Readers', icon: TrendingUp },
              { value: '340+', label: 'Stories Published', icon: null },
              { value: '8',    label: 'Countries Covered', icon: null },
              { value: '50+',  label: 'Expert Contributors', icon: null },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-oxanium)' }}
                >
                  {value}
                </span>
                <span
                  className="text-xs mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {label}
                </span>
              </div>
            ))}
            {/* Topic pills */}
            <div
              className="hidden lg:flex items-center gap-2 ml-auto"
              aria-label="Explore topics"
            >
              <span
                className="text-xs mr-1"
                style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-dm-sans)' }}
              >
                Explore:
              </span>
              {topicPills.slice(0, 4).map((pill) => (
                <motion.button
                  key={pill}
                  whileHover={{ scale: 1.05, borderColor: '#C84B31', color: '#C84B31' }}
                  whileTap={{ scale: 0.96 }}
                  className="px-3 py-1 rounded-full border text-xs font-medium transition-colors"
                  style={{
                    borderColor:     'rgba(255,255,255,0.18)',
                    color:           'rgba(255,255,255,0.55)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    fontFamily:      'var(--font-dm-sans)',
                  }}
                >
                  {pill}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-dm-sans)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8 rounded-full"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
