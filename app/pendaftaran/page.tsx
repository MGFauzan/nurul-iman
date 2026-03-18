'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, Loader2, User, Phone, MapPin, Calendar, Users, BookOpen } from 'lucide-react'

type F = { nama_lengkap:string; tempat_lahir:string; tanggal_lahir:string; jenis_kelamin:string; asal_sekolah:string; nama_orang_tua:string; nomor_hp:string; alamat:string; program:string }
const E: F = { nama_lengkap:'', tempat_lahir:'', tanggal_lahir:'', jenis_kelamin:'', asal_sekolah:'', nama_orang_tua:'', nomor_hp:'', alamat:'', program:'' }
const PROGS = ['Program Reguler (Nahwu Shorof + Kitab)', 'Program Tahfidz', 'Program Terpadu (Reguler + Tahfidz)']
const INP: React.CSSProperties = { width:'100%', padding:'11px 14px', borderRadius:11, border:'1.5px solid #e5e7eb', fontSize:14, color:'#374151', outline:'none', fontFamily:'Poppins,sans-serif', background:'#fff' }
const LBL: React.CSSProperties = { display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }

export default function PendaftaranPage() {
  const [form, setForm] = useState<F>(E)
  const [errors, setErrors] = useState<Partial<F>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [serverErr, setServerErr] = useState('')

  function s(k: keyof F, v: string) { setForm(p => ({...p, [k]:v})); setErrors(e => ({...e, [k]:''})) }

  function validate() {
    const e: Partial<F> = {}
    if (!form.nama_lengkap.trim()) e.nama_lengkap = 'Wajib diisi'
    if (!form.tempat_lahir.trim()) e.tempat_lahir = 'Wajib diisi'
    if (!form.tanggal_lahir) e.tanggal_lahir = 'Wajib diisi'
    if (!form.jenis_kelamin) e.jenis_kelamin = 'Pilih salah satu'
    if (!form.asal_sekolah.trim()) e.asal_sekolah = 'Wajib diisi'
    if (!form.nama_orang_tua.trim()) e.nama_orang_tua = 'Wajib diisi'
    if (form.nomor_hp.length < 10) e.nomor_hp = 'Minimal 10 digit'
    if (form.alamat.length < 10) e.alamat = 'Terlalu pendek'
    setErrors(e); return Object.keys(e).length === 0
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true); setServerErr('')
    try {
      const res = await fetch('/api/pendaftaran', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      const d = await res.json() as { success:boolean; message?:string }
      if (d.success) { setDone(true); setForm(E) } else setServerErr(d.message ?? 'Terjadi kesalahan')
    } catch { setServerErr('Gagal menghubungi server') }
    finally { setLoading(false) }
  }

  if (done) return (
    <>
      <Navbar />
      <main style={{ paddingTop:64, minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f8fafc' }}>
        <div style={{ maxWidth:420, width:'100%', margin:'0 24px', background:'#fff', borderRadius:22, padding:'50px 34px', textAlign:'center', boxShadow:'0 4px 22px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' }}>
          <div style={{ width:68, height:68, background:'#f0fdf4', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px' }}><CheckCircle size={34} color="#22c55e" /></div>
          <h2 style={{ fontSize:22, fontWeight:800, color:'#1a202c', marginBottom:9 }}>Pendaftaran Berhasil!</h2>
          <p style={{ color:'#6b7280', lineHeight:1.7, marginBottom:7, fontSize:14 }}>Jazakumullahu khairan. Data pendaftaran Anda telah kami terima.</p>
          <p style={{ color:'#9ca3af', fontSize:13, marginBottom:20 }}>Tim kami akan menghubungi Anda melalui nomor HP yang didaftarkan.</p>
          <p style={{ fontFamily:"'Scheherazade New',serif", fontSize:22, color:'#c8a84b', marginBottom:18 }}>بَارَكَ اللهُ فِيكُمْ</p>
          <button onClick={() => setDone(false)} style={{ padding:'11px 24px', borderRadius:11, background:'#0d5c38', color:'#fff', fontWeight:700, fontSize:14, border:'none', cursor:'pointer', fontFamily:'Poppins,sans-serif' }}>Daftar Lagi</button>
        </div>
      </main>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main style={{ paddingTop:64, fontFamily:'Poppins,sans-serif' }}>
        <section style={{ background:'linear-gradient(135deg,#063320 0%,#0d5c38 50%,#0a4d2e 100%)', padding:'60px 24px', textAlign:'center' }}>
          <h1 style={{ fontSize:'clamp(24px,5vw,42px)', fontWeight:800, color:'#fff', marginBottom:8 }}>Pendaftaran Santri</h1>
          <p style={{ color:'rgba(255,255,255,0.7)', fontSize:14 }}>Isi formulir untuk mendaftarkan putra-putri Anda ke Pesantren Nurul Iman</p>
        </section>
        <section style={{ padding:'40px 24px', background:'#f8fafc' }}>
          <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:22 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div style={{ background:'#0d5c38', borderRadius:17, padding:22, color:'#fff' }}>
                <BookOpen size={26} color="#c8a84b" style={{ marginBottom:10 }} />
                <h3 style={{ fontWeight:700, fontSize:15, marginBottom:10 }}>Info Pendaftaran</h3>
                {['Pendaftaran gratis', 'Kelas 0, 1, 2, dan 3', 'Jadwal 3× sehari', 'Tim hubungi via WhatsApp'].map(i => (
                  <div key={i} style={{ display:'flex', gap:8, fontSize:13, color:'rgba(255,255,255,0.75)', marginBottom:7 }}>
                    <span style={{ width:5, height:5, background:'#c8a84b', borderRadius:'50%', flexShrink:0, marginTop:5 }} />{i}
                  </div>
                ))}
              </div>
              <div style={{ background:'#fff', borderRadius:17, padding:20, border:'1px solid #f1f5f9' }}>
                <h3 style={{ fontWeight:700, fontSize:14, color:'#1a202c', marginBottom:12 }}>Syarat Pendaftaran</h3>
                {['KTP orang tua (2 lembar)', 'Kartu Keluarga (2 lembar)', 'Ijazah terakhir (2 lembar)', 'Pas foto 3×4 (4 lembar)', 'Surat keterangan sehat'].map(s => (
                  <div key={s} style={{ display:'flex', gap:8, fontSize:13, color:'#374151', marginBottom:8 }}>
                    <CheckCircle size={14} color="#0d5c38" style={{ flexShrink:0, marginTop:1 }} />{s}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:'#fff', borderRadius:18, padding:'24px 22px', boxShadow:'0 1px 8px rgba(0,0,0,0.05)', border:'1px solid #f1f5f9' }}>
              <h2 style={{ fontWeight:800, fontSize:17, color:'#1a202c', marginBottom:18 }}>Formulir Pendaftaran</h2>
              {serverErr && <div style={{ marginBottom:14, padding:'11px 14px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:10, color:'#dc2626', fontSize:13 }}>⚠️ {serverErr}</div>}
              <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:13 }}>
                <div>
                  <label style={LBL}><User size={13} style={{ display:'inline', marginRight:5 }} />Nama Lengkap <span style={{ color:'#ef4444' }}>*</span></label>
                  <input value={form.nama_lengkap} onChange={e => s('nama_lengkap', e.target.value)} style={{ ...INP, borderColor:errors.nama_lengkap?'#ef4444':'#e5e7eb' }} placeholder="Nama lengkap santri" />
                  {errors.nama_lengkap && <p style={{ color:'#ef4444', fontSize:11, marginTop:3 }}>{errors.nama_lengkap}</p>}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:11 }}>
                  <div>
                    <label style={LBL}><MapPin size={13} style={{ display:'inline', marginRight:5 }} />Tempat Lahir <span style={{ color:'#ef4444' }}>*</span></label>
                    <input value={form.tempat_lahir} onChange={e => s('tempat_lahir', e.target.value)} style={{ ...INP, borderColor:errors.tempat_lahir?'#ef4444':'#e5e7eb' }} placeholder="Kota/Kabupaten" />
                  </div>
                  <div>
                    <label style={LBL}><Calendar size={13} style={{ display:'inline', marginRight:5 }} />Tanggal Lahir <span style={{ color:'#ef4444' }}>*</span></label>
                    <input type="date" value={form.tanggal_lahir} onChange={e => s('tanggal_lahir', e.target.value)} style={{ ...INP, borderColor:errors.tanggal_lahir?'#ef4444':'#e5e7eb' }} />
                  </div>
                </div>
                <div>
                  <label style={LBL}><Users size={13} style={{ display:'inline', marginRight:5 }} />Jenis Kelamin <span style={{ color:'#ef4444' }}>*</span></label>
                  <div style={{ display:'flex', gap:18 }}>
                    {['Laki-laki', 'Perempuan'].map(jk => (
                      <label key={jk} style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer', fontSize:14, color:'#374151', fontWeight:500 }}>
                        <input type="radio" name="jk" value={jk} checked={form.jenis_kelamin === jk} onChange={() => s('jenis_kelamin', jk)} style={{ accentColor:'#0d5c38', width:15, height:15 }} />{jk}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={LBL}>Asal Sekolah <span style={{ color:'#ef4444' }}>*</span></label>
                  <input value={form.asal_sekolah} onChange={e => s('asal_sekolah', e.target.value)} style={{ ...INP, borderColor:errors.asal_sekolah?'#ef4444':'#e5e7eb' }} placeholder="Nama sekolah asal" />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:11 }}>
                  <div>
                    <label style={LBL}><User size={13} style={{ display:'inline', marginRight:5 }} />Nama Orang Tua <span style={{ color:'#ef4444' }}>*</span></label>
                    <input value={form.nama_orang_tua} onChange={e => s('nama_orang_tua', e.target.value)} style={{ ...INP, borderColor:errors.nama_orang_tua?'#ef4444':'#e5e7eb' }} placeholder="Nama ayah/ibu" />
                  </div>
                  <div>
                    <label style={LBL}><Phone size={13} style={{ display:'inline', marginRight:5 }} />Nomor HP/WA <span style={{ color:'#ef4444' }}>*</span></label>
                    <input type="tel" value={form.nomor_hp} onChange={e => s('nomor_hp', e.target.value)} style={{ ...INP, borderColor:errors.nomor_hp?'#ef4444':'#e5e7eb' }} placeholder="08xxxxxxxxxx" />
                  </div>
                </div>
                <div>
                  <label style={LBL}><MapPin size={13} style={{ display:'inline', marginRight:5 }} />Alamat Lengkap <span style={{ color:'#ef4444' }}>*</span></label>
                  <textarea value={form.alamat} onChange={e => s('alamat', e.target.value)} rows={3} style={{ ...INP, resize:'none', borderColor:errors.alamat?'#ef4444':'#e5e7eb' }} placeholder="Jl. ... RT/RW ... Desa ... Kecamatan ..." />
                </div>
                <div>
                  <label style={LBL}>Program yang Dipilih</label>
                  <select value={form.program} onChange={e => s('program', e.target.value)} style={INP}>
                    <option value="">-- Pilih Program (Opsional) --</option>
                    {PROGS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={loading} style={{ padding:'13px 0', borderRadius:12, background:loading?'#9ca3af':'#0d5c38', color:'#fff', fontWeight:700, fontSize:15, border:'none', cursor:loading?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'Poppins,sans-serif', marginTop:4 }}>
                  {loading ? <><Loader2 size={17} className="spin" />Mengirim...</> : <><CheckCircle size={17} />Kirim Pendaftaran</>}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
