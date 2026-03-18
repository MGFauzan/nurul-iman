import type { Berita, Galeri, Pendaftaran } from './types'

// ── Dev in-memory store ──────────────────────────────────
// Di production Cloudflare, D1 digunakan — store ini diabaikan
const devStore = {
  berita: [
    { id:1, judul:'Penerimaan Santri Baru Tahun Ajaran 2025/2026', slug:'penerimaan-santri-baru-2025-2026', ringkasan:'Pesantren Nurul Iman membuka pendaftaran santri baru.', isi:'<p>Bismillahirrahmanirrahim. Pondok Pesantren Nurul Iman membuka pendaftaran santri baru tahun ajaran 2025/2026.</p>', gambar:null, kategori:'Pengumuman', is_published:1, tanggal:'2025-01-15T00:00:00' },
    { id:2, judul:"Kegiatan Qiro'atul Qur'an Malam Jumat", slug:'qiroatul-quran-malam-jumat', ringkasan:"Kegiatan Qiro'atul Qur'an setiap malam Jumat berjalan khidmat.", isi:"<p>Alhamdulillah kegiatan Qiro'atul Qur'an berjalan penuh kekhidmatan.</p>", gambar:null, kategori:'Kegiatan', is_published:1, tanggal:'2025-01-10T00:00:00' },
    { id:3, judul:'Santri Nurul Iman Juara Pencak Silat', slug:'juara-pencak-silat-kabupaten', ringkasan:'Santri meraih juara dalam kejuaraan Pencak Silat tingkat Kabupaten.', isi:'<p>Santri Nurul Iman meraih prestasi dalam kejuaraan Pencak Silat tingkat Kabupaten Subang.</p>', gambar:null, kategori:'Prestasi', is_published:1, tanggal:'2025-01-05T00:00:00' },
  ] as Berita[],
  galeri: [] as Galeri[],
  pendaftaran: [] as Pendaftaran[],
  bid:4, gid:1, pid:1,
}

// ── D1 accessor (Cloudflare production) ─────────────────
function getD1(): D1Database | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (globalThis as any).__env ?? (globalThis as any).__cloudflare?.env
    return env?.DB ?? null
  } catch { return null }
}

function slug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g,'').trim().replace(/\s+/g,'-') + '-' + Date.now()
}

// ── BERITA ───────────────────────────────────────────────
export async function dbGetBerita(page=1,limit=9,pubOnly=true): Promise<{items:Berita[];total:number}> {
  const db=getD1(); const off=(page-1)*limit
  if(db){
    const w=pubOnly?'WHERE is_published=1':''
    const [r,c]=await Promise.all([db.prepare(`SELECT * FROM berita ${w} ORDER BY tanggal DESC LIMIT ? OFFSET ?`).bind(limit,off).all<Berita>(),db.prepare(`SELECT COUNT(*) as n FROM berita ${w}`).first<{n:number}>()])
    return{items:r.results,total:c?.n??0}
  }
  const all=pubOnly?devStore.berita.filter(b=>b.is_published===1):[...devStore.berita]
  return{items:all.slice(off,off+limit),total:all.length}
}
export async function dbGetBeritaBySlug(s:string): Promise<Berita|null> {
  const db=getD1()
  if(db) return (await db.prepare('SELECT * FROM berita WHERE slug=? AND is_published=1').bind(s).first<Berita>())??null
  return devStore.berita.find(b=>b.slug===s)??null
}
export async function dbGetBeritaById(id:number): Promise<Berita|null> {
  const db=getD1()
  if(db) return (await db.prepare('SELECT * FROM berita WHERE id=?').bind(id).first<Berita>())??null
  return devStore.berita.find(b=>b.id===id)??null
}
export async function dbCreateBerita(data:Omit<Berita,'id'|'tanggal'>): Promise<void> {
  const db=getD1(); const s=data.slug||slug(data.judul)
  if(db){await db.prepare('INSERT INTO berita (judul,slug,ringkasan,isi,gambar,kategori,is_published) VALUES (?,?,?,?,?,?,?)').bind(data.judul,s,data.ringkasan??null,data.isi,data.gambar??null,data.kategori,data.is_published).run();return}
  devStore.berita.unshift({id:devStore.bid++,judul:data.judul,slug:s,ringkasan:data.ringkasan??null,isi:data.isi,gambar:data.gambar??null,kategori:data.kategori,is_published:data.is_published,tanggal:new Date().toISOString()})
}
export async function dbUpdateBerita(id:number,data:Partial<Omit<Berita,'id'|'slug'>>): Promise<void> {
  const db=getD1()
  if(db){const e=Object.entries(data);if(!e.length)return;await db.prepare(`UPDATE berita SET ${e.map(([k])=>`${k}=?`).join(',')} WHERE id=?`).bind(...e.map(([,v])=>v),id).run();return}
  const i=devStore.berita.findIndex(b=>b.id===id);if(i>=0) devStore.berita[i]={...devStore.berita[i],...data}
}
export async function dbDeleteBerita(id:number): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('DELETE FROM berita WHERE id=?').bind(id).run();return}
  const i=devStore.berita.findIndex(b=>b.id===id);if(i>=0) devStore.berita.splice(i,1)
}

