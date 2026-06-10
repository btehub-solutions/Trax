import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand
        accent: '#C84B31',
        'accent-hover': '#A93B24',
        // Semantic tokens (mapped to CSS vars)
        bg:         'var(--bg)',
        'bg-alt':   'var(--bg-alt)',
        fg:         'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-subtle':'var(--fg-subtle)',
        border:     'var(--border)',
        'card-bg':  'var(--card-bg)',
        'card-border': 'var(--card-border)',
        'nav-bg':   'var(--nav-bg)',
        'footer-bg':'var(--footer-bg)',
      },
      fontFamily: {
        display: ['var(--font-oxanium)', 'Oxanium', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        sans:    ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
      },
      boxShadow: {
        sm:    'var(--shadow-sm)',
        md:    'var(--shadow-md)',
        lg:    'var(--shadow-lg)',
        hover: 'var(--shadow-hover)',
      },
      animation: {
        ticker:     'ticker 28s linear infinite',
        'fade-in':  'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
