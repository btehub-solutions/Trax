'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { useMotionVariants } from '../hooks/useMotionTransition'
import { fadeUpSoft, type MotionVariantName } from '../variants'

export interface MotionItemProps extends HTMLMotionProps<'div'> {
  variant?: MotionVariantName
}

export default function MotionItem({
  variant = 'fadeUpSoft',
  children,
  ...props
}: MotionItemProps) {
  const variants = useMotionVariants(fadeUpSoft, variant)

  return (
    <motion.div variants={variants} {...props}>
      {children}
    </motion.div>
  )
}