// ── GALERI ───────────────────────────────────────────────
export async function dbGetGaleri(): Promise<Galeri[]> {
  const db=getD1()
  if(db){const r=await db.prepare('SELECT * FROM galeri ORDER BY tanggal DESC').all<Galeri>();return r.results}
  return[...devStore.galeri]
}
export async function dbCreateGaleri(data:Pick<Galeri,'judul'|'gambar'|'kategori'>): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('INSERT INTO galeri (judul,gambar,kategori) VALUES (?,?,?)').bind(data.judul,data.gambar,data.kategori).run();return}
  devStore.galeri.unshift({id:devStore.gid++,...data,tanggal:new Date().toISOString()})
}
export async function dbUpdateGaleri(id:number,data:Pick<Galeri,'judul'|'kategori'>): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('UPDATE galeri SET judul=?,kategori=? WHERE id=?').bind(data.judul,data.kategori,id).run();return}
  const g=devStore.galeri.find(x=>x.id===id);if(g){g.judul=data.judul;g.kategori=data.kategori}
}
export async function dbDeleteGaleri(id:number): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('DELETE FROM galeri WHERE id=?').bind(id).run();return}
  const i=devStore.galeri.findIndex(g=>g.id===id);if(i>=0) devStore.galeri.splice(i,1)
}

// ── PENDAFTARAN ──────────────────────────────────────────
export async function dbGetPendaftaran(page=1,limit=15): Promise<{items:Pendaftaran[];total:number}> {
  const db=getD1(); const off=(page-1)*limit
  if(db){const [r,c]=await Promise.all([db.prepare('SELECT * FROM pendaftaran ORDER BY tanggal_daftar DESC LIMIT ? OFFSET ?').bind(limit,off).all<Pendaftaran>(),db.prepare('SELECT COUNT(*) as n FROM pendaftaran').first<{n:number}>()]);return{items:r.results,total:c?.n??0}}
  return{items:devStore.pendaftaran.slice(off,off+limit),total:devStore.pendaftaran.length}
}
export async function dbCreatePendaftaran(data:Omit<Pendaftaran,'id'|'status'|'tanggal_daftar'>): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('INSERT INTO pendaftaran (nama_lengkap,tempat_lahir,tanggal_lahir,jenis_kelamin,asal_sekolah,nama_orang_tua,nomor_hp,alamat,program) VALUES (?,?,?,?,?,?,?,?,?)').bind(data.nama_lengkap,data.tempat_lahir,data.tanggal_lahir,data.jenis_kelamin,data.asal_sekolah,data.nama_orang_tua,data.nomor_hp,data.alamat,data.program??null).run();return}
  devStore.pendaftaran.unshift({id:devStore.pid++,...data,status:'Pending',tanggal_daftar:new Date().toISOString()})
}
export async function dbUpdateStatusPendaftaran(id:number,status:string): Promise<void> {
  const db=getD1()
  if(db){await db.prepare('UPDATE pendaftaran SET status=? WHERE id=?').bind(status,id).run();return}
  const p=devStore.pendaftaran.find(x=>x.id===id);if(p) p.status=status
}
export async function dbGetStats(): Promise<{berita:number;galeri:number;pendaftaran:number;pending:number}> {
  const db=getD1()
  if(db){const [b,g,p,pend]=await Promise.all([db.prepare('SELECT COUNT(*) as n FROM berita').first<{n:number}>(),db.prepare('SELECT COUNT(*) as n FROM galeri').first<{n:number}>(),db.prepare('SELECT COUNT(*) as n FROM pendaftaran').first<{n:number}>(),db.prepare("SELECT COUNT(*) as n FROM pendaftaran WHERE status='Pending'").first<{n:number}>()]);return{berita:b?.n??0,galeri:g?.n??0,pendaftaran:p?.n??0,pending:pend?.n??0}}
  return{berita:devStore.berita.length,galeri:devStore.galeri.length,pendaftaran:devStore.pendaftaran.length,pending:devStore.pendaftaran.filter(x=>x.status==='Pending').length}
}