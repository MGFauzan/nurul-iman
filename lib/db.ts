import type { Berita, Galeri, Pendaftaran } from './types'

declare global {
  // eslint-disable-next-line no-var
  var __ppStore: {
    berita: Berita[]
    galeri: Galeri[]
    pendaftaran: Pendaftaran[]
    bid: number; gid: number; pid: number
  } | undefined
}

if (!global.__ppStore) {
  global.__ppStore = {
    berita: [
      { id:1, judul:'Penerimaan Santri Baru Tahun Ajaran 2025/2026', slug:'penerimaan-santri-baru-2025-2026', ringkasan:'Pesantren Nurul Iman membuka pendaftaran santri baru untuk tahun ajaran 2025/2026.', isi:'<p>Bismillahirrahmanirrahim. Pondok Pesantren Nurul Iman mengumumkan pembukaan pendaftaran santri baru tahun ajaran 2025/2026.</p><h2>Syarat Pendaftaran</h2><ul><li>Foto copy KTP orang tua (2 lembar)</li><li>Foto copy Kartu Keluarga (2 lembar)</li><li>Foto copy ijazah terakhir (2 lembar)</li><li>Pas foto 3x4 (4 lembar)</li><li>Surat keterangan sehat</li></ul>', gambar:null, kategori:'Pengumuman', is_published:1, tanggal:'2025-01-15T00:00:00' },
      { id:2, judul:"Kegiatan Qiro'atul Qur'an Malam Jumat Berjalan Rutin", slug:'qiroatul-quran-malam-jumat', ringkasan:"Kegiatan Qiro'atul Qur'an setiap malam Jumat terus berjalan dengan khidmat.", isi:"<p>Alhamdulillah, kegiatan Qiro'atul Qur'an berjalan penuh kekhidmatan setiap malam Jumat.</p>", gambar:null, kategori:'Kegiatan', is_published:1, tanggal:'2025-01-10T00:00:00' },
      { id:3, judul:'Santri Nurul Iman Juara Pencak Silat Tingkat Kabupaten', slug:'juara-pencak-silat-kabupaten', ringkasan:'Santri Pesantren Nurul Iman meraih juara dalam kejuaraan Pencak Silat.', isi:'<p>Dengan bangga kami umumkan prestasi santri Nurul Iman dalam kejuaraan Pencak Silat tingkat Kabupaten Subang.</p>', gambar:null, kategori:'Prestasi', is_published:1, tanggal:'2025-01-05T00:00:00' },
    ],
    galeri: [], pendaftaran: [], bid: 4, gid: 1, pid: 1,
  }
}
const store = global.__ppStore

function getD1(): D1Database | null {
  if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME !== 'edge') return null
  try {
    // Only available in Cloudflare Workers runtime
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = (globalThis as any).__cloudflare?.env
    return ctx?.DB ?? null
  } catch { return null }
}

function makeSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-') + '-' + Date.now()
}

export async function dbGetBerita(page=1,limit=9,pubOnly=true): Promise<{items:Berita[];total:number}> {
  const db=getD1(); const offset=(page-1)*limit
  if(db){
    const w=pubOnly?'WHERE is_published=1':''
    const [rows,cnt]=await Promise.all([db.prepare(`SELECT * FROM berita ${w} ORDER BY tanggal DESC LIMIT ? OFFSET ?`).bind(limit,offset).all<Berita>(),db.prepare(`SELECT COUNT(*) as n FROM berita ${w}`).first<{n:number}>()])
    return{items:rows.results,total:cnt?.n??0}
  }
  const all=pubOnly?store.berita.filter(b=>b.is_published===1):[...store.berita]
  return{items:all.slice(offset,offset+limit),total:all.length}
}

export async function dbGetBeritaBySlug(slug:string): Promise<Berita|null> {
  const db=getD1()
  if(db) return (await db.prepare('SELECT * FROM berita WHERE slug=? AND is_published=1').bind(slug).first<Berita>())??null
  return store.berita.find(b=>b.slug===slug)??null
}

export async function dbGetBeritaById(id:number): Promise<Berita|null> {
  const db=getD1()
  if(db) return (await db.prepare('SELECT * FROM berita WHERE id=?').bind(id).first<Berita>())??null
  return store.berita.find(b=>b.id===id)??null
}

export async function dbCreateBerita(data:Omit<Berita,'id'|'tanggal'>): Promise<void> {
  const db=getD1(); const s=data.slug||makeSlug(data.judul)
  if(db){await db.prepare('INSERT INTO berita (judul,slug,ringkasan,isi,gambar,kategori,is_published) VALUES (?,?,?,?,?,?,?)').bind(data.judul,s,data.ringkasan??null,data.isi,data.gambar??null,data.kategori,data.is_published).run();return}
  store.berita.unshift({id:store.bid++,judul:data.judul,slug:s,ringkasan:data.ringkasan??null,isi:data.isi,gambar:data.gambar??null,kategori:data.kategori,is_published:data.is_published,tanggal:new Date().toISOString()})
}

