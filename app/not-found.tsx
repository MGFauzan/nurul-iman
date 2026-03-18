import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default function NotFound(){
  return(<>
    <Navbar/>
    <main style={{paddingTop:64,minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f8fafc',fontFamily:'Poppins,sans-serif'}}>
      <div style={{textAlign:'center',padding:'0 24px'}}>
        <p style={{fontFamily:"'Scheherazade New',serif",fontSize:32,color:'#c8a84b',marginBottom:10}}>٤٠٤</p>
        <h1 style={{fontSize:'clamp(36px,8vw,80px)',fontWeight:800,color:'#0d5c38',lineHeight:1}}>404</h1>
        <h2 style={{fontSize:20,fontWeight:700,color:'#1a202c',marginBottom:10}}>Halaman tidak ditemukan</h2>
        <p style={{color:'#6b7280',marginBottom:26,fontSize:14}}>Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
        <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 24px',borderRadius:12,background:'#0d5c38',color:'#fff',fontWeight:700,fontSize:14,textDecoration:'none'}}>← Kembali ke Beranda</Link>
      </div>
    </main>
    <Footer/>
  </>)
}
