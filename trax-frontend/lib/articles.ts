export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorRole: string
  authorAvatar?: string | null
  officialLink?: string | null
  date: string
  readTime: string
  image: string
  featured?: boolean
  breaking?: boolean
  trending?: boolean
}

export const articles: Article[] = []

export const breakingHeadlines: string[] = []

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'Startups', href: '/startups' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Events', href: '/events' },
  { label: 'Press Room', href: '/press' },
]

export const topicPills = [
  'Startups', 'AgriTech', 'FinTech', 'HealthTech',
  'Policy', 'Research', 'Funding', 'Profiles',
]
