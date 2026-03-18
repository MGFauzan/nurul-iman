import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import AdminSidebar from '@/components/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let username = ''
  try {
    const store = await cookies()
    const token = store.get('admin_token')?.value
    if (token) { const u = await verifyToken(token); if (u) username = u.username }
  } catch { /* middleware handles redirect */ }
  if (!username) return <>{children}</>
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f8fafc', fontFamily:'Poppins,sans-serif' }}>
      <AdminSidebar username={username} />
      <div style={{ flex:1, minWidth:0, paddingLeft:0 }}>{children}</div>
    </div>
  )
}
