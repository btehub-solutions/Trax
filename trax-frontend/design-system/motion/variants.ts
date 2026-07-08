import type { Variants } from 'framer-motion'
import { motionDistance } from './motion'
import { staggerContainer } from './transitions'
import { transitionEditorial, transitionDramatic, transitionExit, transitionOverlay } from './transitions'

const reduced = { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionEditorial },
  exit: { opacity: 0, transition: transitionExit },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: motionDistance.md },
  visible: { opacity: 1, y: 0, transition: transitionEditorial },
  exit: { opacity: 0, y: -motionDistance.sm, transition: transitionExit },
}

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: motionDistance.sm },
  visible: { opacity: 1, y: 0, transition: transitionEditorial },
  exit: { opacity: 0, y: -motionDistance.xs, transition: transitionExit },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -motionDistance.sm },
  visible: { opacity: 1, x: 0, transition: transitionEditorial },
  exit: { opacity: 0, x: motionDistance.sm, transition: transitionExit },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: motionDistance.lg },
  visible: { opacity: 1, y: 0, transition: transitionEditorial },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitionEditorial },
  exit: { opacity: 0, scale: 0.98, transition: transitionExit },
}

export const overlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionOverlay },
  exit: { opacity: 0, transition: transitionExit },
}

export const overlayPanel: Variants = {
  hidden: { opacity: 0, y: motionDistance.md, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transitionOverlay },
  exit: { opacity: 0, y: motionDistance.sm, scale: 0.99, transition: transitionExit },
}

/** Nav / search / menu */
export const slideFromTop: Variants = {
  hidden: { opacity: 0, y: -motionDistance.lg },
  visible: { opacity: 1, y: 0, transition: transitionEditorial },
  exit: { opacity: 0, y: -motionDistance.md, transition: transitionExit },
}

/** Brutalist homepage masthead — one loud moment */
export const mastheadContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

export const mastheadRule: Variants = {
  hidden: { scaleX: 0, opacity: 0.6 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { ...transitionDramatic, ease: [0.22, 1, 0.36, 1] },
  },
}

export const mastheadMeta: Variants = {
  hidden: { opacity: 0, y: motionDistance.sm },
  visible: { opacity: 1, y: 0, transition: transitionEditorial },
}

export const mastheadTitle: Variants = {
  hidden: { opacity: 0, y: motionDistance.xl },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transitionDramatic, delay: 0.06 },
  },
}

export const mastheadWatermark: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 0.035,
    scale: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
}

export const staggerGrid: Variants = {
  hidden: {},
  visible: { transition: staggerContainer() },
}

export const staggerFeed: Variants = {
  hidden: {},
  visible: { transition: staggerContainer(0.05, 0.02) },
}

export const staggerSection: Variants = {
  hidden: {},
  visible: { transition: staggerContainer(0.12, 0.06) },
}

/** Card lift on hover — subtle life */
export const cardHover = {
  y: -4,
  transition: { duration: 0.25, ease: [0.2, 0, 0, 1] },
}

export const cardHoverReduced = { y: 0 }

/** Reduced-motion fallbacks */
export const motionSafeVariants = {
  fade: { hidden: reduced, visible: reduced, exit: reduced },
  fadeUp: { hidden: reduced, visible: reduced, exit: reduced },
  fadeUpSoft: { hidden: reduced, visible: reduced, exit: reduced },
  fadeInLeft: { hidden: reduced, visible: reduced, exit: reduced },
  slideUp: { hidden: reduced, visible: reduced },
  scaleIn: { hidden: reduced, visible: reduced, exit: reduced },
  overlay: { hidden: reduced, visible: reduced, exit: reduced },
  overlayPanel: { hidden: reduced, visible: reduced, exit: reduced },
  slideFromTop: { hidden: reduced, visible: reduced, exit: reduced },
  mastheadContainer: { hidden: {}, visible: {} },
  mastheadRule: { hidden: reduced, visible: reduced },
  mastheadMeta: { hidden: reduced, visible: reduced },
  mastheadTitle: { hidden: reduced, visible: reduced },
  mastheadWatermark: { hidden: { opacity: 0.035 }, visible: { opacity: 0.035 } },
  staggerGrid: { hidden: {}, visible: {} },
  staggerFeed: { hidden: {}, visible: {} },
  staggerSection: { hidden: {}, visible: {} },
} as const

export type MotionVariantName = keyof typeof motionSafeVariants
