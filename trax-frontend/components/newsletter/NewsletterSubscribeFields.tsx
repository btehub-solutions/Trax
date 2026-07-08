'use client'

import { useState } from 'react'
import { MotionButton } from '@/design-system/components'
import {
  NEWSLETTER_ALREADY_TEXT,
  NEWSLETTER_ALREADY_TITLE,
  NEWSLETTER_PENDING_TEXT,
  NEWSLETTER_PENDING_TITLE,
  subscribeToNewsletter,
} from '@/lib/newsletter'

export interface NewsletterSubscribeFieldsProps {
  id: string
  inputClassName?: string
  errorClassName?: string
  successClassName?: string
  buttonClassName?: string
  submitLabel?: string
  loadingLabel?: string
  fieldsClassName?: string
  formClassName?: string
  showHint?: boolean
  hintClassName?: string
  buttonVariant?: 'primary' | 'inverse'
  buttonSize?: 'sm' | 'md' | 'lg'
  fullWidthButton?: boolean
}

export function useNewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'pending' | 'already'>('idle')
  const [message, setMessage] = useState('')

  const reset = () => {
    setEmail('')
    setError('')
    setStatus('idle')
    setMessage('')
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await subscribeToNewsletter(email)

    if (result.status === 'error') {
      setError(result.message)
      setLoading(false)
      return
    }

    setStatus(result.status)
    setMessage(result.message)
    setLoading(false)
  }

  return {
    email,
    setEmail,
    loading,
    error,
    status,
    message,
    reset,
    handleSubmit,
    setError,
  }
}

export default function NewsletterSubscribeFields({
  id,
  inputClassName = 'ds-platform-page__input',
  errorClassName = 'ds-platform-page__error',
  successClassName = 'ds-platform-page__success',
  buttonClassName = '',
  submitLabel = 'Subscribe',
  loadingLabel = 'Sending link…',
  fieldsClassName = '',
  formClassName = 'ds-platform-page__form',
  showHint = false,
  hintClassName = 'type-meta',
  buttonVariant = 'primary',
  buttonSize,
  fullWidthButton = true,
}: NewsletterSubscribeFieldsProps) {
  const {
    email,
    setEmail,
    loading,
    error,
    status,
    message,
    handleSubmit,
    setError,
  } = useNewsletterSubscribe()

  if (status === 'pending' || status === 'already') {
    const title = status === 'already' ? NEWSLETTER_ALREADY_TITLE : NEWSLETTER_PENDING_TITLE
    const text = status === 'already' ? NEWSLETTER_ALREADY_TEXT : message || NEWSLETTER_PENDING_TEXT

    return (
      <div className={successClassName}>
        <p className="ds-newsletter-card__success-title">{title}</p>
        <p className="ds-newsletter-card__success-text type-meta">{text}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className={fieldsClassName}>
        <input
          id={id}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          placeholder="you@company.com"
          className={inputClassName}
        />
        <MotionButton
          type="submit"
          variant={buttonVariant}
          size={buttonSize}
          disabled={loading}
          arrow={buttonVariant === 'inverse'}
          className={`${fullWidthButton ? 'w-full' : ''} ${buttonClassName}`.trim()}
        >
          {loading ? loadingLabel : submitLabel}
        </MotionButton>
      </div>
      {error && <p className={errorClassName}>{error}</p>}
      {showHint && (
        <p className={hintClassName}>
          Free forever. One email per week.{' '}
          <a href="/newsletter/unsubscribe" className="ds-accent-link">
            Unsubscribe anytime
          </a>
          .
        </p>
      )}
    </form>
  )
}
