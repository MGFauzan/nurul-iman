// app/api/pendaftaran/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/auth'
import { dbGetPendaftaran, dbCreatePendaftaran, dbUpdateStatusPendaftaran } from '@/lib/db'
import { kirimKeSheets } from '@/lib/sheets'

export async function GET(req: NextRequest) {
  const user = await getUser()
  if (!user?.is_admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  try {
    const page = parseInt(new URL(req.url).searchParams.get('page') ?? '1')
    return NextResponse.json({ success: true, ...(await dbGetPendaftaran(page)) })
  } catch (e) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string>
    const required = ['nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'asal_sekolah', 'nama_orang_tua', 'nomor_hp', 'alamat']
    for (const f of required) {
      if (!body[f]?.trim()) return NextResponse.json({ success: false, message: `Field ${f} wajib diisi` }, { status: 400 })
    }
    await dbCreatePendaftaran({
      nama_lengkap: body.nama_lengkap, tempat_lahir: body.tempat_lahir,
      tanggal_lahir: body.tanggal_lahir, jenis_kelamin: body.jenis_kelamin,
      asal_sekolah: body.asal_sekolah, nama_orang_tua: body.nama_orang_tua,
      nomor_hp: body.nomor_hp, alamat: body.alamat, program: body.program || null,
    })
    await kirimKeSheets(body)
    return NextResponse.json({ success: true, message: 'Pendaftaran berhasil dikirim. Tim kami akan segera menghubungi Anda.' })
  } catch (e) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const user = await getUser()
  if (!user?.is_admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  try {
    const { id, status } = await req.json() as { id: number; status: string }
    await dbUpdateStatusPendaftaran(id, status)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}