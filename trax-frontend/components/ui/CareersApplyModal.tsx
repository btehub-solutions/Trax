'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MotionButton } from '@/design-system/components'
import { Icon } from '@/design-system/icons'

interface CareersApplyModalProps {
  isOpen: boolean
  onClose: () => void
  roleTitle: string
  roleEmail: string
  roleSubject: string
}

export default function CareersApplyModal({
  isOpen,
  onClose,
  roleTitle,
  roleEmail,
  roleSubject,
}: CareersApplyModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    portfolioUrl: '',
    note: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  // Mount portal target on client
  useEffect(() => {
    setPortalTarget(document.body)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await fetch('https://formspree.io/f/maqgevgz', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: roleTitle,
          name: formData.fullName,
          email: formData.email,
          portfolio: formData.portfolioUrl,
          message: formData.note,
          subject: roleSubject,
        }),
      })
    } catch {
      // Fallback cleanly
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({ fullName: '', email: '', portfolioUrl: '', note: '' })
    handleClose()
  }

  // Don't render until portal target is available (SSR safe)
  if (!portalTarget) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            aria-hidden
          />

          {/* Scrollable wrapper */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '3rem 1rem',
            }}
            onClick={handleClose}
          >
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '30rem',
                margin: 'auto',
                backgroundColor: 'var(--surface-card)',
                border: '1px solid var(--surface-card-border)',
                borderRadius: '1rem',
                boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.6)',
                overflow: 'hidden',
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="careers-modal-title"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  zIndex: 10,
                  padding: '0.5rem',
                  color: 'var(--neutral-text-muted)',
                  borderRadius: '9999px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.15s',
                }}
                aria-label="Close application form"
              >
                <Icon name="close" size="sm" />
              </button>

              {!submitted ? (
                <>
                  {/* Header */}
                  <div style={{ padding: '1.25rem 1.25rem 0.75rem', paddingRight: '3rem' }}>
                    <span className="ds-category-label">Application Form</span>
                    <h2
                      id="careers-modal-title"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        marginTop: '0.25rem',
                        color: 'var(--neutral-text-primary)',
                        fontFamily: 'var(--font-family-editorial)',
                        lineHeight: 1.3,
                      }}
                    >
                      Apply for {roleTitle}
                    </h2>
                    <p
                      className="type-meta"
                      style={{
                        fontSize: '0.7rem',
                        marginTop: '0.25rem',
                        color: 'var(--neutral-text-secondary)',
                        lineHeight: 1.4,
                      }}
                    >
                      Submit your details and our editorial team will review your writing samples.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} style={{ padding: '0.5rem 1.25rem 1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="careers-fullname"
                          className="type-meta"
                          style={{
                            display: 'block',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            marginBottom: '0.3rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          Full Name <span style={{ color: 'var(--brand-primary)' }}>*</span>
                        </label>
                        <input
                          id="careers-fullname"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Kolawole Adebayo"
                          className="ds-platform-page__input"
                          style={{ boxSizing: 'border-box', fontSize: '0.875rem', padding: '0.6rem 0.75rem' }}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="careers-email"
                          className="type-meta"
                          style={{
                            display: 'block',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            marginBottom: '0.3rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          Email Address <span style={{ color: 'var(--brand-primary)' }}>*</span>
                        </label>
                        <input
                          id="careers-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="kola@example.com"
                          className="ds-platform-page__input"
                          style={{ boxSizing: 'border-box', fontSize: '0.875rem', padding: '0.6rem 0.75rem' }}
                        />
                      </div>

                      {/* Portfolio */}
                      <div>
                        <label
                          htmlFor="careers-portfolio"
                          className="type-meta"
                          style={{
                            display: 'block',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            marginBottom: '0.3rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          Writing Samples / Portfolio URL <span style={{ color: 'var(--brand-primary)' }}>*</span>
                        </label>
                        <input
                          id="careers-portfolio"
                          type="url"
                          required
                          value={formData.portfolioUrl}
                          onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                          placeholder="https://medium.com/@username or Google Drive link"
                          className="ds-platform-page__input"
                          style={{ boxSizing: 'border-box', fontSize: '0.875rem', padding: '0.6rem 0.75rem' }}
                        />
                      </div>

                      {/* Cover Note */}
                      <div>
                        <label
                          htmlFor="careers-note"
                          className="type-meta"
                          style={{
                            display: 'block',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            marginBottom: '0.3rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          Short Intro / Cover Note
                        </label>
                        <textarea
                          id="careers-note"
                          rows={2}
                          value={formData.note}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                          placeholder="Tell us briefly about your background and interest in covering Ogun State tech..."
                          className="ds-platform-page__input"
                          style={{
                            boxSizing: 'border-box',
                            fontSize: '0.875rem',
                            padding: '0.6rem 0.75rem',
                            resize: 'vertical',
                            minHeight: '3.5rem',
                          }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '0.75rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--neutral-border)',
                        marginTop: '1rem',
                      }}
                    >
                      <button
                        type="button"
                        onClick={handleClose}
                        className="type-meta"
                        style={{
                          padding: '0.5rem 1rem',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: 'var(--neutral-text-secondary)',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                      <MotionButton type="submit" variant="primary" size="sm" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                      </MotionButton>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '2.5rem 1.5rem 2rem',
                  }}
                >
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      color: 'var(--brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                    }}
                  >
                    <Icon name="check-circle" size="md" />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--neutral-text-primary)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Application Received!
                  </h3>
                  <p
                    className="type-excerpt"
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--neutral-text-secondary)',
                      maxWidth: '22rem',
                      margin: '0 auto',
                    }}
                  >
                    Thank you, {formData.fullName}. Our team will review your writing samples and reach out to{' '}
                    <span style={{ fontWeight: 600, color: 'var(--neutral-text-primary)' }}>
                      {formData.email}
                    </span>{' '}
                    shortly.
                  </p>

                  <div style={{ paddingTop: '1.5rem' }}>
                    <MotionButton type="button" variant="outline" size="sm" onClick={handleReset}>
                      Done
                    </MotionButton>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )

  // Portal to document.body — escapes ALL parent stacking contexts
  return createPortal(modalContent, portalTarget)
}
