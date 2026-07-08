'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { getButtonTap, iconButtonHover } from '@/design-system/motion/buttonMotion'
import { useMotionEnabled } from '@/design-system/motion/hooks/useMotionTransition'

type NativeIconButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | 'id'
  | 'onClick'
  | 'disabled'
  | 'aria-label'
  | 'aria-expanded'
  | 'aria-controls'
  | 'type'
>

export interface MotionIconButtonProps extends NativeIconButtonProps {
  className?: string
  children: React.ReactNode
  softTap?: boolean
}

const MotionIconButton = forwardRef<HTMLButtonElement, MotionIconButtonProps>(
  (
    {
      className = '',
      disabled,
      children,
      softTap = true,
      onClick,
      id,
      type = 'button',
      'aria-label': ariaLabel,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,
    },
    ref,
  ) => {
    const motionOn = useMotionEnabled()

    return (
      <motion.button
        ref={ref}
        type={type}
        id={id}
        disabled={disabled}
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        whileHover={!disabled && motionOn ? iconButtonHover : undefined}
        whileTap={!disabled && motionOn ? getButtonTap(false, softTap) : undefined}
      >
        {children}
      </motion.button>
    )
  },
)

MotionIconButton.displayName = 'MotionIconButton'

export default MotionIconButton
