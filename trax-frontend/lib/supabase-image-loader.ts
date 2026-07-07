/**
 * Custom Next.js Image Loader — Vercel Optimizer Bypass
 *
 * Strategy:
 *  - ALL URLs are returned exactly as-is.
 *  - This completely bypasses Vercel's Image Optimization pipeline,
 *    consuming zero transformation credits regardless of image source.
 *  - Supabase Storage images are served at their original size directly
 *    from Supabase's CDN — no Pro plan features required.
 *  - Static local images also use the `unoptimized` prop on <Image />
 *    as a belt-and-braces fallback.
 *
 * NOTE: Supabase image transformation (?width=&quality=) is a Pro-only
 * feature and must NOT be appended on the free tier — it breaks images.
 */
export default function supabaseImageLoader({
  src,
}: {
  src: string
  width: number
  quality?: number
}): string {
  // Return the URL exactly as stored — Vercel never processes it.
  return src
}
