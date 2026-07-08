import type { Easing } from 'framer-motion'

/** Primary editorial entrance — confident deceleration */
export const easeEditorial: Easing = [0.22, 1, 0.36, 1]

/** Smooth settle for large surfaces */
export const easeOut: Easing = [0.16, 1, 0.3, 1]

/** Quick exit — don’t linger */
export const easeIn: Easing = [0.4, 0, 1, 1]

/** Swiss UI — snappy state changes */
export const easeSnap: Easing = [0.2, 0, 0, 1]

/** In-out for overlays */
export const easeInOut: Easing = [0.45, 0, 0.55, 1]

export const easingCss = {
  editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  snap: 'cubic-bezier(0.2, 0, 0, 1)',
  inOut: 'cubic-bezier(0.45, 0, 0.55, 1)',
} as const
