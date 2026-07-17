import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

const DEFAULT_SECRET = 'trax-revalidation-secret-102938'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const expectedSecret = process.env.REVALIDATION_SECRET || DEFAULT_SECRET

  if (secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  const tag = request.nextUrl.searchParams.get('tag')
  const path = request.nextUrl.searchParams.get('path')

  try {
    if (tag) {
      revalidateTag(tag)
      console.log(`[Revalidation] Purged cache tag: ${tag}`)
    }
    if (path) {
      revalidatePath(path)
      console.log(`[Revalidation] Purged cache path: ${path}`)
    }

    // Default fallback if nothing specified: revalidate everything under home
    if (!tag && !path) {
      revalidateTag('articles')
      revalidatePath('/')
      console.log('[Revalidation] Purged default cache (articles tag, root path)')
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