export async function dbUpdateBerita(id:number,data:Partial<Omit<Berita,'id'|'slug'>>): Promise<void> {
  const db=getD1()
  if(db){const e=Object.entries(data);if(!e.length)return;await db.prepare(`UPDATE berita SET ${e.map(([k])=>`${k}=?`).join(',')} WHERE id=?`).bind(...e.map(([,v])=>v),id).run();return}
  const i=store.berita.findIndex(b=>b.id===id);if(i>=0) store.berita[i]={...store.berita[i],...data}
}

export async function dbDeleteBerita(id:number): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('DELETE FROM berita WHERE id=?').bind(id).run();return}
  const i=store.berita.findIndex(b=>b.id===id);if(i>=0) store.berita.splice(i,1)
}

export async function dbGetGaleri(): Promise<Galeri[]> {
  const db=getD1()
  if(db){const r=await db.prepare('SELECT * FROM galeri ORDER BY tanggal DESC').all<Galeri>();return r.results}
  return[...store.galeri]
}

export async function dbCreateGaleri(data:Pick<Galeri,'judul'|'gambar'|'kategori'>): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('INSERT INTO galeri (judul,gambar,kategori) VALUES (?,?,?)').bind(data.judul,data.gambar,data.kategori).run();return}
  store.galeri.unshift({id:store.gid++,judul:data.judul,gambar:data.gambar,kategori:data.kategori,tanggal:new Date().toISOString()})
}

export async function dbUpdateGaleri(id:number,data:Pick<Galeri,'judul'|'kategori'>): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('UPDATE galeri SET judul=?,kategori=? WHERE id=?').bind(data.judul,data.kategori,id).run();return}
  const g=store.galeri.find(x=>x.id===id);if(g){g.judul=data.judul;g.kategori=data.kategori}
}

export async function dbDeleteGaleri(id:number): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('DELETE FROM galeri WHERE id=?').bind(id).run();return}
  const i=store.galeri.findIndex(g=>g.id===id);if(i>=0) store.galeri.splice(i,1)
}

export async function dbGetPendaftaran(page=1,limit=15): Promise<{items:Pendaftaran[];total:number}> {
  const db=getD1(); const offset=(page-1)*limit
  if(db){const [rows,cnt]=await Promise.all([db.prepare('SELECT * FROM pendaftaran ORDER BY tanggal_daftar DESC LIMIT ? OFFSET ?').bind(limit,offset).all<Pendaftaran>(),db.prepare('SELECT COUNT(*) as n FROM pendaftaran').first<{n:number}>()]);return{items:rows.results,total:cnt?.n??0}}
  return{items:store.pendaftaran.slice(offset,offset+limit),total:store.pendaftaran.length}
}

export async function dbCreatePendaftaran(data:Omit<Pendaftaran,'id'|'status'|'tanggal_daftar'>): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('INSERT INTO pendaftaran (nama_lengkap,tempat_lahir,tanggal_lahir,jenis_kelamin,asal_sekolah,nama_orang_tua,nomor_hp,alamat,program) VALUES (?,?,?,?,?,?,?,?,?)').bind(data.nama_lengkap,data.tempat_lahir,data.tanggal_lahir,data.jenis_kelamin,data.asal_sekolah,data.nama_orang_tua,data.nomor_hp,data.alamat,data.program??null).run();return}
  store.pendaftaran.unshift({id:store.pid++,...data,status:'Pending',tanggal_daftar:new Date().toISOString()})
}

export async function dbUpdateStatusPendaftaran(id:number,status:string): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('UPDATE pendaftaran SET status=? WHERE id=?').bind(status,id).run();return}
  const p=store.pendaftaran.find(x=>x.id===id);if(p) p.status=status
}

export async function dbGetStats(): Promise<{berita:number;galeri:number;pendaftaran:number;pending:number}> {
  const db=getD1()
  if(db){const [b,g,p,pend]=await Promise.all([db.prepare('SELECT COUNT(*) as n FROM berita').first<{n:number}>(),db.prepare('SELECT COUNT(*) as n FROM galeri').first<{n:number}>(),db.prepare('SELECT COUNT(*) as n FROM pendaftaran').first<{n:number}>(),db.prepare("SELECT COUNT(*) as n FROM pendaftaran WHERE status='Pending'").first<{n:number}>()]);return{berita:b?.n??0,galeri:g?.n??0,pendaftaran:p?.n??0,pending:pend?.n??0}}
  return{berita:store.berita.length,galeri:store.galeri.length,pendaftaran:store.pendaftaran.length,pending:store.pendaftaran.filter(x=>x.status==='Pending').length}
}