import type { Transition } from 'framer-motion'
import { easeEditorial, easeIn, easeOut, easeSnap } from './easing'
import { motionDuration, motionStagger } from './motion'

export const springEditorial = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 28,
  mass: 0.85,
}

export const springNav = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 30,
  mass: 0.7,
}

export const springGentle = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 26,
  mass: 1,
}

export const transitionMicro: Transition = {
  duration: motionDuration.fast,
  ease: easeSnap,
}

export const transitionUi: Transition = {
  duration: motionDuration.base,
  ease: easeSnap,
}

export const transitionEditorial: Transition = {
  duration: motionDuration.editorial,
  ease: easeEditorial,
}

export const transitionEditorialSlow: Transition = {
  duration: motionDuration.slow,
  ease: easeEditorial,
}

export const transitionDramatic: Transition = {
  duration: motionDuration.dramatic,
  ease: easeOut,
}

export const transitionExit: Transition = {
  duration: motionDuration.base,
  ease: easeIn,
}

export const transitionOverlay: Transition = {
  duration: motionDuration.moderate,
  ease: easeEditorial,
}

export const staggerContainer = (
  stagger: number = motionStagger.base,
  delayChildren = 0.04,
) => ({
  staggerChildren: stagger,
  delayChildren,
})
