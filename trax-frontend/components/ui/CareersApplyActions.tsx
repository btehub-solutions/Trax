'use client'

import { useState } from 'react'
import { MotionButton } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import CareersApplyModal from '@/components/ui/CareersApplyModal'

interface CareersApplyActionsProps {
  roleTitle: string
  email: string
  subject: string
}

export function CareersApplyHeaderAction({
  roleTitle,
  email,
  subject,
}: CareersApplyActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Clipboard fallback
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <MotionButton
          type="button"
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          size="sm"
          arrow
        >
          Apply for this Role
        </MotionButton>
        <button
          type="button"
          onClick={handleCopy}
          className="ds-btn ds-btn--outline ds-btn--sm text-xs inline-flex items-center gap-1.5 cursor-pointer"
          title="Copy email address to clipboard"
        >
          <Icon name={copied ? 'check-circle' : 'mail'} size="xs" aria-hidden />
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
        </button>
      </div>

      <CareersApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roleTitle={roleTitle}
        roleEmail={email}
        roleSubject={subject}
      />
    </>
  )
}

export function CareersApplyFooterAction({
  roleTitle,
  email,
  subject,
}: CareersApplyActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Clipboard fallback
    }
  }

  return (
    <>
      <div className="pt-6 border-t border-[var(--neutral-border)] flex flex-wrap items-center justify-between gap-4">
        <p className="type-meta text-xs">
          Prefer email? Send CV & writing samples directly to{' '}
          <a href={mailtoUrl} className="ds-accent-link font-medium">
            {email}
          </a>
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="text-xs type-meta hover:text-[var(--brand-primary)] inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Icon name={copied ? 'check-circle' : 'mail'} size="xs" aria-hidden />
            <span>{copied ? 'Copied!' : 'Copy Email'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="ds-accent-link text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Open Application Form</span>
            <Icon name="arrow-right" size="xs" aria-hidden />
          </button>
        </div>
      </div>

      <CareersApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roleTitle={roleTitle}
        roleEmail={email}
        roleSubject={subject}
      />
    </>
  )
}
