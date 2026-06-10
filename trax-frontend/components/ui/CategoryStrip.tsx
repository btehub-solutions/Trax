'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const categories = [
  { label: 'All',         color: '#C84B31' },
  { label: 'Startups', color: '#10B981' },
  { label: 'Funding',     color: '#059669' },
  { label: 'Tools',       color: '#3B82F6' },
  { label: 'People',      color: '#8B5CF6' },
  { label: 'Policy',      color: '#F59E0B' },
  { label: 'Research',    color: '#EC4899' },
  { label: 'Health',      color: '#06B6D4' },
  { label: 'Ecosystem',   color: '#C84B31' },
  { label: 'Events',      color: '#14B8A6' },
]

interface CategoryStripProps {
  active?: string
  onChange?: (cat: string) => void
}

export default function CategoryStrip({ active = 'All', onChange }: CategoryStripProps) {
  const [activeTab, setActiveTab] = useState(active)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
  }

  const handleSelect = (label: string) => {
    setActiveTab(label)
    onChange?.(label)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky z-30 border-b"
      style={{
        top:             '64px', // below navbar
        backgroundColor: 'var(--bg)',
        borderColor:     'var(--border)',
      }}
      aria-label="Article categories"
    >
      <div className="container relative">
        {/* Left fade + scroll button */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none z-10 hidden md:block"
          style={{
            background: 'linear-gradient(to right, var(--bg) 40%, transparent)',
          }}
        />
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll categories left"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-7 h-7 rounded-full border transition-all hover:border-accent hover:text-accent"
          style={{
            backgroundColor: 'var(--bg)',
            borderColor:     'var(--border)',
            color:           'var(--fg-muted)',
          }}
        >
          <ChevronLeft size={14} />
        </button>

        {/* Scrollable tabs */}
        <div
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto py-3 px-2 md:px-10 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          role="tablist"
          aria-label="Filter by category"
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat.label
            return (
              <motion.button
                key={cat.label}
                role="tab"
                aria-selected={isActive}
                id={`category-tab-${cat.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleSelect(cat.label)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap hover:bg-[rgba(200,75,49,0.05)] hover:text-[#C84B31]"
                style={{
                  fontFamily:      'var(--font-dm-sans)',
                  backgroundColor: isActive ? '#C84B31' : 'transparent',
                  color:           isActive ? '#fff' : 'var(--fg-muted)',
                  border:          `1.5px solid ${isActive ? '#C84B31' : 'transparent'}`,
                  boxShadow:       isActive ? '0 4px 12px rgba(200, 75, 49, 0.15)' : 'none',
                }}
              >
                {cat.label}
              </motion.button>
            )
          })}
        </div>

        {/* Right fade + scroll button */}
        <div
          className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10 hidden md:block"
          style={{
            background: 'linear-gradient(to left, var(--bg) 40%, transparent)',
          }}
        />
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll categories right"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-7 h-7 rounded-full border transition-all hover:border-accent hover:text-accent"
          style={{
            backgroundColor: 'var(--bg)',
            borderColor:     'var(--border)',
            color:           'var(--fg-muted)',
          }}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </motion.section>
  )
}
