import 'dotenv/config'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { PrismaService } from '../src/prisma/prisma.service'
import * as crypto from 'crypto'

const prisma = new PrismaService()

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

async function main() {
  console.log('Clearing database...')
  await prisma.articleTag.deleteMany({})
  await prisma.tag.deleteMany({})
  await prisma.article.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.subscriber.deleteMany({})
  await prisma.adSlot.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('Creating Admin user...')
  const admin = await prisma.user.create({
    data: {
      email: 'admin@trax.co',
      name: 'Admin Editor',
      password: hashPassword('trax885152!'),
      role: 'ADMIN',
      bio: 'Editor-in-Chief at Trax.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&q=80',
    },
  })

  console.log('Creating Categories...')
  const categoriesList = [
    { name: 'Funding', slug: 'funding', color: '#059669', description: 'Investments and VC updates' },
    { name: 'Profiles', slug: 'profiles', color: '#7C3AED', description: 'Founder and builder spotlights' },
    { name: 'Health', slug: 'health', color: '#2563EB', description: 'HealthTech and digital health innovations' },
    { name: 'Ecosystem', slug: 'ecosystem', color: '#C84B31', description: 'Tech hubs, clusters and networking' },
    { name: 'Interview', slug: 'interview', color: '#4F46E5', description: 'Exclusive executive interviews' },
    { name: 'Research', slug: 'research', color: '#DB2777', description: 'Academic papers and ML breakthroughs' },
    { name: 'Events', slug: 'events', color: '#0891B2', description: 'tech summits, meetups and hackathons' },
    { name: 'Policy', slug: 'policy', color: '#D97706', description: 'Government roadmaps and regulations' },
    { name: 'Tools', slug: 'tools', color: '#3B82F6', description: 'Libraries, code assets, and platforms' },
  ]

  const categoriesMap: Record<string, string> = {}
  for (const cat of categoriesList) {
    const created = await prisma.category.create({ data: cat })
    categoriesMap[cat.name] = created.id
  }

  console.log('Creating initial Articles...')
  const articlesSeed = [
    {
      slug: 'ogun-tech-startups-funding-q1-2026',
      title: "Ogun State Tech Startups Draw Key Seed Funding in Q1 2026",
      excerpt: 'A surge in global VC confidence is fuelling unprecedented investment in Nigerian tech ventures, with fintech and agritech leading the charge.',
      body: 'The latest data from across Nigeria\'s thriving technology ecosystem paints a picture of remarkable resilience and ambition. Investors who were cautious just eighteen months ago are now moving with conviction, drawn by a maturing regulatory environment, a deepening talent pool, and a series of high-profile exits.',
      categoryName: 'Funding',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop&q=80',
      featured: true,
      breaking: true,
      readTime: '4 min read',
    },
    {
      slug: 'abeokuta-engineer-ogun-state-first-open-source-software',
      title: "Meet the Abeokuta Engineer Building Ogun State's First Open-Source software",
      excerpt: 'Trained on 40 languages spoken across the state, Ogun Agrotech aims to democratise AI for millions of underserved speakers.',
      body: 'In the heart of Abeokuta, a small group of researchers is working on a core technology stack that could redefine how digital services operate in Ogun State. Rather than translating through English mid-steps, Ogun Agrotech handles structural nuances natively.',
      categoryName: 'Profiles',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=500&fit=crop&q=80',
      trending: true,
      readTime: '7 min read',
    },
    {
      slug: 'ogun-state-healthtech-malaria-diagnosis',
      title: 'How Ogun State Healthtech is Using AI to Diagnose Malaria in 90 Seconds',
      excerpt: 'Ogun Tech\'s mobile-first diagnostic tool has already screened over 500,000 patients across rural Ogun State with 94% accuracy.',
      body: 'Malaria diagnostics are undergoing a structural shift in Ogun State. By retrofitting mobile microscopic adapters with local diagnostic classification models, rural practitioners can detect malaria loads within seconds.',
      categoryName: 'Health',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=500&fit=crop&q=80',
      trending: true,
      readTime: '5 min read',
    },
    {
      slug: 'abeokuta-tech-hub-fastest-growing-cluster',
      title: "The Abeokuta AI Hub is Now Ogun State's Fastest-Growing Tech Cluster",
      excerpt: 'Rock City tech zone is evolving into an AI powerhouse, attracting talent from across the state and partnerships from global tech giants.',
      body: 'Hubs across Abeokuta are scaling up compute access for builders. Supported by institutional grants and GPU pipelines, Abeokuta is setting the baseline for sub-Saharan developer velocity.',
      categoryName: 'Ecosystem',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=500&fit=crop&q=80',
      readTime: '6 min read',
    },
    {
      slug: 'openai-africa-strategy-expansion-interview',
      title: "OpenAI's Africa Lead: 'We're Building Infrastructure, Not Just Products'",
      excerpt: 'An exclusive interview with OpenAI\'s Head of Africa Partnerships on their continent-wide expansion strategy and local hiring plans.',
      body: 'In an exclusive interview, AI leads discuss product customization, deployment constraints, API pricing support, and compute credit grants designed to stimulate developer talent in local hubs.',
      categoryName: 'Interview',
      image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&h=500&fit=crop&q=80',
      featured: true,
      trending: true,
      readTime: '9 min read',
    },
    {
      slug: 'ogun-west-digital-literacy-program-expansion',
      title: "Ogun West's Digital Literacy Drive: How Yewa is Embracing the Tech Boom",
      excerpt: 'Ilaro\'s growing AI ecosystem is challenging Anglophone dominance, with government backing and a new generation of francophone tech researchers.',
      body: 'From research centers in Ilaro to localized language engines in Ijebu Ode, Francophone Ogun State is building dedicated computational nodes tailored to regional agricultural datasets.',
      categoryName: 'Research',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop&q=80',
      readTime: '6 min read',
    },
    {
      slug: 'abeokuta-tech-summit-2026-highlights',
      title: 'Abeokuta Tech Summit 2026: Every Announcement That Mattered',
      excerpt: 'From government tech policy frameworks to five landmark startup deals, here is a complete breakdown of everything announced.',
      body: 'The summit concluded with the launch of the National Compute Credit allocation and a unified sandbox registry for fintech models operating across the ECOWAS region.',
      categoryName: 'Events',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=500&fit=crop&q=80',
      readTime: '8 min read',
    },
    {
      slug: 'nigeria-tech-policy-framework-2026',
      title: "Nigeria Unveils National Tech Policy Framework: Key Insights for Startups",
      excerpt: 'The Federal Ministry of Innovation has released a comprehensive 5-year AI roadmap. We break down what it means for founders, researchers and investors.',
      body: 'The policy framework outlines computational rights, standard licensing, local storage expectations, and the national guidelines regarding ethical model audits.',
      categoryName: 'Policy',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=500&fit=crop&q=80',
      readTime: '5 min read',
    },
    {
      slug: 'ogun-founders-ecommerce-supply-chains',
      title: 'How Nigerian Founders Are Using AI to Fix Broken Supply Chains',
      excerpt: 'From Abeokuta to Sagamu, a new wave of startups is rebuilding logistics from the ground up.',
      body: 'Predictive logistics dispatchers are using routing algorithms to bypass bottleneck points, increasing transport efficiency across Nigerian shipping routes.',
      categoryName: 'Ecosystem',
      image: 'https://images.unsplash.com/photo-1558174685-430919a96c8d?w=900&h=500&fit=crop&q=80',
      readTime: '5 min read',
    },
    {
      slug: 'ogun-state-tech-funding-q1-2026',
      title: "Ogun State's Startups Raised $48M in Q1 2026: Details and Funding Winners",
      excerpt: 'A breakdown of the biggest funding rounds, who the investors are, and what sectors they are betting on.',
      body: 'A breakdown of the seed deals, compute grants, and angel networks leading early-stage tech syndications throughout Ogun State.',
      categoryName: 'Funding',
      image: 'https://images.unsplash.com/photo-1466228432269-af42b400b934?w=900&h=500&fit=crop&q=80',
      readTime: '6 min read',
    },
    {
      slug: 'essential-tech-tools-ogun-developers-2026',
      title: 'The Tech Tools Every Ogun State Developer Should Know in 2026',
      excerpt: 'Practical, affordable, and built for low-bandwidth environments, these tools are changing how Ogun State devs build.',
      body: 'Listing lightweight coding assistants, offline model interpreters, and low-latency API wrappers optimized for developers with capped bandwidth plans.',
      categoryName: 'Tools',
      image: 'https://images.unsplash.com/photo-1605907126120-f68611516ecc?w=900&h=500&fit=crop&q=80',
      readTime: '7 min read',
    },
  ]

  for (const article of articlesSeed) {
    const catId = categoriesMap[article.categoryName]
    if (!catId) continue

    await prisma.article.create({
      data: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        body: article.body,
        image: article.image,
        featured: article.featured || false,
        breaking: article.breaking || false,
        trending: article.trending || false,
        readTime: article.readTime,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        categoryId: catId,
        authorId: admin.id,
      },
    })
  }

  console.log('Seeding default Ad Slots...')
  const adSlotsSeed = [
    { name: 'Homepage Top Leaderboard', size: 'LEADERBOARD', code: '<div style="background: linear-gradient(90deg, #1f1f1f, #2e2e2e); color: #fff; text-align: center; line-height: 90px; font-weight: bold; border-radius: 12px; font-family: sans-serif;">Sponsor Ad Space (728x90)</div>', active: true },
    { name: 'Sidebar Square Ad', size: 'RECTANGLE', code: '<div style="background: linear-gradient(135deg, #C84B3115, #C84B3130); color: #C84B31; border: 2px dashed #C84B3150; text-align: center; padding: 40px 20px; font-weight: bold; border-radius: 16px; font-family: sans-serif;">Advertise with Trax<br><span style="font-size: 11px; font-weight: normal; color: #6B7280;">Reach 45k monthly readers</span></div>', active: true },
    { name: 'Inline News Banner', size: 'INLINE', code: '<div style="background: #111; color: #aaa; text-align: center; line-height: 120px; font-size: 13px; font-weight: bold; border-radius: 12px; border: 1px solid #222; font-family: sans-serif;">Premium Sponsor Banner (Inline)</div>', active: true },
  ]

  for (const slot of adSlotsSeed) {
    await prisma.adSlot.create({ data: slot })
  }

  console.log('Seeding newsletter subscribers...')
  await prisma.subscriber.create({
    data: { email: 'chidi@trax.co', confirmed: true },
  })
  await prisma.subscriber.create({
    data: { email: 'amara@trax.co', confirmed: true },
  })

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
