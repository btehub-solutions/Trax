'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  mastheadContainer,
  mastheadRule,
  mastheadTitle,
} from '@/design-system/motion'
import { useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'
import { resolveNavSection } from '@/lib/navSection'
import { BASE_URL } from '@/lib/api'
import { articles as mockArticles } from '@/lib/articles'
import { mapApiArticle } from '@/lib/mapArticle'

interface LeadStory {
  title: string
  slug: string
  category: string
}

export interface SectionMastheadProps {
  /** Optional server-provided lead — skips client fetch when set */
  lead?: LeadStory | null
}

export default function SectionMasthead({ lead: leadProp }: SectionMastheadProps = {}) {
  const pathname = usePathname()
  const section = resolveNavSection(pathname)

  const [mounted, setMounted] = useState(false)
  const [lead, setLead] = useState<LeadStory | null>(leadProp ?? null)

  const container = useMotionVariants(mastheadContainer, 'mastheadContainer')
  const rule = useMotionVariants(mastheadRule, 'mastheadRule')
  const title = useMotionVariants(mastheadTitle, 'mastheadTitle')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (leadProp) {
      setLead(leadProp)
      return
    }

    let cancelled = false

    const fetchLead = async () => {
      try {
        let item: unknown = null

        if (section.categorySlugs?.length) {
          const res = await fetch(`${BASE_URL}/articles?limit=24`, { cache: 'no-store' })
          if (!res.ok) throw new Error('fetch failed')
          const json = await res.json()
          const slugs = section.categorySlugs.map((s) => s.toLowerCase())
          item = (json?.data ?? []).find((a: { category?: { slug?: string; name?: string } }) => {
            const slug = a.category?.slug?.toLowerCase()
            const name = a.category?.name?.toLowerCase()
            return (slug && slugs.includes(slug)) || (name && slugs.includes(name))
          })
        } else {
          const query = section.categorySlug
            ? `${BASE_URL}/articles?category=${section.categorySlug}&limit=1`
            : `${BASE_URL}/articles?limit=1`

          const res = await fetch(query, { cache: 'no-store' })
          if (!res.ok) throw new Error('fetch failed')
          const json = await res.json()
          item = json?.data?.[0]
        }

        if (!item || cancelled) return

        const mapped = mapApiArticle(item)
        setLead({
          title: mapped.title,
          slug: mapped.slug,
          category: mapped.category,
        })
      } catch {
        if (cancelled) return
        const slugs = section.categorySlugs?.map((s) => s.toLowerCase())
        const fallback = slugs?.length
          ? mockArticles.find((a) => slugs.includes(a.category.toLowerCase()))
          : section.categorySlug
            ? mockArticles.find(
                (a) => a.category.toLowerCase() === section.categorySlug?.toLowerCase(),
              )
            : mockArticles[0]

        if (fallback) {
          setLead({ title: fallback.title, slug: fallback.slug, category: fallback.category })
        } else {
          setLead(null)
        }
      }
    }

    setLead(null)
    fetchLead()

    return () => {
      cancelled = true
    }
  }, [pathname, section.categorySlug, section.categorySlugs, section.href, leadProp])

  const headline = lead?.title ?? section.fallbackTitle
  const headlineHref = lead ? `/articles/${lead.slug}` : undefined

  return (
    <motion.header
      className="ds-masthead"
      initial={mounted ? 'hidden' : false}
      animate="visible"
      variants={container}
    >
      <div className="container">
        <div className="ds-masthead__content">
          <motion.div className="ds-masthead__lead" variants={title}>
            {lead?.category && (
              <span className="ds-category-pill mb-4 inline-block">{lead.category}</span>
            )}
            {headlineHref ? (
              <Link href={headlineHref} className="ds-masthead__title-link">
                <h1 className="type-masthead">{headline}</h1>
              </Link>
            ) : (
              <h1 className="type-masthead">{headline}</h1>
            )}
          </motion.div>
        </div>

        <motion.hr className="ds-rule-hard ds-masthead__rule mt-8" variants={rule} />
      </div>
    </motion.header>
  )
}
