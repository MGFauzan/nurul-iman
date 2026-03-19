// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { signToken, checkUsername, checkPassword } from '@/lib/auth'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { username?: string; password?: string }
    const { username = '', password = '' } = body

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Username dan password wajib diisi' }, { status: 400 })
    }
    if (!checkUsername(username) || !checkPassword(password)) {
      return NextResponse.json({ success: false, message: 'Username atau password salah' }, { status: 401 })
    }

    const token = await signToken({ sub: '1', username, is_admin: true })

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    })
    return response

  } catch (e) {
    console.error('Login error:', e)
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan server' }, { status: 500 })
  }
}