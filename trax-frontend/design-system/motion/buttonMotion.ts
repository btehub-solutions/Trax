import type { TargetAndTransition, Transition } from 'framer-motion'
import { springNav, springGentle } from './transitions'

export type ButtonMotionVariant = 'primary' | 'outline' | 'ghost' | 'inverse'

const reducedTap: TargetAndTransition = { scale: 1 }
const reducedHover: TargetAndTransition = {}

/** Snappy editorial press — weighty, not bouncy */
export const buttonTap = {
  scale: 0.96,
  transition: springNav,
} satisfies TargetAndTransition

export const buttonTapSoft = {
  scale: 0.98,
  transition: { ...springGentle, stiffness: 340 },
} satisfies TargetAndTransition

const hoverPrimary: TargetAndTransition = {
  y: -2,
  scale: 1.015,
  boxShadow: '0 10px 28px rgba(231, 4, 13, 0.28)',
  transition: springNav,
}

const hoverOutline: TargetAndTransition = {
  y: -1,
  scale: 1.01,
  transition: springNav,
}

const hoverGhost: TargetAndTransition = {
  x: 2,
  transition: springNav,
}

const hoverInverse: TargetAndTransition = {
  y: -2,
  scale: 1.02,
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
  transition: springNav,
}

export function getButtonHover(
  variant: ButtonMotionVariant,
  reduced = false,
): TargetAndTransition {
  if (reduced) return reducedHover
  switch (variant) {
    case 'outline':
      return hoverOutline
    case 'ghost':
      return hoverGhost
    case 'inverse':
      return hoverInverse
    default:
      return hoverPrimary
  }
}

export function getButtonTap(reduced = false, soft = false): TargetAndTransition {
  if (reduced) return reducedTap
  return soft ? buttonTapSoft : buttonTap
}

/** CTA arrow slip — signature Trax dispatch motion */
export const arrowRest = { x: 0, opacity: 0.88 }
export const arrowHover = {
  x: 5,
  opacity: 1,
  transition: { ...springNav, stiffness: 400 },
}

export const iconButtonHover = {
  scale: 1.06,
  transition: springNav,
} satisfies TargetAndTransition

export const iconButtonTap = buttonTapSoft

/** Hero “read more” underline sweep */
export const readMoreParent = {
  rest: {},
  hover: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
}

export const readMoreLabel = {
  rest: {
    x: 0,
    color: 'var(--neutral-text-primary)',
  },
  hover: {
    x: 4,
    color: 'var(--brand-primary)',
    transition: springNav,
  },
}

export const readMoreRule = {
  rest: { scaleX: 0.35, opacity: 0.45 },
  hover: {
    scaleX: 1,
    opacity: 1,
    transition: { ...springNav, stiffness: 320 },
  },
}
