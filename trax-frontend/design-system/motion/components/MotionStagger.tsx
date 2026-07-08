'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { useMotionVariants } from '../hooks/useMotionTransition'
import { viewportGrid } from '../viewport'
import {
  staggerGrid,
  staggerFeed,
  staggerSection,
  type MotionVariantName,
} from '../variants'

const containers = {
  staggerGrid,
  staggerFeed,
  staggerSection,
}

export interface MotionStaggerProps extends HTMLMotionProps<'div'> {
  stagger?: keyof typeof containers
  viewport?: HTMLMotionProps<'div'>['viewport']
}

/** Stagger parent — wrap children in MotionItem */
export default function MotionStagger({
  stagger = 'staggerGrid',
  viewport = viewportGrid,
  children,
  className,
  ...props
}: MotionStaggerProps) {
  const container = useMotionVariants(containers[stagger], stagger)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={container}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
