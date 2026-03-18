import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { dbGetStats, dbGetBerita, dbGetPendaftaran } from '@/lib/db'
import { fmtDateShort } from '@/lib/utils'
import { Newspaper, Images, Users, UserCheck, Plus, Upload, Eye, TrendingUp, Clock } from 'lucide-react'
export const metadata = { title:'Dashboard Admin' }
export default async function DashboardPage() {
  const user = await getUser(); if (!user) redirect('/admin/login')
  const [stats, { items:berita }, { items:pend }] = await Promise.all([dbGetStats(), dbGetBerita(1,5,false), dbGetPendaftaran(1,5)])
  const statCards = [
    { icon:Newspaper, label:'Total Berita',          val:stats.berita,      color:'#16a34a', bg:'#f0fdf4', href:'/admin/berita' },
    { icon:Images,    label:'Total Foto',             val:stats.galeri,      color:'#2563eb', bg:'#eff6ff', href:'/admin/galeri' },
    { icon:Users,     label:'Pendaftaran',            val:stats.pendaftaran, color:'#d97706', bg:'#fffbeb', href:'/admin/pendaftaran' },
    { icon:UserCheck, label:'Menunggu Konfirmasi',    val:stats.pending,     color:'#dc2626', bg:'#fef2f2', href:'/admin/pendaftaran' },
  ]
  const quickActions = [
    { icon:Plus,   label:'Tambah Berita', href:'/admin/berita/tambah', bg:'#16a34a' },
    { icon:Upload, label:'Upload Foto',   href:'/admin/galeri',        bg:'#2563eb' },
    { icon:Eye,    label:'Lihat Website', href:'/', target:'_blank',   bg:'#7c3aed' },
    { icon:Users,  label:'Data Santri',   href:'/admin/pendaftaran',   bg:'#d97706' },
  ]
  return (
    <div style={{padding:'28px',fontFamily:'Poppins,sans-serif'}}>
      <div style={{marginBottom:24}}>
        <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:3}}><TrendingUp size={21} color="#0d5c38"/><h1 style={{fontSize:22,fontWeight:800,color:'#1a202c'}}>Dashboard</h1></div>
        <p style={{color:'#9ca3af',fontSize:13,display:'flex',alignItems:'center',gap:5}}><Clock size={13}/>Selamat datang kembali, <strong style={{color:'#0d5c38',marginLeft:3}}>{user.username}</strong></p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(195px,1fr))',gap:14,marginBottom:24}}>
        {statCards.map(c=>(
          <Link key={c.label} href={c.href} style={{background:'#fff',borderRadius:15,padding:18,boxShadow:'0 1px 6px rgba(0,0,0,0.06)',border:'1px solid #f1f5f9',textDecoration:'none',display:'block'}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:12}}>
              <div style={{width:38,height:38,background:c.bg,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}><c.icon size={19} color={c.color}/></div>
              <span style={{fontSize:11,color:'#9ca3af',background:'#f8fafc',padding:'2px 9px',borderRadius:8}}>Lihat</span>
            </div>
            <div style={{fontSize:26,fontWeight:800,color:c.color,marginBottom:2}}>{c.val}</div>
            <div style={{fontSize:13,color:'#6b7280'}}>{c.label}</div>
          </Link>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,2fr) minmax(0,1fr)',gap:18}} className="block lg:grid">
        <div style={{background:'#fff',borderRadius:15,boxShadow:'0 1px 6px rgba(0,0,0,0.06)',border:'1px solid #f1f5f9',overflow:'hidden'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 18px',borderBottom:'1px solid #f8fafc'}}>
            <h2 style={{fontWeight:700,color:'#1a202c',fontSize:14,display:'flex',alignItems:'center',gap:7}}><Newspaper size={15} color="#0d5c38"/>Berita Terbaru</h2>
            <Link href="/admin/berita/tambah" style={{display:'inline-flex',alignItems:'center',gap:5,padding:'6px 13px',borderRadius:9,background:'#0d5c38',color:'#fff',fontWeight:600,fontSize:12,textDecoration:'none'}}><Plus size={13}/>Tambah</Link>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
              <thead style={{background:'#f8fafc'}}>
                <tr>{['Judul','Kategori','Tanggal','Status',''].map(h=><th key={h} style={{padding:'9px 14px',textAlign:'left',fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:.5}}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {berita.map(b=>(
                  <tr key={b.id} style={{borderBottom:'1px solid #f8fafc'}}>
                    <td style={{padding:'11px 14px',fontWeight:500,color:'#1a202c',maxWidth:220,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b.judul}</td>
                    <td style={{padding:'11px 14px'}}><span style={{background:'#e8f5e9',color:'#0d5c38',fontSize:11,fontWeight:600,padding:'2px 9px',borderRadius:99}}>{b.kategori}</span></td>
                    <td style={{padding:'11px 14px',color:'#6b7280',whiteSpace:'nowrap'}}>{fmtDateShort(b.tanggal)}</td>
                    <td style={{padding:'11px 14px'}}><span style={{background:b.is_published?'#dcfce7':'#f1f5f9',color:b.is_published?'#16a34a':'#6b7280',fontSize:11,fontWeight:600,padding:'2px 9px',borderRadius:99}}>{b.is_published?'Publik':'Draft'}</span></td>
                    <td style={{padding:'11px 14px'}}><Link href={`/admin/berita/${b.id}/edit`} style={{color:'#d97706',fontSize:12,fontWeight:600,textDecoration:'none'}}>Edit</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{background:'#fff',borderRadius:15,padding:'16px 18px',boxShadow:'0 1px 6px rgba(0,0,0,0.06)',border:'1px solid #f1f5f9'}}>
            <h2 style={{fontWeight:700,color:'#1a202c',fontSize:14,marginBottom:12}}>Aksi Cepat</h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:9}}>
              {quickActions.map(a=>(
                <Link key={a.label} href={a.href} {...(a.target?{target:a.target}:{})} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:7,padding:'15px 8px',borderRadius:12,background:a.bg,textDecoration:'none'}}>
                  <a.icon size={21} color="#fff"/>
                  <span style={{color:'#fff',fontSize:11,fontWeight:600,textAlign:'center',lineHeight:1.3}}>{a.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div style={{background:'#fff',borderRadius:15,padding:'16px 18px',boxShadow:'0 1px 6px rgba(0,0,0,0.06)',border:'1px solid #f1f5f9'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
              <h2 style={{fontWeight:700,color:'#1a202c',fontSize:14,display:'flex',alignItems:'center',gap:7}}><Users size={14} color="#0d5c38"/>Pendaftaran Terbaru</h2>
              <Link href="/admin/pendaftaran" style={{fontSize:11,color:'#0d5c38',textDecoration:'none'}}>Lihat Semua</Link>
            </div>
            {pend.length>0?pend.map(p=>(
              <div key={p.id} style={{display:'flex',alignItems:'center',gap:10,marginBottom:9}}>
                <div style={{width:30,height:30,background:'#e8f5e9',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <span style={{color:'#0d5c38',fontWeight:800,fontSize:12}}>{p.nama_lengkap[0]?.toUpperCase()}</span>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:13,fontWeight:600,color:'#1a202c',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.nama_lengkap}</p>
                  <p style={{fontSize:11,color:'#9ca3af'}}>{p.program?.split('(')[0].trim()??'Belum pilih program'}</p>
                </div>
                <span style={{background:p.status==='Diterima'?'#dcfce7':p.status==='Ditolak'?'#fef2f2':'#fffbeb',color:p.status==='Diterima'?'#16a34a':p.status==='Ditolak'?'#dc2626':'#d97706',fontSize:11,fontWeight:600,padding:'2px 9px',borderRadius:99}}>{p.status}</span>
              </div>
            )):<div style={{textAlign:'center',padding:'20px 0',color:'#9ca3af',fontSize:13}}><Users size={26} color="#e5e7eb" style={{margin:'0 auto 7px'}}/>Belum ada pendaftaran</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
