import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import { dbGetBerita, dbGetGaleri } from '@/lib/db'
import { fmtDateShort } from '@/lib/utils'
import { ArrowRight, BookOpen, Users, Star, Award, Music, Sword, Monitor, Heart, Tag, Calendar, ImageIcon } from 'lucide-react'

const UNGGULAN = [
  { icon: BookOpen, title: 'Nahwu & Shorof', desc: 'Metode Tabulas yang efektif dan mudah dipahami', bg: '#e8f5e9', c: '#0d5c38' },
  { icon: Star, title: 'Tahfidz Al-Quran', desc: 'Target minimal hafal Juz 30 selama pendidikan', bg: '#eff6ff', c: '#1d4ed8' },
  { icon: Heart, title: 'Ahlussunnah Wal Jamaah', desc: 'Aqidah lurus berdasarkan ajaran ulama salaf', bg: '#faf5ff', c: '#7c3aed' },
  { icon: Award, title: 'Kutubus Salaf', desc: 'Mempelajari kitab-kitab klasik ulama terdahulu', bg: '#fff7ed', c: '#c2410c' },
  { icon: Music, title: 'Marawis & Hadroh', desc: 'Kesenian Islami kebanggaan pesantren', bg: '#fdf2f8', c: '#be185d' },
  { icon: Sword, title: 'Pencak Silat', desc: 'Bela diri tradisional untuk jiwa yang kuat', bg: '#fef2f2', c: '#dc2626' },
  { icon: Monitor, title: 'Pelatihan Komputer', desc: 'Persiapan santri menghadapi era digital', bg: '#f0fdfa', c: '#0f766e' },
  { icon: Users, title: 'Pengajar Berpengalaman', desc: '5 pengajar berdedikasi dengan keahlian masing-masing', bg: '#fefce8', c: '#a16207' },
]
const JADWAL = [
  { waktu: 'Subuh', jam: '05.00 — 06.30', hari: 'Senin — Jumat' },
  { waktu: 'Dzuhur', jam: '13.00 — 14.30', hari: 'Senin — Jumat' },
  { waktu: 'Maghrib', jam: '18.00 — 19.30', hari: 'Senin — Jumat' },
  { waktu: "Qiro'atul Qur'an", jam: "Ba'da Maghrib", hari: 'Malam Jumat' },
  { waktu: 'Khitobah / Pidato', jam: "Ba'da Maghrib", hari: 'Malam Minggu' },
]
const KITAB = ['Tajwid','Tahfidz','Akidah','Nahwu','Shorof','Fikih','Tauhid','Hadits','Akhlak','Tashawuf','Tafsir']

