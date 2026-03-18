'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ImageIcon, X, ZoomIn, Loader2 } from 'lucide-react'
import type { Galeri } from '@/lib/types'

const CATS = ['Semua', 'Kegiatan', 'Pengajian', 'Olahraga', 'Seni', 'Wisuda', 'Lainnya']

export default function GaleriPage() {
  const [items, setItems] = useState<Galeri[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<Galeri | null>(null)
  const [filter, setFilter] = useState('Semua')

  useEffect(() => {
    fetch('/api/galeri')
      .then(r => r.json())
      .then((d) => {
        const data = d as { success: boolean; items: Galeri[] }
        if (data.success) setItems(data.items)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'Semua' ? items : items.filter(g => g.kategori === filter)

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 64, fontFamily: 'Poppins,sans-serif' }}>
        {/* Header */}
        <section style={{ background: 'linear-gradient(135deg,#063320 0%,#0d5c38 50%,#0a4d2e 100%)', padding: '60px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(24px,5vw,42px)', fontWeight: 800, color: '#fff', marginBottom: 8 }}>Galeri Kegiatan</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Momen berharga kegiatan santri Pondok Pesantren Nurul Iman</p>
        </section>

        <section style={{ padding: '36px 24px', background: '#f8fafc', minHeight: '60vh' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>

            {/* Filter kategori */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{
                  padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  border: `1px solid ${filter === c ? '#0d5c38' : '#e5e7eb'}`,
                  background: filter === c ? '#0d5c38' : '#fff',
                  color: filter === c ? '#fff' : '#6b7280',
                  fontFamily: 'Poppins,sans-serif',
                }}>
                  {c}
                </button>
              ))}
            </div>

            {/* Grid */}
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
                <Loader2 size={32} color="#0d5c38" className="spin" />
              </div>
            ) : filtered.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
                {filtered.map(g => (
                  <div key={g.id} onClick={() => setActive(g)}
                    style={{ aspectRatio: '1', borderRadius: 14, overflow: 'hidden', background: '#e8f5e9', position: 'relative', cursor: 'pointer' }}>
                    {g.gambar ? (
                      <img src={g.gambar} alt={g.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                        <ImageIcon size={28} color="#a7f3d0" />
                        <span style={{ color: '#6ee7b7', fontSize: 11, textAlign: 'center', padding: '0 10px' }}>{g.judul}</span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,92,56,0)', transition: 'background .25s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = 'rgba(13,92,56,0.7)'
                        el.querySelector<HTMLElement>('.ov')!.style.opacity = '1'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = 'rgba(13,92,56,0)'
                        el.querySelector<HTMLElement>('.ov')!.style.opacity = '0'
                      }}>
                      <div className="ov" style={{ opacity: 0, transition: 'opacity .25s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <ZoomIn size={24} color="#fff" />
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: 12, textAlign: 'center', padding: '0 8px' }}>{g.judul}</span>
                      </div>
                    </div>
                    {/* Badge kategori */}
                    <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(13,92,56,0.85)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '2px 9px', borderRadius: 99 }}>
                      {g.kategori}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
                <ImageIcon size={48} color="#e5e7eb" style={{ margin: '0 auto 14px' }} />
                <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>
                  {filter === 'Semua' ? 'Belum ada foto' : `Belum ada foto kategori "${filter}"`}
                </p>
                <p style={{ fontSize: 13 }}>Foto akan segera ditambahkan oleh admin</p>
              </div>
            )}

          </div>
        </section>
      </main>

      {/* Lightbox */}
      {active && (
        <div onClick={() => setActive(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <button onClick={() => setActive(null)}
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <X size={20} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 860, width: '100%' }}>
            {active.gambar ? (
              <img src={active.gambar} alt={active.judul} style={{ width: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: 12 }} />
            ) : (
              <div style={{ width: '100%', height: 300, background: '#0d5c38', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon size={56} color="rgba(255,255,255,0.25)" />
              </div>
            )}
            <div style={{ padding: '12px 4px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{active.judul}</p>
              <span style={{ background: '#c8a84b', color: '#fff', fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 99 }}>{active.kategori}</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
      <Footer />
    </>
  )
}