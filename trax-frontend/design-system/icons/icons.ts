/**
 * Trax Iconography Tokens
 * Hugeicons — Stroke Rounded (free pack)
 */

export const iconSizes = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const

export type IconSize = keyof typeof iconSizes

export const iconTokens = {
  strokeWidth: 1.75,
  color: 'currentColor',
} as const

/** Semantic icon names — map to Hugeicons in icons.tsx */
export const iconNames = [
  'search',
  'menu',
  'close',
  'sun',
  'moon',
  'arrow-right',
  'arrow-left',
  'chevron-down',
  'mail',
  'check-circle',
  'globe',
  'calendar',
  'location',
  'temperature',
  'clock',
  'twitter',
] as const

export type IconName = (typeof iconNames)[number]
