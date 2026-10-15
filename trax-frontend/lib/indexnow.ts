import { SITE_URL } from './server-api'

export const INDEXNOW_KEY = 'd5f39e8a71b24c8091a4e27f98c61a3d'

/**
 * Pings the IndexNow protocol to instantly notify Microsoft Bing, Copilot, Seznam,
 * and partner search engines when content is created or updated.
 */
export async function submitToIndexNow(urls: string[]): Promise<boolean> {
  if (!urls.length) return false

  try {
    const host = new URL(SITE_URL).hostname
    const endpoint = 'https://api.indexnow.org/indexnow'
    const fullUrls = urls.map((u) => (u.startsWith('http') ? u : `${SITE_URL}${u.startsWith('/') ? u : `/${u}`}`))

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: fullUrls,
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    return res.ok || res.status === 200 || res.status === 202
  } catch (err) {
    // Non-fatal: ensure background ping failures never break application flow
    console.warn('[IndexNow] Ping failed:', err)
    return false
  }
}
