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
    title: "Ogun State Tech Startups Draw Key Seed Funding in Q1 2026",
    excerpt:
      'A surge in global VC confidence is fuelling unprecedented investment in Nigerian tech ventures, with fintech and agritech leading the charge.',
    category: 'Funding',
    author: 'Chidi Okafor',
    authorRole: 'Senior Reporter',
    date: 'June 5, 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80',
    featured: true,
    breaking: true,
  },
  {
    id: '2',
    slug: 'abeokuta-engineer-ogun-state-first-open-source-software',
    title: "Meet the Abeokuta Engineer Building Ogun State's First Open-Source software",
    excerpt:
      'Trained on 40 languages spoken across the state, Ogun Agrotech aims to democratise AI for millions of underserved speakers.',
    category: 'Profiles',
    author: 'Amara Nwosu',
    authorRole: 'Features Editor',
    date: 'June 3, 2026',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=500&fit=crop&q=80',
    trending: true,
  },
  {
    id: '3',
    slug: 'ogun-state-healthtech-malaria-diagnosis',
    title: 'How Ogun State Healthtech is Using AI to Diagnose Malaria in 90 Seconds',
    excerpt:
      'Ogun Tech\'s mobile-first diagnostic tool has already screened over 500,000 patients across rural Ogun State with 94% accuracy.',
    category: 'Health',
    author: 'Kemi Adeyemi',
    authorRole: 'Health Correspondent',
    date: 'June 1, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=500&fit=crop&q=80',
    trending: true,
  },
  {
    id: '4',
    slug: 'abeokuta-tech-hub-fastest-growing-cluster',
    title: "The Abeokuta AI Hub is Now Ogun State's Fastest-Growing Tech Cluster",
    excerpt:
      'Rock City tech zone is evolving into an AI powerhouse, attracting talent from across the state and partnerships from global tech giants.',
    category: 'Ecosystem',
    author: 'Tunde Bakare',
    authorRole: 'East Africa Bureau',
    date: 'May 30, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=500&fit=crop&q=80',
  },
  {
    id: '5',
    slug: 'openai-africa-strategy-expansion-interview',
    title: "OpenAI's Africa Lead: 'We're Building Infrastructure, Not Just Products'",
    excerpt:
      'An exclusive interview with OpenAI\'s Head of Africa Partnerships on their continent-wide expansion strategy and local hiring plans.',
    category: 'Interview',
    author: 'Ngozi Eze',
    authorRole: 'Editor-in-Chief',
    date: 'May 28, 2026',
    readTime: '9 min read',
    image:
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&h=500&fit=crop&q=80',
    featured: true,
    trending: true,
  },
  {
    id: '6',
    slug: 'ogun-west-digital-literacy-program-expansion',
    title: "Ogun West's Digital Literacy Drive: How Yewa is Embracing the Tech Boom",
    excerpt:
      'Ilaro\'s growing AI ecosystem is challenging Anglophone dominance, with government backing and a new generation of francophone tech researchers.',
    category: 'Research',
    author: 'Fatou Diallo',
    authorRole: 'Ogun State Correspondent',
    date: 'May 25, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop&q=80',
  },
  {
    id: '7',
    slug: 'abeokuta-tech-summit-2026-highlights',
    title: 'Abeokuta Tech Summit 2026: Every Announcement That Mattered',
    excerpt:
      'From government tech policy frameworks to five landmark startup deals, here is a complete breakdown of everything announced at Ogun State\'s biggest AI event.',
    category: 'Events',
    author: 'Emeka Obi',
    authorRole: 'Events Reporter',
    date: 'May 22, 2026',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=500&fit=crop&q=80',
  },
  {
    id: '8',
    slug: 'nigeria-tech-policy-framework-2026',
    title: "Nigeria Unveils National Tech Policy Framework: Key Insights for Startups",
    excerpt:
      'The Federal Ministry of Innovation has released a comprehensive 5-year AI roadmap. We break down what it means for founders, researchers and investors.',
    category: 'Policy',
    author: 'Chidi Okafor',
    authorRole: 'Senior Reporter',
    date: 'May 20, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=500&fit=crop&q=80',
  },
  {
    id: '9',
    slug: 'ogun-founders-ecommerce-supply-chains',
    title: "How Nigerian Founders Are Using AI to Fix Broken Supply Chains",
    excerpt:
      'From Abeokuta to Sagamu, a new wave of startups is rebuilding logistics from the ground up.',
    category: 'Ecosystem',
    author: 'Tunde Bakare',
    authorRole: 'Senior Correspondent',
    date: 'June 5, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1558174685-430919a96c8d?w=900&h=500&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1466228432269-af42b400b934?w=900&h=500&fit=crop&q=80',
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
      'https://images.unsplash.com/photo-1605907126120-f68611516ecc?w=900&h=500&fit=crop&q=80',
  },
]

export const breakingHeadlines = [
  "🔴 BREAKING: Abeokuta-based Verifi raises $18M Series A for fraud detection",
  "Google DeepMind opens first Ogun State's research office in Ota",
  "Nigeria's NITDA launches ₦5B tech fund for early-stage founders",
  "EXCLUSIVE: Interview with the woman building Ogun State's largest tech dataset",
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
  'Generative AI', 'AgriTech', 'FinTech', 'HealthTech',
  'Policy', 'Research', 'Funding', 'Profiles',
]
