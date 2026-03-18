'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Newspaper, Images, Users, Globe, LogOut, Menu, X, BookOpen, ChevronRight } from 'lucide-react'

const NAV = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', group: 'main' },
  { href: '/admin/berita', icon: Newspaper, label: 'Kelola Berita', group: 'konten' },
  { href: '/admin/galeri', icon: Images, label: 'Kelola Galeri', group: 'konten' },
  { href: '/admin/pendaftaran', icon: Users, label: 'Pendaftaran', group: 'konten' },
]

export default function AdminSidebar({ username }: { username: string }) {
  const [mobile, setMobile] = useState(false)
  const path = usePathname()
  const router = useRouter()

  function isActive(href: string) {
    return href === '/admin/dashboard' ? path === href : path.startsWith(href)
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const NavContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{ padding: '18px 14px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 38, height: 38, background: '#c8a84b', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <BookOpen size={19} color="#fff" />
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Nurul Iman</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '0 8px', marginBottom: 5 }}>Menu Utama</p>
        {NAV.filter(n => n.group === 'main').map(n => (
          <Link key={n.href} href={n.href} onClick={() => setMobile(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 2, textDecoration: 'none', background: isActive(n.href) ? 'rgba(255,255,255,0.15)' : 'transparent', color: isActive(n.href) ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: isActive(n.href) ? 600 : 400, fontSize: 14 }}>
            <n.icon size={17} /><span style={{ flex: 1 }}>{n.label}</span>{isActive(n.href) && <ChevronRight size={13} />}
          </Link>
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '12px 4px 8px' }} />
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '0 8px', marginBottom: 5 }}>Konten</p>
        {NAV.filter(n => n.group === 'konten').map(n => (
          <Link key={n.href} href={n.href} onClick={() => setMobile(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 2, textDecoration: 'none', background: isActive(n.href) ? 'rgba(255,255,255,0.15)' : 'transparent', color: isActive(n.href) ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: isActive(n.href) ? 600 : 400, fontSize: 14 }}>
            <n.icon size={17} /><span style={{ flex: 1 }}>{n.label}</span>{isActive(n.href) && <ChevronRight size={13} />}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '10px 10px 14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, textDecoration: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 4 }}>
          <Globe size={16} /><span>Lihat Website</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: 10, marginBottom: 5 }}>
          <div style={{ width: 30, height: 30, background: '#c8a84b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>{username[0]?.toUpperCase()}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{username}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Administrator</p>
          </div>
        </div>
        <button onClick={logout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 14, fontFamily: 'Poppins,sans-serif' }}>
          <LogOut size={16} /><span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block" style={{ width: 238, background: '#0a4d2e', height: '100vh', position: 'sticky', top: 0, flexShrink: 0, fontFamily: 'Poppins,sans-serif' }}>
        <NavContent />
      </aside>

      {/* Mobile burger */}
      <button className="lg:hidden" onClick={() => setMobile(true)} style={{ position: 'fixed', top: 14, left: 14, zIndex: 40, background: '#0d5c38', border: 'none', borderRadius: 10, padding: 9, cursor: 'pointer' }}>
        <Menu size={20} color="#fff" />
      </button>

      {mobile && <div className="lg:hidden" onClick={() => setMobile(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }} />}

      <aside className="lg:hidden" style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 255, background: '#0a4d2e', zIndex: 50, fontFamily: 'Poppins,sans-serif', transform: mobile ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform .3s ease' }}>
        <button onClick={() => setMobile(false)} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, padding: 6, cursor: 'pointer', color: '#fff' }}>
          <X size={17} />
        </button>
        <NavContent />
      </aside>
    </>
  )
}
