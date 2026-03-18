'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, Lock, User, ArrowLeft } from 'lucide-react'
export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username:'', password:'' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      const d = await res.json() as { success:boolean; message?:string }
      if (d.success) { router.push('/admin/dashboard'); router.refresh() } else setError(d.message??'Username atau password salah')
    } catch { setError('Gagal menghubungi server') } finally { setLoading(false) }
  }
  const INP: React.CSSProperties = { width:'100%', padding:'11px 14px 11px 42px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:14, color:'#374151', outline:'none', fontFamily:'Poppins,sans-serif', background:'#fff' }
  return (
    <div style={{ minHeight:'100vh', background:'#0d5c38', display:'flex', alignItems:'center', justifyContent:'center', padding:16, fontFamily:'Poppins,sans-serif' }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        {error && <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:10, padding:'11px 15px', marginBottom:14, color:'#dc2626', fontSize:13, display:'flex', alignItems:'center', gap:7 }}><Lock size={13}/>{error}</div>}
        <div style={{ background:'#fff', borderRadius:18, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.25)' }}>
          <div style={{ padding:'34px 30px 22px', textAlign:'center', borderBottom:'1px solid #f1f5f9' }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:14 }}>
              <Image src="/images/logo.png" alt="Logo" width={86} height={86} style={{ borderRadius:'50%', objectFit:'cover' }} />
            </div>
            <h1 style={{ fontSize:21, fontWeight:800, color:'#0d5c38', marginBottom:3 }}>Admin Panel</h1>
            <p style={{ color:'#9ca3af', fontSize:13 }}>Pondok Pesantren Nurul Iman</p>
          </div>
          <div style={{ padding:'26px 30px 30px' }}>
            <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Username</label>
                <div style={{ position:'relative' }}>
                  <User size={15} color="#9ca3af" style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)' }}/>
                  <input type="text" value={form.username} onChange={e=>setForm(p=>({...p,username:e.target.value}))} style={INP} placeholder="Masukkan username" required autoFocus/>
                </div>
              </div>
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:6 }}>Password</label>
                <div style={{ position:'relative' }}>
                  <Lock size={15} color="#9ca3af" style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)' }}/>
                  <input type={show?'text':'password'} value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} style={{ ...INP, paddingRight:42 }} placeholder="Masukkan password" required/>
                  <button type="button" onClick={()=>setShow(v=>!v)} style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9ca3af' }}>
                    {show?<EyeOff size={15}/>:<Eye size={15}/>}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} style={{ padding:'13px 0', borderRadius:11, background:loading?'#9ca3af':'#0d5c38', color:'#fff', fontWeight:700, fontSize:15, border:'none', cursor:loading?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'Poppins,sans-serif' }}>
                {loading?<><Loader2 size={17} className="spin"/>Memproses...</>:'Masuk ke Admin Panel'}
              </button>
            </form>
            <div style={{ textAlign:'center', marginTop:18 }}>
              <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:5, color:'#0d5c38', fontSize:13, textDecoration:'none' }}><ArrowLeft size={13}/>Kembali ke Website</Link>
            </div>
          </div>
        </div>
        <p style={{ textAlign:'center', color:'rgba(255,255,255,0.3)', fontSize:12, marginTop:14 }}>&copy; {new Date().getFullYear()} Pondok Pesantren Nurul Iman</p>
      </div>
    </div>
  )
}
