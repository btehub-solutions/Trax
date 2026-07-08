/**
 * Trax Surface Tokens
 * Layered UI surfaces — page, cards, nav, footer, panels
 */

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
  card: '8px',
} as const

export const surfaceLight = {
  page: '#FFFFFF',
  section: '#FAFAFA',
  card: '#FFFFFF',
  cardHover: '#FAFAFA',
  nav: '#E7040D',
  navText: '#FFFFFF',
  footer: '#FAFAFA',
  panel: '#F4F4F5',
  input: '#F4F4F5',
  overlay: 'rgba(9, 9, 11, 0.45)',
  inverse: '#18181B',
  inverseText: '#FFFFFF',

  cardBorder: '#E4E4E7',
  cardBorderHover: '#D4D4D8',
  divider: '#E4E4E7',
} as const

export const surfaceDark = {
  page: '#111111',
  section: '#1A1A1A',
  card: '#242424',
  cardHover: '#2A2A2A',
  nav: '#E7040D',
  navText: '#FFFFFF',
  footer: '#1A1A1A',
  panel: '#1F1F1F',
  input: '#1F1F1F',
  overlay: 'rgba(0, 0, 0, 0.65)',
  inverse: '#FFFFFF',
  inverseText: '#111111',

  cardBorder: '#161616',
  cardBorderHover: '#222222',
  divider: '#161616',
} as const
