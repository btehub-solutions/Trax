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
import DOMPurify from 'dompurify'
import { BASE_URL } from '@/lib/api'

// ── Size presets (IAB standard) ───────────────────────────────────────────────
const SIZE_MAP = {
  leaderboard: { width: '100%',  height: 90,  label: 'Leaderboard (728×90)'  },
  rectangle:   { width: 300,     height: 300, label: 'Square Sidebar Ad (300×300)' },
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
              setAdHtml(DOMPurify.sanitize(activeAds[randomIndex].code, { ADD_TAGS: ['iframe', 'style'], ADD_ATTR: ['target', 'rel'] }))
            }
          } else if (data && data.code && data.active) {
            setAdHtml(DOMPurify.sanitize(data.code, { ADD_TAGS: ['iframe', 'style'], ADD_ATTR: ['target', 'rel'] }))
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
    const normalizedHtml = adHtml.trim().toLowerCase();
    const isImageOnly = normalizedHtml.startsWith('<a') && !normalizedHtml.includes('<div') && normalizedHtml.includes('<img');
    const containerId = id || `ad-slot-${size}-${Math.random().toString(36).substring(2, 7)}`;
    
    // Parse the img src if it's image only
    let imageUrl = '';
    let linkUrl = '';
    if (isImageOnly) {
      const srcMatch = adHtml.match(/src=["']([^"']+)["']/i);
      const hrefMatch = adHtml.match(/href=["']([^"']+)["']/i);
      if (srcMatch) imageUrl = srcMatch[1];
      if (hrefMatch) linkUrl = hrefMatch[1];
    }

    if (isImageOnly && imageUrl) {
      return (
        <div className="w-full flex flex-col items-center">
          <span className="text-[8px] uppercase tracking-[0.25em] text-zinc-500 font-extrabold mb-1 select-none">
            Sponsored
          </span>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-32px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            id={containerId}
            className={`relative overflow-hidden rounded-xl border border-white/5 flex items-center justify-center ${className}`}
            style={{
              width: preset.width,
              height: preset.height,
              maxWidth: '100%',
              marginLeft: typeof preset.width === 'number' ? 'auto' : undefined,
              marginRight: typeof preset.width === 'number' ? 'auto' : undefined,
            }}
          >
            {/* Blurred Background Backdrop */}
            <div
              className="absolute inset-0 pointer-events-none scale-110 blur-xl opacity-30 select-none bg-center bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            {/* Dark overlay backdrop to keep it unified */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />
            
            <a
              href={linkUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-full h-full flex items-center justify-center"
            >
              <img
                src={imageUrl}
                alt="Advertisement"
                className="w-full h-full object-cover block select-none"
              />
            </a>
          </motion.div>
        </div>
      )
    }

    return (
      <div className="w-full flex flex-col items-center">
        <span className="text-[8px] uppercase tracking-[0.25em] text-zinc-500 font-extrabold mb-1 select-none">
          Sponsored
        </span>
        <div
          id={containerId}
          className={`overflow-hidden rounded-xl ${className}`}
          style={{
            width: preset.width,
            height: preset.height,
            maxWidth: '100%',
            marginLeft: typeof preset.width === 'number' ? 'auto' : undefined,
            marginRight: typeof preset.width === 'number' ? 'auto' : undefined,
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: adHtml }} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    )
  }
  // Fallback visual advertisement banners
  let fallbackContent;

  if (size === 'leaderboard') {
    fallbackContent = (
      <a
        href="mailto:admin@trax.co?subject=Advertise%20on%20Trax"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full block rounded-xl overflow-hidden border border-white/5 hover:border-[#C84B31]/40 transition-all duration-300 select-none relative"
      >
        <img
          src="/images/ads/stay_connected_leaderboard.png"
          alt="Stay Connected Wherever You Are - Advertise on Trax"
          className="w-full h-full object-cover block"
        />
      </a>
    );
  } else if (size === 'rectangle') {
    fallbackContent = (
      <a
        href="mailto:admin@trax.co?subject=Advertise%20on%20Trax"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full block rounded-xl overflow-hidden border border-white/5 hover:border-[#C84B31]/40 transition-all duration-300 select-none relative"
        style={{ minHeight: preset.height }}
      >
        <img
          src="/images/ads/stay_connected_square.jpg"
          alt="Stay Connected Wherever You Are - Advertise on Trax"
          className="w-full h-full object-cover block"
        />
      </a>
    );
  } else {
    // inline — Option B: image background with branded overlay
    fallbackContent = (
      <a
        href="mailto:admin@trax.co?subject=Advertise%20on%20Trax"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full block rounded-xl overflow-hidden select-none group"
        style={{ height: preset.height, minHeight: preset.height }}
      >
        {/* Background image */}
        <img
          src="/images/ads/trax_inline_banner.png"
          alt="Advertise on Trax"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.45)' }}
        />

        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(28,25,23,0.55) 50%, rgba(0,0,0,0.72) 100%)' }}
        />

        {/* Red left accent bar */}
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl" style={{ backgroundColor: '#C84B31' }} />

        {/* Content row */}
        <div className="relative z-10 flex items-center justify-between h-full px-6 gap-4">

          {/* Brand + headline */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-black tracking-tight text-[15px]" style={{ color: '#C84B31', fontFamily: 'sans-serif' }}>
              TRAX
            </span>
            <div className="w-px h-5 bg-white/20" />
            <span className="text-white font-bold text-[13px] whitespace-nowrap">
              Your brand could be here
            </span>
          </div>

          {/* Stat pills */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {['12K Readers', '200+ Articles', "Ogun's #1 Tech Media"].map((stat) => (
              <span
                key={stat}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                style={{
                  backgroundColor: 'rgba(200,75,49,0.12)',
                  border: '1px solid rgba(200,75,49,0.35)',
                  color: '#f5f5f5',
                }}
              >
                {stat}
              </span>
            ))}
          </div>

          {/* CTA button */}
          <span
            className="shrink-0 px-4 py-1.5 rounded-lg text-[11px] font-bold text-white transition-all duration-200 group-hover:scale-105"
            style={{ backgroundColor: '#C84B31', whiteSpace: 'nowrap' }}
          >
            Get Started →
          </span>
        </div>
      </a>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <span className="text-[8px] uppercase tracking-[0.25em] text-zinc-500 font-extrabold mb-1 select-none">
        Sponsored
      </span>
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
          width:       size === 'leaderboard' ? '100%' : preset.width,
          minHeight:   size === 'leaderboard' ? undefined : preset.height,
          aspectRatio: size === 'leaderboard' ? '1024 / 409' : undefined,
          maxWidth:    size === 'leaderboard' ? '1024px' : '100%',
          marginLeft:  'auto',
          marginRight: 'auto',
        }}
      >
        {fallbackContent}
      </motion.div>
    </div>
  )
}

