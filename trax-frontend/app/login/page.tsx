'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MotionButton } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import { BASE_URL } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
      document.cookie = `token=${data.access_token}; path=/; max-age=604800; SameSite=Lax`

      router.push('/dashboard')
      router.refresh()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please check your credentials.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ds-login-page">
      <div className="ds-login-page__visual" aria-hidden>
        <img
          src="/images/trax_login_visual.png.png"
          alt=""
          className="ds-login-page__visual-img"
        />
        <Link href="/" className="ds-login-page__back ds-login-page__back--desktop">
          <Icon name="arrow-left" size="xs" aria-hidden />
          Back to home
        </Link>

      </div>

      <div className="ds-login-page__panel">
        <Link href="/" className="ds-login-page__back ds-login-page__back--mobile">
          <Icon name="arrow-left" size="xs" aria-hidden />
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="ds-login-page__card"
        >
          <div className="ds-login-page__header">
            <Link href="/" className="ds-login-page__brand">
              <span className="ds-login-page__brand-accent">Trax</span>
            </Link>
            <h2 className="ds-login-page__title">Welcome back</h2>
            <p className="type-meta">Sign in to manage articles, newsletter, and ad units</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ds-login-page__error"
              role="alert"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="ds-login-page__form">
            <div className="ds-login-page__field">
              <label htmlFor="email">Email address</label>
              <div className="ds-login-page__input-wrap">
                <Icon name="mail" size="sm" className="ds-login-page__input-icon" aria-hidden />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@trax.ng"
                  className="ds-platform-page__input ds-login-page__input"
                />
              </div>
            </div>

            <div className="ds-login-page__field">
              <label htmlFor="password">Password</label>
              <div className="ds-login-page__input-wrap">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="ds-platform-page__input ds-login-page__input"
                />
              </div>
            </div>

            <MotionButton type="submit" variant="primary" disabled={loading} className="w-full">
              {loading ? 'Signing in…' : 'Sign in'}
            </MotionButton>
          </form>

          <p className="type-meta ds-login-page__secure">
            <Icon name="check-circle" size="xs" aria-hidden />
            Secured session encryption enabled
          </p>
        </motion.div>
      </div>
    </div>
  )
}
