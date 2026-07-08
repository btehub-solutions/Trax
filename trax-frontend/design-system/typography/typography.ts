/**

 * Trax Typography System

 *

 * Editorial: Fraunces — hero, article titles, reader body

 * UI:        Instrument Sans — nav, cards, meta, buttons, chrome

 * Accent:    Space Mono — masthead watermark, category labels, section markers

 */



export const fontFamilies = {

  editorial: "var(--font-fraunces), 'Fraunces', Georgia, 'Times New Roman', serif",

  ui: "var(--font-instrument-sans), 'Instrument Sans', system-ui, -apple-system, sans-serif",

  mono: "var(--font-space-mono), 'Space Mono', ui-monospace, monospace",

  accent: "var(--font-space-mono), 'Space Mono', ui-monospace, monospace",

} as const



/** Type scale (rem) */

export const fontSize = {

  xs: '0.75rem',     // 12px — captions, legal

  sm: '0.875rem',    // 14px — meta, labels

  base: '1rem',      // 16px — UI body

  lg: '1.125rem',    // 18px — excerpts, article body min

  xl: '1.25rem',     // 20px — card titles

  '2xl': '1.5rem',   // 24px — section heads

  '3xl': '1.875rem', // 30px — page titles

  '4xl': '2.25rem',  // 36px — hero secondary

  '5xl': '3rem',     // 48px — hero primary

  display: 'clamp(2.25rem, 5vw, 3.75rem)',

  watermark: 'clamp(4rem, 12vw, 9rem)',

} as const



export const lineHeight = {

  tight: '1.1',

  snug: '1.25',

  normal: '1.5',

  relaxed: '1.65',

  prose: '1.75',

} as const



export const fontWeight = {

  regular: '400',

  medium: '500',

  semibold: '600',

  bold: '700',

} as const



export const letterSpacing = {

  tight: '-0.02em',

  normal: '0',

  wide: '0.04em',

  wider: '0.08em',

  label: '0.1em',

} as const


