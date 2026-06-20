'use client'

import { useState } from 'react'
import CategoryStrip from '@/components/ui/CategoryStrip'
import ArticleGrid from '@/components/ui/ArticleGrid'
import type { Article } from '@/lib/articles'

interface TabbedArticlesSectionProps {
  articles: Article[]
}

export default function TabbedArticlesSection({ articles }: TabbedArticlesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Filter articles based on active category
  const filteredArticles = articles.filter((article) => {
    if (selectedCategory === 'All') return true
    
    const articleCat = article.category.toLowerCase()
    const selectedCat = selectedCategory.toLowerCase()
    
    // Support custom category mapping
    if (selectedCat === 'startups') {
      return ['ecosystem', 'profiles', 'funding', 'startups', 'startups'].includes(articleCat)
    }
    if (selectedCat === 'people') {
      return ['profiles', 'interview', 'people'].includes(articleCat)
    }
    
    return articleCat === selectedCat
  })

  // Display up to 6 articles in the latest stories grid
  const latestFiltered = filteredArticles.slice(0, 6)

  // Map category tab names to their corresponding subpages
  const categoryPaths: Record<string, string> = {
    'all': '/news',
    'startups': '/startups',
    'funding': '/funding',
    'tools': '/tools',
    'people': '/people',
    'policy': '/policy',
    'ecosystem': '/ecosystem',
    'events': '/events',
    'health': '/news',
    'research': '/news',
  }
  const viewAllHref = categoryPaths[selectedCategory.toLowerCase()] || '/news'

  return (
    <>
      <CategoryStrip active={selectedCategory} onChange={setSelectedCategory} />
      <ArticleGrid
        id="latest"
        title={selectedCategory === 'All' ? 'Latest Intelligence' : `${selectedCategory} Intelligence`}
        subtitle={
          selectedCategory === 'All'
            ? 'Fresh reporting from Ogun State and West Africa’s startup corridors'
            : `Fresh reporting and signals under ${selectedCategory}`
        }
        articles={latestFiltered}
        viewAllHref={viewAllHref}
      />
    </>
  )
}
