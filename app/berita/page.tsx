import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { dbGetBerita } from '@/lib/db'
import { fmtDateShort } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Tag, Calendar } from 'lucide-react'

export const metadata = { title:'Berita & Kegiatan' }
const CATS = ['Semua','Pengumuman','Kegiatan','Prestasi','Umum']

export default async function BeritaPage({ searchParams }:{ searchParams:Promise<{page?:string;k?:string}> }) {
  const p = await searchParams
  const page = parseInt(p.page??'1')
  const kat = p.k??'Semua'
  const { items, total } = await dbGetBerita(page, 9, true)
  const filtered = kat==='Semua' ? items : items.filter(b=>b.kategori===kat)
  const totalPages = Math.ceil(total/9)

  return (
    <>
      <Navbar/>
      <main style={{paddingTop:64,fontFamily:'Poppins,sans-serif'}}>
        <section style={{background:'linear-gradient(135deg,#063320 0%,#0d5c38 50%,#0a4d2e 100%)',padding:'60px 24px',textAlign:'center'}}>
          <h1 style={{fontSize:'clamp(24px,5vw,42px)',fontWeight:800,color:'#fff',marginBottom:8}}>Berita &amp; Kegiatan</h1>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:14}}>Ikuti perkembangan terbaru kegiatan dan prestasi pesantren</p>
        </section>
        <section style={{padding:'40px 24px',background:'#f8fafc',minHeight:'60vh'}}>
          <div style={{maxWidth:1200,margin:'0 auto'}}>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:28}}>
              {CATS.map(c=>(
                <Link key={c} href={`/berita?k=${c}&page=1`} style={{padding:'7px 17px',borderRadius:10,fontSize:13,fontWeight:500,textDecoration:'none',background:kat===c?'#0d5c38':'#fff',color:kat===c?'#fff':'#6b7280',border:`1px solid ${kat===c?'#0d5c38':'#e5e7eb'}`}}>{c}</Link>
              ))}
            </div>
            {filtered.length>0?(
              <>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:18,marginBottom:32}}>
                  {filtered.map(b=>(
                    <Link key={b.id} href={`/berita/${b.slug}`} style={{textDecoration:'none'}}>
                      <article style={{background:'#fff',borderRadius:17,overflow:'hidden',border:'1px solid #f1f5f9',boxShadow:'0 1px 6px rgba(0,0,0,0.05)',display:'flex',flexDirection:'column',height:'100%'}}>
                        <div style={{height:185,background:'#e8f5e9',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',flexShrink:0}}>
                          {b.gambar?<img src={b.gambar} alt={b.judul} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                            :<div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:7}}>
                              <div style={{width:46,height:46,background:'#0d5c38',borderRadius:13,display:'flex',alignItems:'center',justifyContent:'center'}}><Tag size={20} color="#fff"/></div>
                              <span style={{color:'#0d5c38',fontWeight:500,fontSize:12}}>Berita Pesantren</span>
                            </div>}
                          <span style={{position:'absolute',top:10,left:10,background:'#0d5c38',color:'#fff',fontSize:10,fontWeight:600,padding:'3px 10px',borderRadius:99}}>{b.kategori}</span>
                        </div>
                        <div style={{padding:'16px 18px',flex:1,display:'flex',flexDirection:'column'}}>
                          <p style={{fontSize:11,color:'#9ca3af',display:'flex',alignItems:'center',gap:4,marginBottom:8}}><Calendar size={10}/>{fmtDateShort(b.tanggal)}</p>
                          <h3 style={{fontWeight:700,color:'#1a202c',fontSize:14,lineHeight:1.45,flex:1}}>{b.judul}</h3>
                          {b.ringkasan&&<p style={{color:'#6b7280',fontSize:12,lineHeight:1.6,marginTop:7,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{b.ringkasan}</p>}
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
                {totalPages>1&&(
                  <div style={{display:'flex',justifyContent:'center',gap:7}}>
                    {page>1&&<Link href={`/berita?k=${kat}&page=${page-1}`} style={{display:'flex',alignItems:'center',gap:4,padding:'7px 14px',borderRadius:10,border:'1px solid #e5e7eb',background:'#fff',color:'#6b7280',fontWeight:500,fontSize:13,textDecoration:'none'}}><ChevronLeft size={14}/>Prev</Link>}
                    {Array.from({length:totalPages},(_,i)=>i+1).map(n=>(
                      <Link key={n} href={`/berita?k=${kat}&page=${n}`} style={{width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:9,fontSize:13,fontWeight:600,textDecoration:'none',background:n===page?'#0d5c38':'#fff',color:n===page?'#fff':'#6b7280',border:`1px solid ${n===page?'#0d5c38':'#e5e7eb'}`}}>{n}</Link>
                    ))}
                    {page<totalPages&&<Link href={`/berita?k=${kat}&page=${page+1}`} style={{display:'flex',alignItems:'center',gap:4,padding:'7px 14px',borderRadius:10,border:'1px solid #e5e7eb',background:'#fff',color:'#6b7280',fontWeight:500,fontSize:13,textDecoration:'none'}}>Next<ChevronRight size={14}/></Link>}
                  </div>
                )}
              </>
            ):<div style={{textAlign:'center',padding:'60px 0',color:'#9ca3af'}}>Belum ada berita untuk kategori ini</div>}
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}
