import { forwardRef } from 'react'

export type CardVariant = 'default' | 'elevated' | 'outline' | 'flat' | 'featured'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

const variantClass: Record<CardVariant, string> = {
  default: 'ds-card',
  elevated: 'ds-card ds-card--elevated ds-card--interactive',
  outline: 'ds-card ds-card--outline ds-card--interactive',
  flat: 'ds-card ds-card--flat ds-card--interactive',
  featured: 'ds-card ds-card--featured ds-card--interactive',
}

const paddingClass: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${variantClass[variant]} ${paddingClass[padding]} ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
export default Card
