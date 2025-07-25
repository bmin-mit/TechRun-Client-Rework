import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { middlewareCheck } from '@/lib/data/auth'

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value

  try {
    const result = await middlewareCheck(accessToken)
    console.log('Authenticated user', result.name, result.username, 'at', request.nextUrl.pathname)
  }
  catch (e) {
    console.log('Failed to authenticate with access token:', accessToken, 'at', request.nextUrl.pathname)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/bid',
    '/data-piece',
    '/skill-cards',
  ],
}
