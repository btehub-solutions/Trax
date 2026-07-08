/**
 * Trax Semantic Color System
 * Status, editorial, and feedback colors.
 *
 * Editorial (CNN/BBC-inspired): live, breaking, sponsored
 * System: success, warning, error, info
 */

export const semanticPalette = {
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    500: '#16A34A',
    600: '#15803D',
    700: '#166534',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#D97706',
    600: '#B45309',
    700: '#92400E',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#DC2626',
    600: '#B91C1C',
    700: '#991B1B',
  },
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#2563EB',
    600: '#1D4ED8',
    700: '#1E40AF',
  },
} as const

/** Light mode semantic tokens */
export const semanticLight = {
  success: semanticPalette.success[600],
  successBg: semanticPalette.success[50],
  successBorder: '#BBF7D0',
  successText: semanticPalette.success[700],

  warning: semanticPalette.warning[600],
  warningBg: semanticPalette.warning[50],
  warningBorder: '#FDE68A',
  warningText: semanticPalette.warning[700],

  error: semanticPalette.error[600],
  errorBg: semanticPalette.error[50],
  errorBorder: '#FECACA',
  errorText: semanticPalette.error[700],

  info: semanticPalette.info[600],
  infoBg: semanticPalette.info[50],
  infoBorder: '#BFDBFE',
  infoText: semanticPalette.info[700],

  /** CNN-style live indicator */
  live: '#E7040D',
  liveBg: 'rgba(231, 4, 13, 0.08)',
  liveBorder: 'rgba(231, 4, 13, 0.20)',

  /** Breaking news — brand-aligned urgency */
  breaking: '#E7040D',
  breakingBg: 'rgba(231, 4, 13, 0.06)',
  breakingBorder: 'rgba(231, 4, 13, 0.18)',

  /** Press room / sponsored content */
  sponsored: '#7C3AED',
  sponsoredBg: '#F5F3FF',
  sponsoredBorder: '#DDD6FE',
  sponsoredText: '#5B21B6',

  /** Inline links */
  link: '#1D4ED8',
  linkHover: '#1E40AF',
} as const

/** Dark mode semantic tokens */
export const semanticDark = {
  success: '#4ADE80',
  successBg: 'rgba(22, 163, 74, 0.12)',
  successBorder: 'rgba(74, 222, 128, 0.20)',
  successText: '#86EFAC',

  warning: '#FBBF24',
  warningBg: 'rgba(217, 119, 6, 0.12)',
  warningBorder: 'rgba(251, 191, 36, 0.20)',
  warningText: '#FDE68A',

  error: '#F87171',
  errorBg: 'rgba(220, 38, 38, 0.12)',
  errorBorder: 'rgba(248, 113, 113, 0.20)',
  errorText: '#FECACA',

  info: '#60A5FA',
  infoBg: 'rgba(37, 99, 235, 0.12)',
  infoBorder: 'rgba(96, 165, 250, 0.20)',
  infoText: '#BFDBFE',

  live: '#FF3333',
  liveBg: 'rgba(255, 51, 51, 0.12)',
  liveBorder: 'rgba(255, 51, 51, 0.25)',

  breaking: '#FF3333',
  breakingBg: 'rgba(255, 51, 51, 0.10)',
  breakingBorder: 'rgba(255, 51, 51, 0.22)',

  sponsored: '#A78BFA',
  sponsoredBg: 'rgba(124, 58, 237, 0.12)',
  sponsoredBorder: 'rgba(167, 139, 250, 0.22)',
  sponsoredText: '#DDD6FE',

  link: '#60A5FA',
  linkHover: '#93C5FD',
} as const
