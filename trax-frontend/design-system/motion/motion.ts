/**
 * Trax Motion Tokens
 * Editorial restraint · Swiss snap · one dramatic homepage beat
 */

export const motionDuration = {
  instant: 0.1,
  fast: 0.15,
  base: 0.25,
  moderate: 0.4,
  editorial: 0.55,
  slow: 0.7,
  dramatic: 0.85,
} as const

export const motionDelay = {
  none: 0,
  xs: 0.05,
  sm: 0.1,
  md: 0.15,
  lg: 0.25,
} as const

export const motionStagger = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
  section: 0.16,
} as const

export const motionDistance = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const

export const motionCssVars = {
  '--motion-instant': `${motionDuration.instant * 1000}ms`,
  '--motion-fast': `${motionDuration.fast * 1000}ms`,
  '--motion-base': `${motionDuration.base * 1000}ms`,
  '--motion-moderate': `${motionDuration.moderate * 1000}ms`,
  '--motion-editorial': `${motionDuration.editorial * 1000}ms`,
  '--motion-slow': `${motionDuration.slow * 1000}ms`,
  '--motion-dramatic': `${motionDuration.dramatic * 1000}ms`,
  '--motion-stagger-tight': `${motionStagger.tight * 1000}ms`,
  '--motion-stagger-base': `${motionStagger.base * 1000}ms`,
  '--motion-stagger-loose': `${motionStagger.loose * 1000}ms`,
} as const

export type MotionDuration = keyof typeof motionDuration
export type MotionStagger = keyof typeof motionStagger
