/**
 * Trax Brand Color System
 * Primary: #E7040D
 *
 * Source of truth for brand palette + semantic tokens.
 * CSS variables are defined in brand.css and consumed via Tailwind + legacy aliases.
 */

export const brandPalette = {
  50: '#FFF0F0',
  100: '#FFDEDE',
  200: '#FFC2C2',
  300: '#FF9494',
  400: '#FF4A4A',
  500: '#E7040D',
  600: '#C9030B',
  700: '#A30209',
  800: '#7D0207',
  900: '#560104',
  950: '#2F0102',
} as const

export type BrandScale = keyof typeof brandPalette

export const brandSemantic = {
  /** Primary brand color — logos, CTAs, key accents */
  primary: brandPalette[500],
  /** Hover state for primary actions */
  primaryHover: brandPalette[600],
  /** Active / pressed state */
  primaryActive: brandPalette[700],
  /** Light tint backgrounds */
  primarySubtle: brandPalette[50],
  /** Translucent brand wash — badges, highlights */
  primaryMuted: 'rgba(231, 4, 13, 0.12)',
  primaryMutedStrong: 'rgba(231, 4, 13, 0.20)',
  /** Brand-tinted borders */
  primaryBorder: 'rgba(231, 4, 13, 0.25)',
  primaryBorderSubtle: 'rgba(231, 4, 13, 0.12)',
  /** Brighter red for text/icons on dark surfaces (WCAG AA on #111) */
  onDark: '#FF3333',
  onDarkHover: '#FF5555',
  /** Theme-aware text accent — primary on light, onDark on dark */
  textAccent: brandPalette[500],
  textAccentHover: brandPalette[600],
  /** Focus ring */
  focusRing: 'rgba(231, 4, 13, 0.45)',
  /** Elevation / glow shadows */
  shadow: 'rgba(231, 4, 13, 0.35)',
  shadowSm: 'rgba(231, 4, 13, 0.15)',
  /** Brand gradients */
  gradient: `linear-gradient(135deg, ${brandPalette[500]} 0%, ${brandPalette[800]} 100%)`,
  gradientSubtle:
    'linear-gradient(135deg, rgba(231, 4, 13, 0.18) 0%, transparent 70%)',
  /** Dot-grid / decorative patterns */
  dotGrid: 'rgba(231, 4, 13, 0.18)',
} as const

/** Maps semantic tokens to CSS custom property names */
export const brandCssVars = {
  // Scale
  '--brand-50': brandPalette[50],
  '--brand-100': brandPalette[100],
  '--brand-200': brandPalette[200],
  '--brand-300': brandPalette[300],
  '--brand-400': brandPalette[400],
  '--brand-500': brandPalette[500],
  '--brand-600': brandPalette[600],
  '--brand-700': brandPalette[700],
  '--brand-800': brandPalette[800],
  '--brand-900': brandPalette[900],
  '--brand-950': brandPalette[950],
  // Semantic
  '--brand-primary': brandSemantic.primary,
  '--brand-primary-hover': brandSemantic.primaryHover,
  '--brand-primary-active': brandSemantic.primaryActive,
  '--brand-primary-subtle': brandSemantic.primarySubtle,
  '--brand-primary-muted': brandSemantic.primaryMuted,
  '--brand-primary-muted-strong': brandSemantic.primaryMutedStrong,
  '--brand-primary-border': brandSemantic.primaryBorder,
  '--brand-primary-border-subtle': brandSemantic.primaryBorderSubtle,
  '--brand-on-dark': brandSemantic.onDark,
  '--brand-on-dark-hover': brandSemantic.onDarkHover,
  '--brand-text-accent': brandSemantic.textAccent,
  '--brand-text-accent-hover': brandSemantic.textAccentHover,
  '--brand-focus-ring': brandSemantic.focusRing,
  '--brand-shadow': brandSemantic.shadow,
  '--brand-shadow-sm': brandSemantic.shadowSm,
  '--brand-gradient': brandSemantic.gradient,
  '--brand-gradient-subtle': brandSemantic.gradientSubtle,
  '--brand-dot-grid': brandSemantic.dotGrid,
} as const

export type BrandCssVar = keyof typeof brandCssVars
