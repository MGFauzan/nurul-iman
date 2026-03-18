// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/auth'
import { uploadFile } from '@/lib/upload'

export async function POST(req: NextRequest) {
  const user = await getUser()
  if (!user?.is_admin) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  try {
    const fd = await req.formData()
    const file = fd.get('file') as File | null
    if (!file) return NextResponse.json({ success: false, error: 'File tidak ditemukan' }, { status: 400 })
    const category = (fd.get('category') as string) || 'berita'
    const url = await uploadFile(file, category)
    return NextResponse.json({ success: true, url })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 })
  }
}