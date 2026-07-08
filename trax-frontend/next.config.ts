import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Use our custom Supabase-aware loader.
    // - Supabase Storage URLs → resized by Supabase's own CDN (zero Vercel transformations)
    // - All other URLs       → passed through as-is
    loader: 'custom',
    loaderFile: './lib/supabase-image-loader.ts',
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
