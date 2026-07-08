/**
 * Trax Spacing System
 * 4px base grid — calm editorial rhythm
 */

export const spaceScale = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const

export const spaceSemantic = {
  sectionY: '3.5rem',
  sectionYMd: '4.5rem',
  containerX: '1.5rem',
  containerXMd: '2rem',
  containerXLg: '3rem',
  gridGap: '1.5rem',
  gridGapLg: '2rem',
  stackSm: '1rem',
  stackMd: '1.5rem',
  stackLg: '2rem',
  inlineSm: '0.5rem',
  inlineMd: '0.75rem',
} as const
