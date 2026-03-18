// app/api/galeri/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/auth'
import { dbGetGaleri, dbCreateGaleri, dbUpdateGaleri, dbDeleteGaleri } from '@/lib/db'

export async function GET() {
  try {
    return NextResponse.json({ success: true, items: await dbGetGaleri() })
  } catch (e) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const user = await getUser()
  if (!user?.is_admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json() as { judul: string; gambar: string; kategori?: string }
    if (!body.judul?.trim()) return NextResponse.json({ success: false, message: 'Judul wajib diisi' }, { status: 400 })
    if (!body.gambar) return NextResponse.json({ success: false, message: 'Gambar wajib' }, { status: 400 })
    await dbCreateGaleri({ judul: body.judul.trim(), gambar: body.gambar, kategori: body.kategori || 'Kegiatan' })
    return NextResponse.json({ success: true, message: 'Foto berhasil ditambahkan' })
  } catch (e) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const user = await getUser()
  if (!user?.is_admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  try {
    const { id, judul, kategori } = await req.json() as { id: number; judul: string; kategori: string }
    await dbUpdateGaleri(id, { judul: judul.trim(), kategori })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getUser()
  if (!user?.is_admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  try {
    const id = parseInt(new URL(req.url).searchParams.get('id') ?? '0')
    await dbDeleteGaleri(id)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}