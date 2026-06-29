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
  leaderboard: { width: '100%',  height: 409,  label: 'Leaderboard (1024×409)'  },
  rectangle:   { width: 300,     height: 300, label: 'Square (1080×1080)' },
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
          borderRadius: '4px',
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
            className={`relative overflow-hidden rounded-md border border-white/5 flex items-center justify-center ${className}`}
            style={{
              width:       (size === 'leaderboard' || size === 'inline') ? '100%' : preset.width,
              minHeight:   (size === 'leaderboard' || size === 'inline') ? undefined : preset.height,
              aspectRatio: size === 'leaderboard' ? '1024 / 409' : (size === 'inline' ? '468 / 120' : undefined),
              maxWidth:    size === 'leaderboard' ? '1024px' : (size === 'inline' ? '468px' : '100%'),
              marginLeft:  'auto',
              marginRight: 'auto',
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
          className={`overflow-hidden rounded-md ${className}`}
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
        href="https://forms.gle/PjEk6Xm9ZGKNcJXW9"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full block rounded-md overflow-hidden border border-white/10 hover:border-[#FF3D16]/50 transition-all duration-300 select-none relative"
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
        href="https://forms.gle/PjEk6Xm9ZGKNcJXW9"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full block rounded-md overflow-hidden border border-white/10 hover:border-[#FF3D16]/50 transition-all duration-300 select-none relative"
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
    // inline
    fallbackContent = (
      <a
        href="https://forms.gle/PjEk6Xm9ZGKNcJXW9"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full block rounded-md overflow-hidden border border-white/10 hover:border-[#FF3D16]/50 transition-all duration-300 select-none relative"
      >
        <img
          src="/images/ads/stay_connected_inline.png"
          alt="Stay Connected Wherever You Are - Advertise on Trax"
          className="w-full h-full object-cover block"
        />
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
          width:       (size === 'leaderboard' || size === 'inline') ? '100%' : preset.width,
          minHeight:   (size === 'leaderboard' || size === 'inline') ? undefined : preset.height,
          aspectRatio: size === 'leaderboard' ? '1024 / 409' : (size === 'inline' ? '468 / 120' : undefined),
          maxWidth:    size === 'leaderboard' ? '1024px' : (size === 'inline' ? '468px' : '100%'),
          marginLeft:  'auto',
          marginRight: 'auto',
        }}
      >
        {fallbackContent}
      </motion.div>
    </div>
  )
}
