'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUpSoft } from '@/design-system/motion'
import { useMotionVariants } from '@/design-system/motion/hooks/useMotionTransition'

interface CategoryEmptyStateProps {
  categoryName: string
  message?: string
}

export default function CategoryEmptyState({
  categoryName,
  message,
}: CategoryEmptyStateProps) {
  const item = useMotionVariants(fadeUpSoft, 'fadeUpSoft')

  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="visible"
      className="ds-category-empty"
    >
      <p className="ds-category-empty__eyebrow">{categoryName}</p>
      <h3 className="ds-category-empty__title">Stories coming soon</h3>
      <p className="ds-category-empty__desc">
        {message ??
          `We are building coverage for this beat. Join the briefing to get ${categoryName.toLowerCase()} stories the moment they publish.`}
      </p>
      <Link href="#newsletter" className="ds-category-empty__link">
        Get the briefing
      </Link>
    </motion.div>
  )
}
