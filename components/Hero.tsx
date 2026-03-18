'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, MapPin } from 'lucide-react'

const TAGS = ["Tahfidz Qur'an", 'Nahwu Shorof (Tabulas)', 'Pencak Silat', 'Marawis & Hadroh']
const PARTICLES = [
  { top:'15%',left:'8%', sz:3,d:'2.1s'},{top:'72%',left:'12%',sz:2,d:'3.4s'},
  { top:'35%',left:'52%',sz:2,d:'1.7s'},{top:'82%',left:'60%',sz:3,d:'2.8s'},
  { top:'22%',left:'70%',sz:2,d:'4.1s'},{top:'55%',left:'82%',sz:2,d:'1.9s'},
  { top:'10%',left:'42%',sz:2,d:'3.2s'},{top:'90%',left:'35%',sz:3,d:'2.5s'},
]

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  const fade = (delay = '0s'): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity .75s ease ${delay}, transform .75s ease ${delay}`,
  })

  return (
    <section style={{
      position: 'relative', minHeight: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: 'center',
      background: 'linear-gradient(125deg, #0d5c38 0%, #0a4d2e 40%, #063320 75%, #041f14 100%)',
      fontFamily: 'Poppins, sans-serif',
    }}>

      {/* Logo kanan */}
      <div style={{
        position: 'absolute', right: '15%', top: '50%',
        width: 'clamp(260px,32vw,420px)', height: 'clamp(260px,32vw,420px)',
        transform: 'translateY(-50%)',
        animation: 'floatUpDown 4s ease-in-out infinite',
        pointerEvents: 'none', zIndex: 5,
        filter: 'drop-shadow(0 16px 48px rgba(0,0,0,0.45))',
      }}>
        <Image src="/images/logo.png" alt="Logo Pesantren Nurul Iman" fill style={{ objectFit:'contain' }} priority />
      </div>

      {/* Overlay gradient kiri */}
      <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none',
        background:'linear-gradient(to right, rgba(6,51,32,0.97) 0%, rgba(6,51,32,0.85) 38%, rgba(6,51,32,0.15) 60%, rgba(6,51,32,0) 72%)' }} />

      {/* Blob cahaya */}
      <div style={{ position:'absolute', top:'10%', left:'28%', width:320, height:320, borderRadius:'50%', background:'rgba(13,92,56,0.3)', filter:'blur(90px)', zIndex:1, pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'15%', left:'4%', width:250, height:250, borderRadius:'50%', background:'rgba(200,168,75,0.1)', filter:'blur(70px)', zIndex:1, pointerEvents:'none' }} />

      {/* Partikel bintang */}
      {PARTICLES.map((p, i) => (
        <div key={i} style={{ position:'absolute', top:p.top, left:p.left, width:p.sz, height:p.sz, borderRadius:'50%', background:'#c8a84b', opacity:0.55, animation:`twinkle ${p.d} ease-in-out infinite`, zIndex:1, pointerEvents:'none' }} />
      ))}

      {/* KONTEN */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'100px 24px 80px', position:'relative', zIndex:10, width:'100%' }}>
        <div style={{ maxWidth: 680 }}>

          {/* KIRI */}
          <div style={fade('0s')}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8, marginBottom:24,
              background:'rgba(255,255,255,0.07)', border:'1px solid rgba(200,168,75,0.5)',
              borderRadius:99, padding:'7px 18px', animation:'badgePulse 3s ease-in-out infinite',
            }}>
              <Star size={14} color="#c8a84b" fill="#c8a84b" />
              <span style={{ color:'rgba(255,255,255,0.92)', fontSize:13, fontWeight:600 }}>Berdiri Sejak 1973</span>
            </div>

            <h1 style={{ fontSize:'clamp(36px,5.5vw,62px)', fontWeight:800, color:'#fff', lineHeight:1.1, marginBottom:12 }}>
              Pondok Pesantren<br />
              <span style={{ color:'#c8a84b' }}>Nurul Iman</span>
            </h1>

            <p style={{ fontFamily:"'Scheherazade New',serif", fontSize:28, color:'rgba(200,168,75,0.85)', marginBottom:16, lineHeight:1.5 }}>نُوْرُ الإِيْمَان</p>

            <p style={{ fontSize:15, color:'rgba(255,255,255,0.75)', lineHeight:1.9, marginBottom:30, maxWidth:460 }}>
              Mencetak generasi Qurani yang berakhlak mulia, berilmu tinggi, dan bermanfaat bagi umat dan bangsa berdasarkan{' '}
              <strong style={{ color:'#fff' }}>Ahlussunnah Wal Jama&apos;ah</strong>.
            </p>

            <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginBottom:28 }}>
              <Link href="/pendaftaran" style={{
                display:'inline-flex', alignItems:'center', gap:9, padding:'13px 26px',
                borderRadius:13, background:'#c8a84b', color:'#fff', fontWeight:700,
                fontSize:15, textDecoration:'none', boxShadow:'0 4px 22px rgba(200,168,75,0.4)',
                transition:'transform .2s, box-shadow .2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 28px rgba(200,168,75,0.55)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 22px rgba(200,168,75,0.4)'}}>
                Daftar Sekarang <ArrowRight size={17} />
              </Link>
              <Link href="/profil" style={{
                display:'inline-flex', alignItems:'center', gap:9, padding:'13px 26px',
                borderRadius:13, border:'2px solid rgba(255,255,255,0.45)', color:'#fff',
                fontWeight:700, fontSize:15, textDecoration:'none', transition:'all .2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)';e.currentTarget.style.borderColor='#fff'}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(255,255,255,0.45)'}}>
                Tentang Kami
              </Link>
            </div>

            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:18 }}>
              {TAGS.map(t=>(
                <span key={t} style={{ fontSize:12, padding:'6px 13px', borderRadius:9, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.18)', color:'rgba(255,255,255,0.88)', fontWeight:500 }}>✓ {t}</span>
              ))}
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:7, color:'rgba(255,255,255,0.4)', fontSize:13 }}>
              <MapPin size={14} color="#c8a84b" />
              Jl. Sukamenak, Desa Cisalak, Kab. Subang, Jawa Barat 41283
            </div>
          </div>

        </div>
      </div>

      {/* Wave bawah */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:10 }}>
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 70L60 62C120 54 240 38 360 33C480 28 600 38 720 42C840 47 960 47 1080 42C1200 38 1320 28 1380 23L1440 18V70H0Z" fill="white" />
        </svg>
      </div>

      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(-50%); }
          50%       { transform: translateY(calc(-50% - 14px)); }
        }
        @keyframes spinA { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinB { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes twinkle {
          0%,100% { opacity:.55; transform:scale(1); }
          50%      { opacity:.1;  transform:scale(1.6); }
        }
        @keyframes badgePulse {
          0%,100% { box-shadow:0 0 0 0 rgba(200,168,75,0); }
          50%      { box-shadow:0 0 0 7px rgba(200,168,75,0.15); }
        }
      `}</style>
    </section>
  )
}