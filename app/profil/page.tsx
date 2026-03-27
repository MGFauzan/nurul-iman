import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MapPin, Mail, Calendar, Award, Star, Users, Target, Heart, BookOpen } from 'lucide-react'

export const metadata = { title:'Profil Pesantren' }

const S = {
  badge: { display:'inline-block' as const, background:'#e8f5e9', color:'#0d5c38', fontWeight:600, fontSize:12, padding:'5px 16px', borderRadius:99, marginBottom:10 } as React.CSSProperties,
  h2: { fontSize:'clamp(22px,3.5vw,30px)', fontWeight:800, color:'#0d5c38', marginBottom:8 } as React.CSSProperties,
}
const INFO = [
  { icon:Calendar, label:'Berdiri',      value:'Tahun 1973 (52 Tahun)' },
  { icon:MapPin,   label:'Alamat',       value:'Jl. Sukamenak, Desa Cisalak, Kec. Cisalak, Kab. Subang, Jawa Barat 41283' },
  { icon:Mail,     label:'Email',        value:'ppnurulimancisalak@gmail.com' },
  { icon:Users,    label:'Santri Aktif', value:'150+ Santri' },
  { icon:Award,    label:'Hafidz',       value:'30+ Hafidz/Hafidzah' },
  { icon:Star,     label:'Pengajar',     value:'5 Pengajar Berpengalaman' },
]
const SEJARAH = [
  { tahun:'1973',   judul:'Berdirinya Pesantren',  isi:'K.H. Moh. Hasanudin mendirikan Pesantren Nurul Iman di atas tanah wakaf ±900m² di Desa Cisalak, Kabupaten Subang. Dengan semangat dakwah beliau memulai perjalanan panjang mencerdaskan umat.' },
  { tahun:'1980an', judul:'Perkembangan Awal',     isi:'Pesantren mulai dikenal di wilayah Cisalak. Santri berdatangan dari berbagai daerah. Kurikulum diperkaya kitab-kitab klasik.' },
  { tahun:'2000an', judul:'Era Modernisasi',       isi:'Pesantren menambah program Pencak Silat, Marawis & Hadroh, serta pelatihan komputer untuk era digital.' },
  { tahun:'2016',   judul:'Estafet Kepemimpinan',  isi:'Setelah wafatnya K.H. Moh. Hasanudin, kepemimpinan dilanjutkan K.H. Muhammad Toha (Buya), menantu beliau.' },
  { tahun:'2025',   judul:'Nurul Iman Hari Ini',   isi:'Kini berdiri 52 tahun dengan 150+ santri aktif, 5 pengajar, dan 30+ hafidz/hafidzah.' },
]
const MISI = [
  'Pendidikan agama Islam berbasis kitab kuning dan Al-Quran',
  'Membentuk karakter santri berakhlak mulia dan bertanggung jawab',
  'Tahfidz Al-Quran minimal Juz 30',
  'Nahwu & Shorof dengan Metode Tabulas yang efektif',
  "Seni Islami (Marawis, Hadroh, Qiro'atul Qur'an)",
  'Pencak Silat untuk pengembangan jiwa bela diri',
  'Pelatihan komputer untuk era digital',
  "Menjaga tradisi keilmuan Ahlussunnah Wal Jama'ah",
]

// Panel foto — pakai <img> biasa agar tidak butuh 'use client'
// onError diganti dengan CSS trick: sembunyikan img jika gagal, tampilkan fallback
function FotoPanel({ src, alt, bg }: { src:string; alt:string; bg:string }) {
  return (
    <div style={{ position:'relative', background:bg, minHeight:340 }}>
      {/* Foto — jika 404 akan diganti fallback oleh browser via style */}
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit:'cover', objectPosition:'center top' }}
        // Fallback huruf Arab akan tampil di belakang gambar
        // Jika foto ada, gambar akan menutup huruf
      />

      {/* Gradient bawah */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:80, background:'linear-gradient(to top,rgba(0,0,0,0.5),transparent)', zIndex:2 }} />
    </div>
  )
}

