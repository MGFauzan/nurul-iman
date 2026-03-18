import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = () => new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'pesantren-nurul-iman-secret-2024-32chars!!'
)

export interface JWTUser { sub: string; username: string; is_admin: boolean }

export async function signToken(payload: JWTUser): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret())
}

export async function verifyToken(token: string): Promise<JWTUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret())
    return payload as JWTUser
  } catch { return null }
}

export async function getUser(): Promise<JWTUser | null> {
  try {
    const store = await cookies()
    const token = store.get('admin_token')?.value
    if (!token) return null
    return verifyToken(token)
  } catch { return null }
}

export async function setToken(token: string) {
  const store = await cookies()
  store.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400,
    path: '/',
  })
}

export async function clearToken() {
  const store = await cookies()
  store.delete('admin_token')
}

export function checkPassword(input: string): boolean {
  return input === (process.env.ADMIN_PASSWORD ?? 'admin123')
}

export function checkUsername(input: string): boolean {
  return input === (process.env.ADMIN_USERNAME ?? 'admin')
}
