import { BASE_URL } from './api'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SubscribeStatus = 'pending' | 'already' | 'error'

export interface SubscribeResult {
  status: SubscribeStatus
  message: string
}

export interface UnsubscribeResult {
  ok: boolean
  message: string
}

export interface ConfirmResult {
  ok: boolean
  message: string
  alreadyConfirmed?: boolean
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}

export function parseApiMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== 'object') return fallback
  const message = (payload as { message?: unknown }).message
  if (typeof message === 'string') return message
  if (Array.isArray(message) && message.every((item) => typeof item === 'string')) {
    return message.join(' ')
  }
  return fallback
}

async function readJsonSafe(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  const trimmed = email.trim()
  if (!trimmed) {
    return { status: 'error', message: 'Please enter your email address.' }
  }
  if (!isValidEmail(trimmed)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  try {
    const response = await fetch(`${BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmed }),
    })
    const data = await readJsonSafe(response)

    if (response.status === 409) {
      return {
        status: 'already',
        message: parseApiMessage(data, 'This email is already subscribed to the Trax briefing.'),
      }
    }

    if (response.status === 429) {
      return {
        status: 'error',
        message: 'Too many attempts. Please wait a minute and try again.',
      }
    }

    if (!response.ok) {
      return {
        status: 'error',
        message: parseApiMessage(data, 'Subscription failed. Please try again.'),
      }
    }

    return {
      status: 'pending',
      message: parseApiMessage(
        data,
        'Thanks for subscribing. Check your inbox for a confirmation link.',
      ),
    }
  } catch {
    return {
      status: 'error',
      message: 'We could not reach the server. Check your connection and try again.',
    }
  }
}

export async function confirmNewsletterSubscription(
  email: string,
  token: string,
): Promise<ConfirmResult> {
  if (!email || !token) {
    return { ok: false, message: 'This confirmation link is incomplete.' }
  }

  try {
    const params = new URLSearchParams({ email: email.trim(), token })
    const response = await fetch(`${BASE_URL}/newsletter/confirm?${params.toString()}`)
    const data = await readJsonSafe(response)

    if (!response.ok) {
      return {
        ok: false,
        message: parseApiMessage(data, 'This confirmation link is invalid or has expired.'),
      }
    }

    const payload = data as { alreadyConfirmed?: boolean; message?: string }
    return {
      ok: true,
      alreadyConfirmed: Boolean(payload?.alreadyConfirmed),
      message: parseApiMessage(
        data,
        'Your subscription is confirmed. The next Trax briefing is on its way.',
      ),
    }
  } catch {
    return {
      ok: false,
      message: 'We could not confirm your subscription. Please try again.',
    }
  }
}

export async function unsubscribeFromNewsletter(email: string): Promise<UnsubscribeResult> {
  const trimmed = email.trim()
  if (!trimmed) {
    return { ok: false, message: 'Please enter your email address.' }
  }
  if (!isValidEmail(trimmed)) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }

  try {
    const response = await fetch(`${BASE_URL}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmed }),
    })
    const data = await readJsonSafe(response)

    if (!response.ok) {
      return {
        ok: false,
        message: parseApiMessage(data, 'We could not unsubscribe that email.'),
      }
    }

    return {
      ok: true,
      message: parseApiMessage(data, 'You have been unsubscribed from the Trax briefing.'),
    }
  } catch {
    return {
      ok: false,
      message: 'We could not reach the server. Check your connection and try again.',
    }
  }
}

/** Shared success copy for pending confirmation */
export const NEWSLETTER_PENDING_TITLE = 'Check your inbox'
export const NEWSLETTER_PENDING_TEXT =
  'We sent a confirmation link. Click it to start receiving the Trax briefing.'
export const NEWSLETTER_ALREADY_TITLE = 'You are already subscribed'
export const NEWSLETTER_ALREADY_TEXT =
  'This email is already on the Trax briefing list.'
