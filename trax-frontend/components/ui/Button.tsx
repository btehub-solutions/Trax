'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean
}

const sizeStyles = {
  sm: { padding: '8px 16px', fontSize: '13px' },
  md: { padding: '12px 24px', fontSize: '14px' },
  lg: { padding: '16px 32px', fontSize: '15px' },
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', disabled, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'var(--font-dm-sans)',
      fontWeight: 600,
      letterSpacing: '0.01em',
      borderRadius: '8px',
      border: '2px solid transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.45 : 1,
      outline: 'none',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      ...sizeStyles[size],
    }

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: 'var(--accent)',
        color: '#FFFFFF',
        borderColor: 'var(--accent)',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--fg)',
        borderColor: 'var(--border)',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--fg-muted)',
        borderColor: 'transparent',
      },
    }

    return (
      <motion.button
        ref={ref as any}
        whileHover={
          !disabled
            ? variant === 'primary'
              ? { backgroundColor: 'var(--accent-hover)', borderColor: 'var(--accent-hover)', y: -1 }
              : variant === 'outline'
              ? { borderColor: 'var(--accent)', color: 'var(--accent)', y: -1 }
              : { color: 'var(--accent)' }
            : {}
        }
        whileTap={!disabled ? { scale: 0.97 } : {}}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{ ...baseStyles, ...variantStyles[variant] }}
        disabled={disabled}
        className={className}
        {...(props as any)}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
