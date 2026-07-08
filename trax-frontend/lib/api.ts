import type { Article } from './articles';
import { mapApiArticle } from './mapArticle';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface RequestOptions extends RequestInit {
  body?: any;
}

export async function fetchApi(endpoint: string, options: RequestOptions = {}) {
  const isClient = typeof window !== 'undefined';
  const headers = new Headers(options.headers || {});

  // Add JSON content type if body is an object and not FormData
  if (options.body && !(options.body instanceof FormData)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    options.body = JSON.stringify(options.body);
  }

  // Attach JWT token from localStorage if on client
  if (isClient) {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errorJson = await response.json();
      errorMsg = errorJson.message || errorMsg;
    } catch (_) {
      errorMsg = response.statusText || errorMsg;
    }
    throw new Error(errorMsg);
  }

  // Handle empty responses
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  get: (endpoint: string, options?: RequestOptions) => fetchApi(endpoint, { ...options, method: 'GET' }),
  post: (endpoint: string, body?: any, options?: RequestOptions) => fetchApi(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint: string, body?: any, options?: RequestOptions) => fetchApi(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint: string, body?: any, options?: RequestOptions) => fetchApi(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint: string, options?: RequestOptions) => fetchApi(endpoint, { ...options, method: 'DELETE' }),
};

/** Server-side article fetch with ISR — use in RSC pages */
export async function getDbArticles(categorySlug?: string): Promise<Article[]> {
  const { fetchArticles } = await import('./server-api');
  return fetchArticles(
    categorySlug ? { category: categorySlug, limit: 100 } : { limit: 100 },
  );
}

/** Fetch and merge articles across multiple category slugs (deduped). */
export async function getDbArticlesBySlugs(slugs: string[]): Promise<Article[]> {
  const { fetchArticles } = await import('./server-api');
  const lists = await Promise.all(slugs.map((slug) => fetchArticles({ category: slug, limit: 100 })));
  const seen = new Set<string>();
  const merged: Article[] = [];

  for (const list of lists) {
    for (const article of list) {
      if (seen.has(article.id)) continue;
      seen.add(article.id);
      merged.push(article);
    }
  }

  return merged;
}

/** Quick health-check – resolves if the API responds, rejects otherwise. */
export async function getApiHealth(): Promise<void> {
  const res = await fetch(`${BASE_URL}/health`, { method: 'GET' });
  if (!res.ok) throw new Error('API health-check failed');
}

// Re-export for client-side fallbacks
export { mapApiArticle };
export type { Article };
