import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/server-api'

export const revalidate = 86400

export async function GET() {
  const content = `Contact: mailto:traxnewsng@gmail.com
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: ${SITE_URL}/.well-known/security.txt
Policy: ${SITE_URL}/policy
Acknowledgments: ${SITE_URL}/about
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
