import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { dbGetBeritaBySlug, dbGetBerita } from '@/lib/db'
import { fmtDate, fmtDateShort } from '@/lib/utils'
import { ArrowLeft, Tag, Calendar } from 'lucide-react'

export default async function BeritaDetailPage({ params }:{ params:Promise<{slug:string}> }) {
  const { slug } = await params
  const [b, { items: related }] = await Promise.all([
    dbGetBeritaBySlug(slug),
    dbGetBerita(1, 4, true),
  ])
  if (!b) notFound()
  const sidebar = related.filter(x=>x.slug!==slug).slice(0,3)

  return (
    <>
      <Navbar/>
      <main style={{paddingTop:64,fontFamily:'Poppins,sans-serif'}}>
        <section style={{background:'linear-gradient(135deg,#063320 0%,#0d5c38 50%,#0a4d2e 100%)',padding:'52px 24px'}}>
          <div style={{maxWidth:860,margin:'0 auto'}}>
            <Link href="/berita" style={{display:'inline-flex',alignItems:'center',gap:7,color:'rgba(255,255,255,0.65)',textDecoration:'none',fontSize:13,marginBottom:16}}><ArrowLeft size={14}/>Kembali ke Berita</Link>
            <span style={{display:'inline-flex',alignItems:'center',gap:5,background:'#c8a84b',color:'#fff',fontSize:11,fontWeight:600,padding:'3px 11px',borderRadius:99,marginBottom:12}}><Tag size={11}/>{b.kategori}</span>
            <h1 style={{fontSize:'clamp(20px,4vw,36px)',fontWeight:800,color:'#fff',lineHeight:1.3,marginBottom:12}}>{b.judul}</h1>
            <p style={{color:'rgba(255,255,255,0.55)',fontSize:13,display:'flex',alignItems:'center',gap:6}}><Calendar size={13}/>{fmtDate(b.tanggal)}</p>
          </div>
        </section>
        <section style={{padding:'36px 24px',background:'#f8fafc'}}>
          <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'minmax(0,2fr) minmax(0,1fr)',gap:24,alignItems:'start'}}>
            <article style={{background:'#fff',borderRadius:18,padding:'28px 26px',boxShadow:'0 1px 8px rgba(0,0,0,0.05)',border:'1px solid #f1f5f9'}}>
              {b.gambar&&<img src={b.gambar} alt={b.judul} style={{width:'100%',borderRadius:12,marginBottom:22,aspectRatio:'16/9',objectFit:'cover'}}/>}
              <div className="prose" dangerouslySetInnerHTML={{__html:b.isi}}/>
              <div style={{marginTop:22,paddingTop:18,borderTop:'1px solid #f1f5f9',display:'flex',alignItems:'center',gap:10}}>
                <span style={{color:'#9ca3af',fontSize:13}}>Bagikan:</span>
                <a href={`https://wa.me/?text=${encodeURIComponent(b.judul)}`} target="_blank" rel="noopener noreferrer" style={{padding:'6px 14px',borderRadius:9,background:'#22c55e',color:'#fff',fontWeight:600,fontSize:12,textDecoration:'none'}}>WhatsApp</a>
              </div>
            </article>
            <aside style={{display:'flex',flexDirection:'column',gap:14}}>
              {sidebar.length>0&&(
                <div style={{background:'#fff',borderRadius:16,padding:20,border:'1px solid #f1f5f9'}}>
                  <h3 style={{fontWeight:700,color:'#1a202c',fontSize:14,marginBottom:14}}>Berita Lainnya</h3>
                  <div style={{display:'flex',flexDirection:'column',gap:12}}>
                    {sidebar.map(s=>(
                      <Link key={s.id} href={`/berita/${s.slug}`} style={{display:'flex',gap:11,textDecoration:'none'}}>
                        <div style={{width:56,height:56,flexShrink:0,borderRadius:9,background:'#e8f5e9',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                          {s.gambar?<img src={s.gambar} alt={s.judul} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<Tag size={18} color="#0d5c38"/>}
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <p style={{fontSize:12,fontWeight:600,color:'#1a202c',lineHeight:1.4,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{s.judul}</p>
                          <p style={{fontSize:11,color:'#9ca3af',marginTop:3,display:'flex',alignItems:'center',gap:3}}><Calendar size={10}/>{fmtDateShort(s.tanggal)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/berita" style={{display:'block',marginTop:12,textAlign:'center',color:'#0d5c38',fontSize:12,fontWeight:600,textDecoration:'none'}}>Lihat Semua →</Link>
                </div>
              )}
              <div style={{background:'#0d5c38',borderRadius:16,padding:20,color:'#fff'}}>
                <h3 style={{fontWeight:700,fontSize:14,marginBottom:8}}>Daftar Santri Baru</h3>
                <p style={{color:'rgba(255,255,255,0.68)',fontSize:12,marginBottom:14,lineHeight:1.6}}>Pendaftaran masih dibuka. Daftarkan sekarang!</p>
                <Link href="/pendaftaran" style={{display:'block',textAlign:'center',background:'#fff',color:'#0d5c38',fontWeight:700,padding:'9px 0',borderRadius:10,textDecoration:'none',fontSize:13}}>Daftar Sekarang</Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}
