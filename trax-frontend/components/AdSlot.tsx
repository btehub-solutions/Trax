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
          if (Array.isArray(data)) {
            const activeAds = data.filter((ad: any) => ad.active && ad.code)
            if (activeAds.length > 0) {
              const randomIndex = Math.floor(Math.random() * activeAds.length)
              setAdHtml(activeAds[randomIndex].code)
            }
          } else if (data && data.code && data.active) {
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

  if (loading) {
    return (
      <div
        className={`animate-pulse ${className}`}
        style={{
          width: preset.width,
          minHeight: preset.height,
          maxWidth: '100%',
          marginLeft: typeof preset.width === 'number' ? 'auto' : undefined,
          marginRight: typeof preset.width === 'number' ? 'auto' : undefined,
          backgroundColor: 'rgba(255,255,255,0.03)',
          borderRadius: '12px',
        }}
      />
    )
  }

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

  // Fallback visual advertisement banners
  let fallbackContent;
  if (size === 'leaderboard') {
    fallbackContent = (
      <div
        className="w-full h-full flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl select-none transition-all duration-300 border border-white/5 hover:border-[#C84B31]/30"
        style={{
          minHeight: preset.height,
          background: 'linear-gradient(90deg, #111827 0%, #1c1917 50%, #292524 100%)',
          padding: '12px 24px',
        }}
      >
        <div className="flex flex-col text-center sm:text-left">
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.05em',
              color: '#C84B31',
              textTransform: 'uppercase',
              marginBottom: '2px',
            }}
          >
            ADVERTISEMENT SPACE AVAILABLE
          </span>
          <span style={{ fontSize: '12px', color: 'var(--fg-subtle)' }}>
            Showcase your brand to the Ogun State tech ecosystem.
          </span>
        </div>
        <a
          href="mailto:admin@trax.co?subject=Advertise%20on%20Trax"
          className="px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: '#C84B31',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          CONTACT ADMIN
        </a>
      </div>
    );
  } else if (size === 'rectangle') {
    fallbackContent = (
      <div
        className="w-full h-full flex flex-col items-center justify-center text-center gap-3 rounded-xl select-none transition-all duration-300 border border-[#C84B31]/20 hover:border-[#C84B31]/40"
        style={{
          minHeight: preset.height,
          background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
          padding: '24px 20px',
        }}
      >
        <span
          className="px-3 py-1 rounded-full text-[9px] font-bold"
          style={{
            backgroundColor: 'rgba(200,75,49,0.1)',
            color: '#C84B31',
            border: '1px solid rgba(200,75,49,0.25)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          AD SPACE
        </span>
        <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#fff' }}>
          Advertise Here
        </h4>
        <p style={{ fontSize: '11px', color: 'var(--fg-subtle)', margin: '0 0 8px 0', lineHeight: 1.4 }}>
          Promote your startup, programs, or tech products to over thousands of monthly readers.
        </p>
        <a
          href="mailto:admin@trax.co?subject=Advertise%20on%20Trax"
          className="px-5 py-2.5 rounded-lg text-xs font-bold text-white transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: '#C84B31',
            textDecoration: 'none',
          }}
        >
          Contact admin@trax.co
        </a>
      </div>
    );
  } else {
    // inline
    fallbackContent = (
      <div
        className="w-full h-full flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl select-none transition-all duration-300 border border-indigo-500/20 hover:border-indigo-500/40"
        style={{
          minHeight: preset.height,
          background: 'linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)',
          padding: '16px 24px',
        }}
      >
        <div className="flex flex-col text-center sm:text-left">
          <span
            className="px-2.5 py-0.5 rounded-full text-[9px] font-bold mb-2 w-fit mx-auto sm:mx-0"
            style={{
              backgroundColor: 'rgba(99,102,241,0.2)',
              color: '#818cf8',
              border: '1px solid rgba(99,102,241,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'inline-block',
            }}
          >
            SPONSORSHIP
          </span>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 2px 0', color: '#fff' }}>
            Partner with Trax
          </h4>
          <p style={{ fontSize: '11px', color: '#c7d2fe', margin: 0 }}>
            Put your brand in front of top developers, founders, and decision makers in Ogun.
          </p>
        </div>
        <a
          href="mailto:admin@trax.co?subject=Sponsor%20on%20Trax"
          className="px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: '#4f46e5',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Contact Admin
        </a>
      </div>
    );
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
        maxWidth:   '100%',
        marginLeft:  typeof preset.width === 'number' ? 'auto'   : undefined,
        marginRight: typeof preset.width === 'number' ? 'auto'   : undefined,
      }}
    >
      {fallbackContent}
    </motion.div>
  )
}

