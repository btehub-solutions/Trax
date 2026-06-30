import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (smallest), fall back to WebP
    formats: ['image/avif', 'image/webp'],
    // Only generate the sizes we actually use — cuts Vercel transformations by ~70%
    deviceSizes: [640, 1200, 1920],
    imageSizes: [64, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      // Supabase storage – wildcard covers all projects
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Supabase storage – explicit project hostname as belt-and-braces fallback
      {
        protocol: 'https',
        hostname: 'vjhwudyiwahkvqugihdq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig
