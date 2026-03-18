// app/api/berita/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/auth'
import { dbGetBerita, dbGetBeritaById, dbCreateBerita, dbUpdateBerita, dbDeleteBerita } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = parseInt(url.searchParams.get('limit') ?? '10')
    const allItems = url.searchParams.get('all') === '1'

    if (id) {
      const item = await dbGetBeritaById(parseInt(id))
      return NextResponse.json({ success: true, item })
    }
    const result = await dbGetBerita(page, limit, !allItems)
    return NextResponse.json({ success: true, ...result })
  } catch (e) {
    console.error('GET berita error:', e)
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const user = await getUser()
  if (!user?.is_admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json() as {
      judul: string; ringkasan?: string; isi: string
      gambar?: string; kategori?: string; is_published?: number
    }
    if (!body.judul?.trim()) return NextResponse.json({ success: false, message: 'Judul wajib diisi' }, { status: 400 })
    if (!body.isi?.trim()) return NextResponse.json({ success: false, message: 'Isi berita wajib diisi' }, { status: 400 })

    await dbCreateBerita({
      judul: body.judul.trim(),
      slug: '',
      ringkasan: body.ringkasan?.trim() || null,
      isi: body.isi,
      gambar: body.gambar || null,
      kategori: body.kategori || 'Umum',
      is_published: body.is_published ?? 1,
    })
    return NextResponse.json({ success: true, message: 'Berita berhasil dibuat' })
  } catch (e) {
    console.error('POST berita error:', e)
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const user = await getUser()
  if (!user?.is_admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json() as { id: number; [key: string]: unknown }
    const { id, ...data } = body
    if (!id) return NextResponse.json({ success: false, message: 'ID wajib' }, { status: 400 })
    await dbUpdateBerita(id, data)
    return NextResponse.json({ success: true, message: 'Berita berhasil diupdate' })
  } catch (e) {
    console.error('PUT berita error:', e)
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getUser()
  if (!user?.is_admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  try {
    const id = parseInt(new URL(req.url).searchParams.get('id') ?? '0')
    if (!id) return NextResponse.json({ success: false, message: 'ID tidak valid' }, { status: 400 })
    await dbDeleteBerita(id)
    return NextResponse.json({ success: true, message: 'Berita berhasil dihapus' })
  } catch (e) {
    console.error('DELETE berita error:', e)
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}