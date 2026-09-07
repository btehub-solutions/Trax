import type { Metadata } from 'next'
import { SITE_URL } from './server-api'

/** Branded default share image — generated at /opengraph-image */
const DEFAULT_OG_IMAGE = '/opengraph-image'
const DEFAULT_OG_IMAGE_ABSOLUTE = `${SITE_URL}/opengraph-image`
const SITE_LOGO = `${SITE_URL}/icon.svg`

export const siteConfig = {
  name: 'Trax',
  title: 'Trax | Tracking Tech Across Nigeria, Africa & the World',
  description:
    'Independent tech media tracking startups, venture capital, innovation, policy, and defining events shaping digital economies across Nigeria, Africa, and global frontiers.',
  url: SITE_URL,
  locale: 'en_US',
  alternateLocales: ['en_NG', 'en_GB', 'en_KE', 'en_ZA'],
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
    'African tech news',
    'Nigeria startups',
    'Africa venture capital',
    'Global tech intelligence',
    'African innovation hubs',
    'Nigerian tech ecosystem',
    'Fintech Africa',
    'Artificial Intelligence in Africa',
    'Digital economy Africa',
    'Tech policy and regulation',
    'African tech funding and deals',
    'Tech events Africa and global',
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
    alternateLocale: [...siteConfig.alternateLocales],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Trax: African & Global Tech Intelligence',
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
  keywords,
}: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  keywords?: string[]
}): Metadata {
  const ogImage = image || DEFAULT_OG_IMAGE

  return {
    title,
    description,
    keywords: keywords ?? defaultMetadata.keywords,
    alternates: {
      canonical: path,
      types: {
        'application/rss+xml': `${siteConfig.url}/feed.xml`,
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      alternateLocale: [...siteConfig.alternateLocales],
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
    spatialCoverage: ['Nigeria', 'Africa', 'Global'],
    contentLocation: {
      '@type': 'Place',
      name: 'Africa',
    },
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: 'Technology Reporter',
      worksFor: {
        '@type': 'NewsMediaOrganization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/icon.svg`,
      },
      sameAs: [
        'https://x.com/traxnewsng',
        'https://www.instagram.com/traxnewsng',
        'https://youtube.com/@traxnewsng',
        'https://www.linkedin.com/in/traxnewsng',
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

export function eventJsonLd(event: {
  name: string
  description?: string
  startDate: string
  endDate?: string
  location?: string
  url?: string
  image?: string
  isVirtual?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description || `${event.name} — African & Global Tech Event covered by Trax`,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventAttendanceMode: event.isVirtual
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: event.isVirtual
      ? {
          '@type': 'VirtualLocation',
          url: event.url || siteConfig.url,
        }
      : {
          '@type': 'Place',
          name: event.location || 'Africa / Global',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'NG',
          },
        },
    image: event.image ? [event.image] : [`${siteConfig.url}/opengraph-image`],
    organizer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    sameAs: [
      'https://x.com/traxnewsng',
      'https://www.instagram.com/traxnewsng',
      'https://youtube.com/@traxnewsng',
      'https://www.linkedin.com/in/traxnewsng',
    ],
    description: siteConfig.description,
    email: 'traxnewsng@gmail.com',
    areaServed: [
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Continent', name: 'Africa' },
      { '@type': 'AdministrativeArea', name: 'Global' },
    ],
    knowsAbout: [
      'African Technology Ecosystem',
      'Nigerian Startups',
      'Pan-African Venture Capital & Angel Investing',
      'Global Tech Frontiers & AI',
      'Tech Policy and Digital Infrastructure',
      'Emerging Market Innovations',
      'Tech Conferences and Summits',
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
      '@type': 'NewsMediaOrganization',
      name: siteConfig.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}
