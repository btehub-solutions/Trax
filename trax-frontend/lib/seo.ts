import type { Metadata } from 'next'
import { SITE_URL } from './server-api'

/** Branded default share image — generated at /opengraph-image */
const DEFAULT_OG_IMAGE = '/opengraph-image'
const DEFAULT_OG_IMAGE_ABSOLUTE = `${SITE_URL}/opengraph-image`
const SITE_LOGO = `${SITE_URL}/icon.svg`

export const siteConfig = {
  name: 'Trax',
  title: "Trax | Tracking Ogun State's Tech Movement",
  description:
    "Ogun State's tech news and startup media platform — startups, funding, people, policy, and events across the corridor.",
  url: SITE_URL,
  locale: 'en_NG',
  twitter: '@traxnewsng',
  ogImage: DEFAULT_OG_IMAGE_ABSOLUTE,
} as const

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Trax',
  },
  description: siteConfig.description,
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  keywords: [
    'Ogun State tech',
    'Nigeria startups',
    'Abeokuta tech',
    'Ogun State funding',
    'West Africa tech news',
    'Nigeria tech media',
    'Ogun ecosystem',
  ],
  authors: [{ name: 'Trax', url: siteConfig.url }],
  creator: 'Trax',
  publisher: 'Trax',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Trax — Ogun State tech news',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [DEFAULT_OG_IMAGE],
  },
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}): Metadata {
  const ogImage = image || DEFAULT_OG_IMAGE

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title,
      description,
      images: [ogImage],
    },
  }
}

export function articleJsonLd(article: {
  title: string
  excerpt: string
  slug: string
  image: string
  date: string
  publishedAt?: string
  author: string
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    datePublished: article.publishedAt || article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/articles/${article.slug}`,
    },
    articleSection: article.category,
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: SITE_LOGO,
    sameAs: ['https://x.com/traxnewsng'],
    description: siteConfig.description,
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/news?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}
