/**
 * Trax Neutral Color System
 * Backgrounds + typography for light and dark modes.
 *
 * Light mode: clean editorial white (newsflash-inspired)
 * Dark mode: neutral charcoal — no burgundy wash
 */

/** Raw neutral scale — zinc-inspired, brand-agnostic */
export const neutralPalette = {
  50: '#FAFAFA',
  100: '#F4F4F5',
  200: '#E4E4E7',
  300: '#D4D4D8',
  400: '#A1A1AA',
  500: '#71717A',
  600: '#52525B',
  700: '#3F3F46',
  800: '#27272A',
  900: '#18181B',
  950: '#09090B',
} as const

export type NeutralScale = keyof typeof neutralPalette

/** Light mode semantic tokens */
export const neutralLight = {
  bg: '#FFFFFF',
  bgSubtle: neutralPalette[50],
  bgMuted: neutralPalette[100],
  bgElevated: '#FFFFFF',
  bgSunken: neutralPalette[100],
  bgInverse: neutralPalette[900],

  textPrimary: neutralPalette[950],
  textSecondary: neutralPalette[700],
  textMuted: neutralPalette[500],
  textSubtle: neutralPalette[400],
  textInverse: '#FFFFFF',

  border: neutralPalette[200],
  borderSubtle: neutralPalette[100],
  borderStrong: neutralPalette[300],

  shadowSm: '0 1px 2px rgba(9, 9, 11, 0.04), 0 1px 3px rgba(9, 9, 11, 0.06)',
  shadowMd: '0 4px 12px rgba(9, 9, 11, 0.06), 0 2px 4px rgba(9, 9, 11, 0.04)',
  shadowLg: '0 12px 32px rgba(9, 9, 11, 0.08), 0 4px 12px rgba(9, 9, 11, 0.04)',
  shadowHover: '0 16px 40px rgba(9, 9, 11, 0.10), 0 6px 16px rgba(9, 9, 11, 0.06)',

  scrollbarTrack: neutralPalette[100],
  scrollbarThumb: neutralPalette[300],
  scrollbarThumbHover: neutralPalette[400],
} as const

/** Dark mode semantic tokens — Newsplate / BBC charcoal */
export const neutralDark = {
  bg: '#111111',
  bgSubtle: '#1A1A1A',
  bgMuted: '#1F1F1F',
  bgElevated: '#242424',
  bgSunken: '#0A0A0A',
  bgInverse: '#FFFFFF',

  textPrimary: neutralPalette[50],
  textSecondary: neutralPalette[300],
  textMuted: neutralPalette[400],
  textSubtle: neutralPalette[500],
  textInverse: neutralPalette[950],

  border: '#161616',
  borderSubtle: '#121212',
  borderStrong: '#222222',

  shadowSm: '0 1px 2px rgba(0, 0, 0, 0.40)',
  shadowMd: '0 8px 24px rgba(0, 0, 0, 0.50)',
  shadowLg: '0 16px 48px rgba(0, 0, 0, 0.60)',
  shadowHover: '0 20px 56px rgba(0, 0, 0, 0.70)',

  scrollbarTrack: '#111111',
  scrollbarThumb: '#333333',
  scrollbarThumbHover: '#444444',
} as const

export const neutralCssVars = {
  '--neutral-50': neutralPalette[50],
  '--neutral-100': neutralPalette[100],
  '--neutral-200': neutralPalette[200],
  '--neutral-300': neutralPalette[300],
  '--neutral-400': neutralPalette[400],
  '--neutral-500': neutralPalette[500],
  '--neutral-600': neutralPalette[600],
  '--neutral-700': neutralPalette[700],
  '--neutral-800': neutralPalette[800],
  '--neutral-900': neutralPalette[900],
  '--neutral-950': neutralPalette[950],
} as const

export type NeutralCssVar = keyof typeof neutralCssVars
