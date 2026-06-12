import { articles as mockArticles, Article } from './articles';
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

export async function getDbArticles(categorySlug?: string): Promise<Article[]> {
  try {
    const url = categorySlug 
      ? `/articles?category=${categorySlug}&limit=100` 
      : '/articles?limit=100';
    const json = await api.get(url);
    if (json && json.data && json.data.length > 0) {
      const dbData = json.data.map(mapApiArticle);

      return dbData;
    }
  } catch (err: any) {
    console.warn(`Backend API offline or failed, using static mock articles fallback:`, err.message || err);
  }

  // Fallback to static mock articles
  if (categorySlug) {
    // Maps categorySlug like 'funding' to matching mock category (case-insensitive)
    return mockArticles.filter((a: any) => a.category.toLowerCase() === categorySlug.toLowerCase());
  }
  return mockArticles;
}

