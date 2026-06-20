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

export const articles: Article[] = [
  {
    id: '1',
    slug: 'ogun-tech-startups-funding-q1-2026',
    title: "Ogun State Startups Draw Key Seed Funding in Q1 2026",
    excerpt:
      'A surge in investor confidence is fuelling new capital into Ogun State ventures, with fintech, logistics and agritech leading the charge.',
    category: 'Funding',
    author: 'Chidi Okafor',
    authorRole: 'Senior Reporter',
    date: 'June 5, 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=750&fit=crop&q=85',
    featured: true,
    breaking: true,
  },
  {
    id: '2',
    slug: 'abeokuta-engineer-ogun-state-first-open-source-software',
    title: "Meet the Abeokuta Engineer Building Practical Software for Local Businesses",
    excerpt:
      'A new generation of local engineers is building tools for merchants, schools and logistics teams that global software often overlooks.',
    category: 'Profiles',
    author: 'Amara Nwosu',
    authorRole: 'Features Editor',
    date: 'June 3, 2026',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=750&fit=crop&q=85',
    trending: true,
  },
  {
    id: '3',
    slug: 'ogun-state-healthtech-malaria-diagnosis',
    title: 'How Ogun State Healthtech Teams Are Improving Rural Diagnostics',
    excerpt:
      'Mobile-first diagnostic tools are helping clinics reach underserved communities across rural Ogun State.',
    category: 'Health',
    author: 'Kemi Adeyemi',
    authorRole: 'Health Correspondent',
    date: 'June 1, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=750&fit=crop&q=85',
    trending: true,
  },
  {
    id: '4',
    slug: 'abeokuta-tech-hub-fastest-growing-cluster',
    title: "The Abeokuta Hub Is Becoming Ogun State's Fastest-Growing Tech Cluster",
    excerpt:
      'Rock City’s tech zone is attracting founders, operators and students from across the state.',
    category: 'Ecosystem',
    author: 'Tunde Bakare',
    authorRole: 'East Africa Bureau',
    date: 'May 30, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=750&fit=crop&q=85',
  },
  {
    id: '5',
    slug: 'openai-africa-strategy-expansion-interview',
    title: "Inside the Infrastructure Push Behind West Africa's Startup Expansion",
    excerpt:
      'Operators and investors explain why payments, logistics and cloud infrastructure now matter as much as consumer apps.',
    category: 'Interview',
    author: 'Ngozi Eze',
    authorRole: 'Editor-in-Chief',
    date: 'May 28, 2026',
    readTime: '9 min read',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=750&fit=crop&q=85',
    featured: true,
    trending: true,
  },
  {
    id: '6',
    slug: 'ogun-west-digital-literacy-program-expansion',
    title: "Ogun West's Digital Literacy Drive: How Yewa is Embracing the Tech Boom",
    excerpt:
      'Ilaro’s growing training network is helping young builders move from basic digital skills into practical startup work.',
    category: 'Research',
    author: 'Fatou Diallo',
    authorRole: 'Ogun State Correspondent',
    date: 'May 25, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=750&fit=crop&q=85',
  },
  {
    id: '7',
    slug: 'abeokuta-tech-summit-2026-highlights',
    title: 'Abeokuta Tech Summit 2026: Every Announcement That Mattered',
    excerpt:
      'From policy commitments to startup showcases, here is what mattered at Ogun State’s biggest tech gathering.',
    category: 'Events',
    author: 'Emeka Obi',
    authorRole: 'Events Reporter',
    date: 'May 22, 2026',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=750&fit=crop&q=85',
  },
  {
    id: '8',
    slug: 'nigeria-tech-policy-framework-2026',
    title: "Nigeria Unveils National Tech Policy Framework: Key Insights for Startups",
    excerpt:
      'The Federal Ministry of Innovation has released a new technology roadmap. We break down what it means for founders and investors.',
    category: 'Policy',
    author: 'Chidi Okafor',
    authorRole: 'Senior Reporter',
    date: 'May 20, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=750&fit=crop&q=85',
  },
  {
    id: '9',
    slug: 'ogun-founders-ecommerce-supply-chains',
    title: "How Nigerian Founders Are Fixing Broken Supply Chains",
    excerpt:
      'From Abeokuta to Sagamu, a new wave of startups is rebuilding logistics from the ground up.',
    category: 'Ecosystem',
    author: 'Tunde Bakare',
    authorRole: 'Senior Correspondent',
    date: 'June 5, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=750&fit=crop&q=85',
  },
  {
    id: '10',
    slug: 'ogun-state-tech-funding-q1-2026',
    title: "Ogun State's Startups Raised $48M in Q1 2026: Details and Funding Winners",
    excerpt:
      'A breakdown of the biggest funding rounds, who the investors are, and what sectors they are betting on.',
    category: 'Funding',
    author: 'Chidi Okafor',
    authorRole: 'Senior Reporter',
    date: 'May 28, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=750&fit=crop&q=85',
  },
  {
    id: '11',
    slug: 'essential-tech-tools-ogun-developers-2026',
    title: "The Tech Tools Every Ogun State Developer Should Know in 2026",
    excerpt:
      'Practical, affordable, and built for low-bandwidth environments, these tools are changing how Ogun State devs build.',
    category: 'Tools',
    author: 'Amara Nwosu',
    authorRole: 'Features Editor',
    date: 'May 20, 2026',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=750&fit=crop&q=85',
  },
]

export const breakingHeadlines = [
  "🔴 BREAKING: Abeokuta-based Verifi raises $18M Series A for fraud detection",
  "New operator network launches for Ogun State founders in Ota",
  "Nigeria's NITDA launches ₦5B tech fund for early-stage founders",
  "EXCLUSIVE: Interview with the woman mapping Ogun State's startup economy",
  "Abeokuta Tech Summit 2026 set for October, with early bird tickets now open",
  "Andela partners with three Nigerian universities on software engineering curriculum",
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'Startups', href: '/startups' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Events', href: '/events' },
]

export const topicPills = [
  'Startups', 'AgriTech', 'FinTech', 'HealthTech',
  'Policy', 'Research', 'Funding', 'Profiles',
]
