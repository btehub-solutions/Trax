'use client'

import { useEffect, useState } from 'react'
import type { Transition, Variants } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'
import { motionSafeVariants, type MotionVariantName } from '../variants'

export function useMotionVariants<T extends Variants>(
  variants: T,
  safeName?: MotionVariantName,
): T {
  const reduced = useReducedMotion()
  if (!reduced) return variants
  if (safeName && motionSafeVariants[safeName]) {
    return motionSafeVariants[safeName] as unknown as T
  }
  return variants
}

export function useMotionTransition(transition: Transition): Transition {
  const reduced = useReducedMotion()
  if (!reduced) return transition
  return { duration: 0 }
}

export function useMotionEnabled(): boolean {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return false
  return !reduced
}