export default async function HomePage() {
  const [{ items: berita }, galeri] = await Promise.all([
    dbGetBerita(1, 3, true),
    dbGetGaleri(),
  ])
  const galeriPreview = galeri.slice(0, 6)

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Keunggulan */}
        <section style={{ padding: '72px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <span style={{ display: 'inline-block', background: '#e8f5e9', color: '#0d5c38', fontWeight: 600, fontSize: 12, padding: '5px 16px', borderRadius: 99, marginBottom: 10 }}>Program Unggulan</span>
              <h2 style={{ fontSize: 'clamp(22px,3.5vw,32px)', fontWeight: 800, color: '#0d5c38', marginBottom: 8 }}>Keunggulan Pesantren Nurul Iman</h2>
              <p style={{ color: '#6b7280', fontSize: 14, maxWidth: 480, margin: '0 auto' }}>Program komprehensif yang memadukan ilmu agama, karakter Islami, dan keterampilan modern</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
              {UNGGULAN.map(u => (
                <div key={u.title} style={{ padding: 20, borderRadius: 16, border: '1px solid #f1f5f9', background: '#fafafa' }}>
                  <div style={{ width: 44, height: 44, background: u.bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 13 }}>
                    <u.icon size={22} color={u.c} />
                  </div>
                  <h3 style={{ fontWeight: 700, color: '#1a202c', fontSize: 14, marginBottom: 5 }}>{u.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: 12, lineHeight: 1.6 }}>{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Jadwal */}
        <section style={{ padding: '64px 24px', background: '#f0fdf4' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 44, alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#e8f5e9', color: '#0d5c38', fontWeight: 600, fontSize: 12, padding: '5px 16px', borderRadius: 99, marginBottom: 10 }}>Kegiatan Rutin</span>
              <h2 style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: '#0d5c38', marginBottom: 10 }}>Jadwal Mengaji</h2>
              <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: 22, fontSize: 14 }}>3 kali sehari, 5 hari seminggu, dengan kegiatan tambahan malam Jumat dan malam Minggu.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {JADWAL.map(j => (
                  <div key={j.waktu} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 12, padding: '12px 16px', border: '1px solid #dcfce7' }}>
                    <span style={{ width: 7, height: 7, background: '#0d5c38', borderRadius: '50%', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, color: '#0d5c38', fontSize: 14 }}>{j.waktu}</p>
                      <p style={{ color: '#9ca3af', fontSize: 11 }}>{j.hari}</p>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', background: '#f0fdf4', padding: '3px 10px', borderRadius: 8 }}>{j.jam}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#0a4d2e', borderRadius: 22, padding: 28, color: '#fff' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18, color: '#c8a84b' }}>Kitab yang Dipelajari</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 20 }}>
                {KITAB.map(k => (
                  <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <span style={{ width: 5, height: 5, background: '#c8a84b', borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(255,255,255,0.75)' }}>{k}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 15, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontFamily: "'Scheherazade New',serif", fontSize: 19, color: '#c8a84b', marginBottom: 5 }}>طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ</p>
                <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 12, fontStyle: 'italic' }}>&ldquo;Mencari ilmu itu wajib bagi setiap Muslim&rdquo;</p>
              </div>
            </div>
          </div>
        </section>

        {/* Berita terbaru */}
        <section style={{ padding: '72px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 34 }}>
              <div>
                <span style={{ display: 'inline-block', background: '#e8f5e9', color: '#0d5c38', fontWeight: 600, fontSize: 12, padding: '5px 16px', borderRadius: 99, marginBottom: 7 }}>Informasi</span>
                <h2 style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: '#0d5c38' }}>Berita Terbaru</h2>
              </div>
              <Link href="/berita" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 11, border: '2px solid #0d5c38', color: '#0d5c38', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                Lihat Semua <ArrowRight size={15} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 20 }}>
              {berita.map(b => (
                <Link key={b.id} href={`/berita/${b.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <article style={{ background: '#fff', borderRadius: 17, overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: 190, background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
                      {b.gambar
                        ? <img src={b.gambar} alt={b.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 50, height: 50, background: '#0d5c38', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Tag size={22} color="#fff" /></div>
                            <span style={{ color: '#0d5c38', fontWeight: 500, fontSize: 12 }}>Berita Pesantren</span>
                          </div>}
                      <span style={{ position: 'absolute', top: 11, left: 11, background: '#0d5c38', color: '#fff', fontSize: 11, fontWeight: 600, padding: '3px 11px', borderRadius: 99 }}>{b.kategori}</span>
                    </div>
                    <div style={{ padding: '17px 19px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <p style={{ fontSize: 11, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                        <Calendar size={11} />{fmtDateShort(b.tanggal)}
                      </p>
                      <h3 style={{ fontWeight: 700, color: '#1a202c', fontSize: 15, lineHeight: 1.45, marginBottom: 8, flex: 1 }}>{b.judul}</h3>
                      {b.ringkasan && <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.ringkasan}</p>}
                      <span style={{ color: '#0d5c38', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>Baca Selengkapnya <ArrowRight size={13} /></span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Galeri preview */}
        <section style={{ padding: '72px 24px', background: '#f8fafc' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 34 }}>
              <div>
                <span style={{ display: 'inline-block', background: '#e8f5e9', color: '#0d5c38', fontWeight: 600, fontSize: 12, padding: '5px 16px', borderRadius: 99, marginBottom: 7 }}>Dokumentasi</span>
                <h2 style={{ fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: '#0d5c38' }}>Galeri Kegiatan</h2>
              </div>
              <Link href="/galeri" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 11, border: '2px solid #0d5c38', color: '#0d5c38', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                Lihat Semua <ArrowRight size={15} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
              {galeriPreview.length > 0 ? galeriPreview.map(g => (
                <div key={g.id} style={{ aspectRatio: '1', borderRadius: 14, overflow: 'hidden', background: '#e8f5e9', position: 'relative' }}>
                  {g.gambar
                    ? <img src={g.gambar} alt={g.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
                        <ImageIcon size={28} color="#a7f3d0" />
                        <span style={{ color: '#6ee7b7', fontSize: 11, textAlign: 'center', padding: '0 10px' }}>{g.judul}</span>
                      </div>}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.7),transparent)', padding: '20px 10px 8px' }}>
                    <p style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>{g.judul}</p>
                  </div>
                </div>
              )) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
                  <ImageIcon size={36} color="#e5e7eb" style={{ margin: '0 auto 10px' }} />
                  <p>Foto akan segera ditambahkan</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg,#063320 0%,#0d5c38 50%,#0a4d2e 100%)', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <p style={{ fontFamily: "'Scheherazade New',serif", fontSize: 24, color: '#c8a84b', marginBottom: 10 }}>مَنْ أَرَادَ الدُّنْيَا فَعَلَيْهِ بِالْعِلْمِ، وَمَنْ أَرَادَ الْآخِرَةَ فَعَلَيْهِ بِالْعِلْمِ، وَمَنْ أَرَادَهُمَا فَعَلَيْهِ بِالْعِلْمِ</p>
            <p style={{ color: 'rgba(255,255,255,0.52)', fontStyle: 'italic', marginBottom: 26, fontSize: 13 }}>&ldquo;Siapa yang menginginkan dunia maka hendaknya ia memiliki ilmu, siapa yang menginginkan akhirat maka hendaknya ia memiliki ilmu, dan siapa yang menginginkan keduanya maka hendaknya ia memiliki ilmu.&rdquo;</p>
            <h2 style={{ fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Daftarkan Putra-Putri Anda Sekarang</h2>
            <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 14, marginBottom: 28 }}>Bergabunglah bersama ratusan santri di Pondok Pesantren Nurul Iman</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <Link href="/pendaftaran" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 13, background: '#c8a84b', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Daftar Sekarang <ArrowRight size={17} />
              </Link>
              <Link href="/profil" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 13, border: '2px solid rgba(255,255,255,0.5)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
