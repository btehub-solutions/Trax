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
    "Ogun State's tech news and startup media platform covering startups, funding, people, policy, and events across the corridor.",
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
  keywords: [
    'Ogun State tech',
    'Nigeria startups',
    'Abeokuta tech',
    'Ogun State funding',
    'Southwest Nigeria tech',
    'Nigeria tech media',
    'Ogun ecosystem',
    'African tech news',
    'Trax newsroom',
  ],
  authors: [{ name: 'Trax Editorial Team', url: siteConfig.url }],
  creator: 'Trax Media Ltd',
  publisher: 'Trax Media Ltd',
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
    types: {
      'application/rss+xml': `${siteConfig.url}/feed.xml`,
    },
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
        alt: 'Trax: Ogun State tech news',
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
    alternates: {
      canonical: path,
      types: {
        'application/rss+xml': `${siteConfig.url}/feed.xml`,
      },
    },
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

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
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
  const authorName = article.author || 'Trax Editorial Desk'
  const pubDate = article.publishedAt || article.date

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.image ? [article.image] : [`${siteConfig.url}/opengraph-image`],
    datePublished: pubDate,
    dateModified: pubDate,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: 'Technology Reporter',
      worksFor: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
      sameAs: [
        'https://x.com/traxnewsng',
        'https://www.instagram.com/traxnewsng',
        'https://youtube.com/@traxnewsng',
      ],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/articles/${article.slug}`,
    },
    articleSection: article.category,
    inLanguage: siteConfig.locale,
    isAccessibleForFree: 'True',
    publishingPrinciples: `${siteConfig.url}/about`,
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      'https://x.com/traxnewsng',
      'https://www.instagram.com/traxnewsng',
      'https://youtube.com/@traxnewsng',
    ],
    description: siteConfig.description,
    email: 'traxnewsng@gmail.com',
    foundingLocation: {
      '@type': 'Place',
      name: 'Ogun State, Nigeria',
    },
    knowsAbout: [
      'Ogun State Technology',
      'Nigerian Startups',
      'African Venture Capital',
      'Tech Ecosystem Policy',
      'Abeokuta Innovation Corridor',
    ],
    publishingPrinciples: `${siteConfig.url}/about`,
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
