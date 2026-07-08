'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { useMotionVariants } from '../hooks/useMotionTransition'
import { viewportEditorial } from '../viewport'
import {
  fade,
  fadeUp,
  fadeUpSoft,
  fadeInLeft,
  slideUp,
  scaleIn,
  type MotionVariantName,
} from '../variants'

const variantMap = {
  fade,
  fadeUp,
  fadeUpSoft,
  fadeInLeft,
  slideUp,
  scaleIn,
} as const

export interface MotionRevealProps extends HTMLMotionProps<'div'> {
  variant?: keyof typeof variantMap
  viewport?: HTMLMotionProps<'div'>['viewport']
  as?: 'div' | 'section' | 'article' | 'header' | 'span'
}

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  span: motion.span,
}

export default function MotionReveal({
  variant = 'fadeUp',
  viewport = viewportEditorial,
  as = 'div',
  children,
  ...props
}: MotionRevealProps) {
  const base = variantMap[variant]
  const variants = useMotionVariants(base, variant as MotionVariantName)
  const Tag = tags[as]

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      {...props}
    >
      {children}
    </Tag>
  )
}
