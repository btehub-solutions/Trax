'use client'

import Card from '@/components/ui/Card'
import type { Article } from '@/lib/articles'

export interface ArticleCardProps {
  image: string
  category: string
  title: string
  author: string
  date: string
  readTime: string
  slug: string
  breaking?: boolean
  index?: number
}

export default function ArticleCard({
  image,
  category,
  title,
  author,
  date,
  readTime,
  slug,
  breaking = false,
  index = 0,
}: ArticleCardProps) {
  const article: Article = {
    id: slug,
    slug,
    title,
    excerpt: '',
    category,
    author,
    authorRole: 'Reporter',
    date,
    readTime,
    image,
    breaking,
  }

  return <Card article={article} index={index} />
}
