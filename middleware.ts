import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export const config = { matcher: ['/admin/:path*'] }

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('admin_token')?.value ?? ''
  const user = token ? await verifyToken(token) : null

  if (pathname === '/admin/login') {
    if (user) return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    return NextResponse.next()
  }
  if (!user) return NextResponse.redirect(new URL('/admin/login', req.url))
  return NextResponse.next()
}