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
  publishedAt?: string
  readTime: string
  image: string
  featured?: boolean
  breaking?: boolean
  trending?: boolean
}

export const articles: Article[] = []

export { navLinks } from '@/lib/navigation'
export type { NavLink } from '@/lib/navigation'

export const topicPills = [
  'Startups', 'AgriTech', 'FinTech', 'HealthTech',
  'Policy', 'Research', 'Funding', 'Profiles',
]
