'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/articles'

interface CardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact'
  index?: number
}

const categoryBadgeClass: Record<string, string> = {
  Funding: 'badge-funding',
  Profiles: 'badge-profiles',
  Health: 'badge-health',
  Policy: 'badge-policy',
  Research: 'badge-research',
  Ecosystem: 'badge-ecosystem',
  Events: 'badge-events',
  Interview: 'badge-interview',
  Startups: 'badge-startups',
  People: 'badge-people',
  Tools: 'badge-tools',
}

export default function Card({ article, variant = 'default', index = 0 }: CardProps) {
  const badgeClass = categoryBadgeClass[article.category] ?? 'badge-ecosystem'

  if (variant === 'compact') {
    return (
      <Link href={`/articles/${article.slug}`} className="block">
        <motion.article
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-4 py-5 border-b group cursor-pointer"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="relative w-24 h-20 shrink-0 overflow-hidden rounded-md">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="80px"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div>
              <span className={`inline-block text-[11px] font-extrabold uppercase mb-2 ${badgeClass}`}>
                {article.category}
              </span>
              <h4
                className="text-[15px] font-extrabold leading-snug line-clamp-2 transition-colors group-hover:text-[#FF3D16]"
                style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--fg)' }}
              >
                {article.title}
              </h4>
            </div>
            <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>
              {article.author} <span className="mx-1.5">|</span> {article.date}
            </p>
          </div>
        </motion.article>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
      className="group cursor-pointer overflow-hidden"
      style={{
          backgroundColor: 'transparent',
      }}
      >
        <Link href={`/articles/${article.slug}`} className="block relative w-full aspect-[16/9] overflow-hidden rounded-md">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className={`absolute top-4 left-4 text-xs font-extrabold uppercase px-3 py-1.5 bg-[#2A0718]/90 ${badgeClass}`}>
            {article.category}
          </span>
          {article.breaking && (
            <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full bg-[#C84B31] text-white tracking-wide">
              BREAKING
            </span>
          )}
        </Link>
        <div className="pt-5">
          <Link href={`/articles/${article.slug}`} className="block mb-3">
            <h2
              className="text-xl md:text-3xl font-extrabold leading-tight transition-colors group-hover:text-[#FF3D16] line-clamp-3"
              style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--fg)' }}
            >
              {article.title}
            </h2>
          </Link>
          <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}>
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs" style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}>
              {article.author} <span className="mx-2">|</span> {article.date}
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer overflow-hidden flex flex-col"
      style={{
        backgroundColor: 'transparent',
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Image */}
      <Link href={`/articles/${article.slug}`} className="block relative w-full aspect-[16/10] overflow-hidden shrink-0 rounded-md">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-600 group-hover:scale-107"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase px-2.5 py-1 bg-[#2A0718]/90 ${badgeClass}`}>
          {article.category}
        </span>
      </Link>

      {/* Content */}
      <div className="pt-4 flex flex-col flex-1">
        <Link href={`/articles/${article.slug}`} className="block mb-2">
          <h3
            className="text-lg font-extrabold leading-snug line-clamp-3 transition-colors group-hover:text-[#FF3D16]"
            style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--fg)' }}
          >
            {article.title}
          </h3>
        </Link>
        {/* Meta */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs" style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}>
            {article.author} <span className="mx-2">|</span> {article.date}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
