import Link from 'next/link'
import { MapPin, Mail, Clock, BookOpen, Heart, Lock } from 'lucide-react'

const G = '#0d5c38', GOLD = '#c8a84b'

export default function Footer() {
  return (
    <footer style={{ background: '#063320', color: '#fff', fontFamily: 'Poppins,sans-serif' }}>
      <div style={{ background: '#0a4d2e', padding: '13px 0', textAlign: 'center' }}>
        <span style={{ fontFamily: "'Scheherazade New',serif", fontSize: 22, color: GOLD, letterSpacing: 3 }}>بسم الله الرحمن الرحيم</span>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '44px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 36 }}>
        <div style={{ gridColumn: 'span 2' }} className="lg:col-span-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, background: GOLD, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BookOpen size={22} color="#fff" /></div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17 }}>Nurul Iman</div>
              <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 12 }}>Pondok Pesantren</div>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,.62)', lineHeight: 1.8, fontSize: 13, maxWidth: 360, marginBottom: 12 }}>
            Berdiri sejak 1973, mendidik generasi Islami yang berilmu, berakhlak mulia, dan bermanfaat bagi agama dan bangsa berdasarkan Ahlussunnah Wal Jama&apos;ah.
          </p>
          <p style={{ fontFamily: "'Scheherazade New',serif", fontSize: 18, color: GOLD }}>اَلْعِلْمُ بِلَا عَمَلٍ كَالشَّجَرِ بِلَا ثَمَرٍ</p>
          <p style={{ color: 'rgba(255,255,255,.35)', fontSize: 12, fontStyle: 'italic', marginTop: 4 }}>&ldquo;Ilmu tanpa amal seperti pohon tanpa buah&rdquo;</p>
        </div>

        <div>
          <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: GOLD }}>Navigasi</h3>
          {[['/', 'Beranda'], ['/profil', 'Profil Pesantren'], ['/berita', 'Berita & Kegiatan'], ['/galeri', 'Galeri Foto'], ['/pendaftaran', 'Pendaftaran Santri']].map(([href, label]) => (
            <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,.62)', textDecoration: 'none', fontSize: 13, marginBottom: 9 }}>
              <span style={{ width: 5, height: 5, background: GOLD, borderRadius: '50%', flexShrink: 0 }} />{label}
            </Link>
          ))}
        </div>

        <div>
          <h3 style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: GOLD }}>Kontak</h3>
          {[
            { icon: MapPin, text: 'Jl. Sukamenak, Desa Cisalak\nKec. Cisalak, Kab. Subang\nJawa Barat 41283' },
            { icon: Mail, text: 'ppnurulimancisalak@gmail.com' },
            { icon: Clock, text: 'Subuh · Dzuhur · Maghrib\nSenin — Jumat' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: 'flex', gap: 9, marginBottom: 12 }}>
              <Icon size={14} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ color: 'rgba(255,255,255,.62)', fontSize: 13, lineHeight: 1.65, whiteSpace: 'pre-line' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <p style={{ color: 'rgba(255,255,255,.3)', fontSize: 12, margin: 0 }}>&copy; {new Date().getFullYear()} Pondok Pesantren Nurul Iman</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ color: 'rgba(255,255,255,.3)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              Dibuat dengan <Heart size={11} color="#ef4444" fill="#ef4444" /> untuk pesantren
            </span>
            <Link href="/admin/login" title="Login Admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(255,255,255,.2)', textDecoration: 'none', padding: '3px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,.1)' }}>
              <Lock size={10} /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
