'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { forwardRef, type ReactNode } from 'react'
import { Icon } from '@/design-system/icons'
import type { IconName } from '@/design-system/icons'
import {
  arrowHover,
  arrowRest,
  getButtonHover,
  getButtonTap,
  type ButtonMotionVariant,
} from '@/design-system/motion/buttonMotion'
import { useMotionEnabled } from '@/design-system/motion/hooks/useMotionTransition'

const MotionLink = motion.create(Link)

type ButtonSize = 'sm' | 'md' | 'lg'

type NativeButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'id' | 'name' | 'value' | 'autoFocus' | 'tabIndex' | 'form' | 'title' | 'aria-label'
>

export interface MotionButtonProps extends NativeButtonProps {
  variant?: ButtonMotionVariant
  size?: ButtonSize
  arrow?: boolean
  arrowIcon?: IconName
  href?: string
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLElement>
  children: ReactNode
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'ds-btn--sm',
  md: 'ds-btn--md',
  lg: 'ds-btn--lg',
}

const variantClass: Record<ButtonMotionVariant, string> = {
  primary: 'ds-btn--primary',
  outline: 'ds-btn--outline',
  ghost: 'ds-btn--ghost',
  inverse: 'ds-btn--inverse',
}

function useButtonMotionProps(variant: ButtonMotionVariant, disabled?: boolean) {
  const motionOn = useMotionEnabled()

  return {
    motionOn,
    motionProps: {
      initial: false as const,
      animate: 'rest' as const,
      whileHover: !disabled && motionOn ? ('hover' as const) : undefined,
      whileTap: !disabled && motionOn ? getButtonTap() : undefined,
      variants: {
        rest: {},
        hover: getButtonHover(variant, !motionOn),
      },
    },
  }
}

function ButtonContent({
  children,
  arrow,
  arrowIcon = 'arrow-right',
  motionOn,
}: {
  children: ReactNode
  arrow?: boolean
  arrowIcon?: IconName
  motionOn: boolean
}) {
  if (!arrow) return <>{children}</>

  return (
    <>
      <span className="ds-btn__label">{children}</span>
      <motion.span
        className="ds-btn__arrow"
        aria-hidden
        variants={{
          rest: arrowRest,
          hover: motionOn ? arrowHover : arrowRest,
        }}
      >
        <Icon name={arrowIcon} size="sm" />
      </motion.span>
    </>
  )
}

const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      arrow = false,
      arrowIcon = 'arrow-right',
      href,
      className = '',
      disabled,
      children,
      type = 'button',
      onClick,
      id,
      name,
      value,
      autoFocus,
      tabIndex,
      form,
      title,
      'aria-label': ariaLabel,
    },
    ref,
  ) => {
    const classes = ['ds-btn', variantClass[variant], sizeClass[size], className]
      .filter(Boolean)
      .join(' ')
    const { motionOn, motionProps } = useButtonMotionProps(variant, disabled)

    if (href && !disabled) {
      return (
        <MotionLink
          href={href}
          className={classes}
          onClick={onClick}
          id={id}
          title={title}
          aria-label={ariaLabel}
          {...motionProps}
        >
          <ButtonContent arrow={arrow} arrowIcon={arrowIcon} motionOn={motionOn}>
            {children}
          </ButtonContent>
        </MotionLink>
      )
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        className={classes}
        onClick={onClick}
        id={id}
        name={name}
        value={value}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        form={form}
        title={title}
        aria-label={ariaLabel}
        {...motionProps}
      >
        <ButtonContent arrow={arrow} arrowIcon={arrowIcon} motionOn={motionOn}>
          {children}
        </ButtonContent>
      </motion.button>
    )
  },
)

MotionButton.displayName = 'MotionButton'

export default MotionButton
