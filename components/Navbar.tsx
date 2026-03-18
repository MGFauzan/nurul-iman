'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, BookOpen } from 'lucide-react'

const LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/berita', label: 'Berita' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/pendaftaran', label: 'Pendaftaran' },
]
const G = '#0d5c38', GOLD = '#c8a84b'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [path])

  const active = (href: string) => href === '/' ? path === href : path.startsWith(href)

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)', boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 6px rgba(0,0,0,0.05)', transition: 'box-shadow .3s', fontFamily: 'Poppins,sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 40, height: 40, background: G, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={20} color="#fff" />
          </div>
          <div className="hidden sm:block">
            <div style={{ fontWeight: 600, fontSize: 12, color: G, lineHeight: 1.2 }}>Pondok Pesantren</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: GOLD, lineHeight: 1.2 }}>Nurul Iman</div>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 3 }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} style={{ padding: '8px 13px', borderRadius: 9, fontWeight: 500, fontSize: 14, textDecoration: 'none', background: active(l.href) ? G : 'transparent', color: active(l.href) ? '#fff' : '#374151', transition: 'all .2s' }}>
              {l.label}
            </Link>
          ))}
          <Link href="/pendaftaran" style={{ marginLeft: 8, padding: '9px 18px', borderRadius: 10, background: GOLD, color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Daftar Sekarang
          </Link>
        </div>

        <button className="flex md:hidden" onClick={() => setOpen(v => !v)} style={{ padding: 8, borderRadius: 9, border: 'none', background: 'transparent', cursor: 'pointer' }}>
          {open ? <X size={24} color="#374151" /> : <Menu size={24} color="#374151" />}
        </button>
      </div>

      {open && (
        <div style={{ padding: '8px 20px 16px', borderTop: '1px solid #f1f5f9' }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} style={{ display: 'block', padding: '11px 13px', borderRadius: 10, margin: '3px 0', fontWeight: 500, textDecoration: 'none', background: active(l.href) ? G : 'transparent', color: active(l.href) ? '#fff' : '#374151' }}>
              {l.label}
            </Link>
          ))}
          <Link href="/pendaftaran" style={{ display: 'block', padding: '11px 13px', borderRadius: 10, marginTop: 6, background: GOLD, color: '#fff', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
            Daftar Sekarang
          </Link>
        </div>
      )}
    </header>
  )
}
