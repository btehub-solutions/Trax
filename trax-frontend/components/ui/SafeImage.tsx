'use client'

/**
 * SafeImage — a drop-in replacement for Next.js <Image> that catches any
 * load error (404, deleted Supabase file, CORS, network error) and swaps
 * the src to a guaranteed fallback image instead of showing a broken icon.
 */

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80'

type SafeImageProps = Omit<ImageProps, 'onError'> & {
  /** Custom fallback URL. Defaults to the Trax Unsplash placeholder. */
  fallbackSrc?: string
}

export default function SafeImage({
  src,
  fallbackSrc = FALLBACK_IMAGE,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<ImageProps['src']>(src)

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={() => {
        // Only swap if we haven't already fallen back (prevents infinite loop)
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
}
