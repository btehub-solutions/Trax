/**
 * AdSlot: placeholder component for ad units.
 *
 * In development:   renders a styled, labelled placeholder.
 * In production:    swap the inner `{/* Ad code here *\/}` comment for your
 *                   real ad tag (Google AdSense script, DFP slot, etc.).
 *
 * Props
 * ──────
 *  size        "leaderboard" | "rectangle" | "inline"
 *  id          Optional DOM id, required by some ad networks for targeting
 *  className   Extra Tailwind / CSS classes
 *  label       Override the placeholder label (default: size name)
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BASE_URL } from '@/lib/api'

// ── Size presets (IAB standard) ───────────────────────────────────────────────
const SIZE_MAP = {
  leaderboard: { width: '100%',  height: 90,  label: 'Leaderboard (728×90)'  },
  rectangle:   { width: 300,     height: 250, label: 'Medium Rectangle (300×250)' },
  inline:      { width: '100%',  height: 120, label: 'Inline Banner (468×120)' },
} as const

export type AdSize = keyof typeof SIZE_MAP

interface AdSlotProps {
  size:       AdSize
  id?:        string
  className?: string
  /** Override the visible dev-mode label */
  label?: string
}

export default function AdSlot({ size, id, className = '', label }: AdSlotProps) {
  const preset      = SIZE_MAP[size]
  const displayLabel = label ?? preset.label
  const [adHtml, setAdHtml] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const uppercaseSize = size.toUpperCase() // 'LEADERBOARD', 'RECTANGLE', 'INLINE'
        const response = await fetch(`${BASE_URL}/ads?size=${uppercaseSize}`)
        if (response.ok) {
          const data = await response.json()
          if (data && data.code && data.active) {
            setAdHtml(data.code)
          }
        }
      } catch (err) {
        console.error('Failed to load ad slot:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAd()
  }, [size])

  if (adHtml) {
    return (
      <div
        id={id}
        className={`overflow-hidden ${className}`}
        style={{
          width: preset.width,
          minHeight: preset.height,
          maxWidth: '100%',
          marginLeft: typeof preset.width === 'number' ? 'auto' : undefined,
          marginRight: typeof preset.width === 'number' ? 'auto' : undefined,
        }}
        dangerouslySetInnerHTML={{ __html: adHtml }}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      id={id}
      role="complementary"
      aria-label={`Advertisement: ${displayLabel}`}
      className={`overflow-hidden ${className}`}
      style={{
        width:      preset.width,
        minHeight:  preset.height,
        maxWidth:   '105%',
        marginLeft:  typeof preset.width === 'number' ? 'auto'   : undefined,
        marginRight: typeof preset.width === 'number' ? 'auto'   : undefined,
        display:     'flex',
        alignItems:  'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 rounded-xl select-none"
        style={{
          minHeight:       preset.height,
          border:          '2px dashed var(--border)',
          backgroundColor: 'var(--bg-alt)',
          padding:         '12px',
        }}
      >
        {/* Ad icon */}
        <svg
          width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          style={{ color: 'var(--fg-subtle)' }}
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M8 12h8M12 8v8" />
        </svg>

        {/* Label */}
        <p
          className="text-center leading-snug"
          style={{
            color:      'var(--fg-subtle)',
            fontFamily: 'var(--font-dm-sans)',
            fontSize:   '11px',
            fontWeight: 500,
          }}
        >
          {displayLabel}
        </p>

        {/* Size badge */}
        <span
          className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wide"
          style={{
            backgroundColor: 'rgba(200,75,49,0.10)',
            color:           '#C84B31',
            border:          '1px solid rgba(200,75,49,0.2)',
          }}
        >
          {size}
        </span>
      </div>
    </motion.div>
  )
}
