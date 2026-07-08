/**
 * Trax Shadow Tokens
 * Editorial: minimal on light (CNN/BBC), depth on dark
 */

export const shadowLight = {
  xs: '0 1px 2px rgba(9, 9, 11, 0.03)',
  sm: '0 1px 2px rgba(9, 9, 11, 0.04), 0 1px 3px rgba(9, 9, 11, 0.06)',
  md: '0 4px 12px rgba(9, 9, 11, 0.06), 0 2px 4px rgba(9, 9, 11, 0.04)',
  lg: '0 12px 32px rgba(9, 9, 11, 0.08), 0 4px 12px rgba(9, 9, 11, 0.04)',
  xl: '0 20px 48px rgba(9, 9, 11, 0.10), 0 8px 20px rgba(9, 9, 11, 0.06)',
  card: '0 1px 3px rgba(9, 9, 11, 0.04)',
  cardHover: '0 8px 24px rgba(9, 9, 11, 0.08), 0 2px 8px rgba(9, 9, 11, 0.04)',
  nav: '0 1px 0 rgba(9, 9, 11, 0.06)',
  dropdown: '0 8px 30px rgba(9, 9, 11, 0.12), 0 2px 8px rgba(9, 9, 11, 0.06)',
  none: 'none',
} as const

export const shadowDark = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.30)',
  sm: '0 1px 2px rgba(0, 0, 0, 0.40)',
  md: '0 8px 24px rgba(0, 0, 0, 0.50)',
  lg: '0 16px 48px rgba(0, 0, 0, 0.60)',
  xl: '0 24px 64px rgba(0, 0, 0, 0.70)',
  card: '0 2px 8px rgba(0, 0, 0, 0.35)',
  cardHover: '0 12px 32px rgba(0, 0, 0, 0.50)',
  nav: '0 1px 0 #2A2A2A',
  dropdown: '0 16px 48px rgba(0, 0, 0, 0.60)',
  none: 'none',
} as const