export default function ProfilPage() {
  return (
    <>
      <Navbar />
      <main style={{paddingTop:64,fontFamily:'Poppins,sans-serif'}}>

        {/* Header */}
        <section style={{background:'linear-gradient(135deg,#063320 0%,#0d5c38 50%,#0a4d2e 100%)',padding:'62px 24px',textAlign:'center'}}>
          <span style={{...S.badge,background:'rgba(255,255,255,0.12)',color:'rgba(255,255,255,0.9)',border:'1px solid rgba(255,255,255,0.2)'}}>Tentang Kami</span>
          <h1 style={{fontSize:'clamp(24px,5vw,44px)',fontWeight:800,color:'#fff',marginBottom:8}}>Profil Pesantren Nurul Iman</h1>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:14}}>Sejarah, visi misi, dan para pengasuh pesantren</p>
        </section>

        {/* Info */}
        <section style={{padding:'44px 24px',background:'#fff'}}>
          <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:12}}>
            {INFO.map(i=>(
              <div key={i.label} style={{display:'flex',alignItems:'flex-start',gap:12,padding:16,borderRadius:14,border:'1px solid #f1f5f9',background:'#fafafa'}}>
                <div style={{width:38,height:38,background:'#e8f5e9',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><i.icon size={17} color="#0d5c38"/></div>
                <div><p style={{fontSize:11,color:'#9ca3af',marginBottom:2}}>{i.label}</p><p style={{fontSize:13,fontWeight:600,color:'#1a202c',lineHeight:1.4}}>{i.value}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* Sejarah */}
        <section style={{padding:'60px 24px',background:'#f8fafc'}}>
          <div style={{maxWidth:1200,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:38}}><span style={S.badge}>Perjalanan Panjang</span><h2 style={S.h2}>Sejarah Pesantren</h2></div>
            <div style={{display:'flex',flexDirection:'column',gap:12,maxWidth:740,margin:'0 auto'}}>
              {SEJARAH.map((item,i)=>(
                <div key={item.tahun} style={{display:'flex',gap:16,alignItems:'flex-start'}}>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0}}>
                    <div style={{width:50,height:50,background:'#0d5c38',borderRadius:13,display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <span style={{color:'#fff',fontWeight:800,fontSize:10,textAlign:'center',lineHeight:1.3}}>{item.tahun}</span>
                    </div>
                    {i<SEJARAH.length-1&&<div style={{width:2,height:24,background:'#dcfce7',margin:'6px 0'}}/>}
                  </div>
                  <div style={{background:'#fff',borderRadius:14,padding:18,border:'1px solid #f1f5f9',flex:1}}>
                    <h3 style={{fontWeight:700,color:'#1a202c',fontSize:14,marginBottom:6}}>{item.judul}</h3>
                    <p style={{color:'#6b7280',fontSize:13,lineHeight:1.7}}>{item.isi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visi Misi */}
        <section style={{padding:'60px 24px',background:'#fff'}}>
          <div style={{maxWidth:1200,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:30}}><span style={S.badge}>Arah &amp; Tujuan</span><h2 style={S.h2}>Visi &amp; Misi</h2></div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
              <div style={{background:'#0d5c38',borderRadius:20,padding:28,color:'#fff'}}>
                <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:14}}>
                  <div style={{width:42,height:42,background:'rgba(255,255,255,0.18)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center'}}><Target size={20} color="#fff"/></div>
                  <h3 style={{fontSize:20,fontWeight:700}}>Visi</h3>
                </div>
                <p style={{color:'rgba(255,255,255,0.88)',lineHeight:1.8,fontSize:14}}>Menjadi lembaga pendidikan Islam unggulan yang melahirkan generasi Muslim berilmu, berakhlak mulia, dan bermanfaat bagi agama, bangsa, dan sesama berdasarkan Ahlussunnah Wal Jama&apos;ah.</p>
              </div>
              <div style={{background:'#f8fafc',borderRadius:20,padding:28,border:'1px solid #f1f5f9'}}>
                <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:14}}>
                  <div style={{width:42,height:42,background:'#e8f5e9',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center'}}><Heart size={20} color="#0d5c38"/></div>
                  <h3 style={{fontSize:20,fontWeight:700,color:'#1a202c'}}>Misi</h3>
                </div>
                <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:7}}>
                  {MISI.map((m,i)=>(
                    <li key={i} style={{display:'flex',gap:10,fontSize:13,color:'#374151',alignItems:'flex-start'}}>
                      <span style={{width:20,height:20,background:'#0d5c38',color:'#fff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</span>
                      <span style={{lineHeight:1.6}}>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pengasuh & Pendiri ── */}
        <section style={{padding:'60px 24px',background:'#f0fdf4'}}>
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:40}}><span style={S.badge}>Kepemimpinan</span><h2 style={S.h2}>Pengasuh &amp; Pendiri</h2></div>
            <div style={{display:'flex',flexDirection:'column',gap:28}}>

              {/* PENDIRI — foto KIRI */}
              <div style={{background:'#fff',borderRadius:22,overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',display:'grid',gridTemplateColumns:'280px 1fr',minHeight:340}}>
                <div style={{position:'relative'}}>
                  <FotoPanel src="/images/pendiri.jpg" alt="K.H. Moh. Hasanudin" bg="linear-gradient(160deg,#374151,#1f2937)" />
                  <div style={{position:'absolute',top:16,left:16,background:'#c8a84b',color:'#fff',fontSize:10,fontWeight:700,padding:'4px 12px',borderRadius:99,letterSpacing:1,zIndex:3}}>PENDIRI PESANTREN</div>
                </div>
                <div style={{padding:'32px 30px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                  <h3 style={{fontSize:22,fontWeight:800,color:'#1a202c',marginBottom:4}}>K.H. Moh. Hasanudin</h3>
                  <p style={{color:'#9ca3af',fontSize:13,marginBottom:18}}>Pendiri &amp; Pengasuh Pertama (1973 — wafat)</p>
                  <p style={{color:'#374151',lineHeight:1.85,fontSize:14,marginBottom:22}}>
                    K.H. Moh. Hasanudin adalah pendiri Pondok Pesantren Nurul Iman. Beliau mendirikan pesantren di atas tanah wakaf ±900m² di Desa Cisalak pada 1973. Dengan penuh keikhlasan dan semangat dakwah, beliau membangun lembaga pendidikan yang hingga kini melahirkan banyak generasi Muslim berakhlak mulia.
                  </p>
                  <div style={{background:'#f8fafc',borderRadius:12,padding:'14px 18px',textAlign:'center',border:'1px solid #f1f5f9',alignSelf:'flex-start'}}>
                    <p style={{fontFamily:"'Scheherazade New',serif",fontSize:21,color:'#c8a84b',marginBottom:4}}>رَحِمَهُ اللهُ وَغَفَرَ لَهُ</p>
                    <p style={{color:'#9ca3af',fontSize:12,fontStyle:'italic'}}>Semoga Allah merahmati dan mengampuni beliau</p>
                  </div>
                </div>
              </div>

              {/* PIMPINAN — foto KANAN */}
              <div style={{background:'#fff',borderRadius:22,overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,0.08)',border:'1px solid #f1f5f9',display:'grid',gridTemplateColumns:'1fr 280px',minHeight:340}}>
                <div style={{padding:'32px 30px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                  <div style={{display:'inline-block',background:'#c8a84b',color:'#fff',fontSize:10,fontWeight:700,padding:'4px 12px',borderRadius:99,marginBottom:12,letterSpacing:1,alignSelf:'flex-start'}}>PIMPINAN SAAT INI</div>
                  <h3 style={{fontSize:22,fontWeight:800,color:'#1a202c',marginBottom:4}}>K.H. Muhammad Toha</h3>
                  <p style={{color:'#9ca3af',fontSize:13,marginBottom:18}}>Buya · Pimpinan Pesantren (2016 — sekarang)</p>
                  <p style={{color:'#374151',lineHeight:1.85,fontSize:14,marginBottom:22}}>
                    K.H. Muhammad Toha (Buya) adalah menantu almarhum K.H. Moh. Hasanudin. Beliau meneruskan estafet kepemimpinan sejak 2016 dengan mempertahankan tradisi keilmuan yang telah dibangun pendirinya.
                  </p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                    {['Tafsir Al-Quran','Hadits','Fikih','Ilmu Falak','Nahwu Shorof'].map(k=>(
                      <span key={k} style={{background:'#e8f5e9',color:'#0d5c38',fontSize:12,fontWeight:600,padding:'5px 14px',borderRadius:99}}>{k}</span>
                    ))}
                  </div>
                </div>
                <div style={{position:'relative'}}>
                  <div style={{position:'absolute',top:16,right:16,background:'#0d5c38',color:'#fff',fontSize:10,fontWeight:700,padding:'4px 12px',borderRadius:99,letterSpacing:1,zIndex:3}}>AKTIF</div>
                  <FotoPanel src="/images/pengasuh.jpg" alt="K.H. Muhammad Toha" bg="linear-gradient(160deg,#0d5c38,#063320)" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Lokasi */}
        <section style={{padding:'60px 24px',background:'#fff'}}>
          <div style={{maxWidth:660,margin:'0 auto',textAlign:'center'}}>
            <span style={S.badge}>Lokasi</span>
            <h2 style={{...S.h2,marginBottom:22}}>Temukan Kami</h2>
            <div style={{background:'#f8fafc',borderRadius:18,padding:30,border:'1px solid #f1f5f9'}}>
              <div style={{width:50,height:50,background:'#e8f5e9',borderRadius:13,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}><BookOpen size={23} color="#0d5c38"/></div>
              <h3 style={{fontWeight:700,fontSize:17,color:'#1a202c',marginBottom:7}}>Pondok Pesantren Nurul Iman</h3>
              <p style={{color:'#6b7280',lineHeight:1.7,marginBottom:18,fontSize:14}}>Jl. Sukamenak No.2, RT.02/RW.1, Sukakerti, Kec. Cisalak,<br/>Kabupaten Subang, Jawa Barat 41283</p>
              <a href="https://maps.app.goo.gl/fpmgw7iJQkNskckQA" target="_blank" rel="noopener noreferrer"
                style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 20px',borderRadius:11,background:'#0d5c38',color:'#fff',fontWeight:600,fontSize:13,textDecoration:'none'}}>
                <MapPin size={15}/>Buka di Google Maps
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer/>
    </>
  )
}
