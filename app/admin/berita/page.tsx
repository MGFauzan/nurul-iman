'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Newspaper, Plus, Pencil, Trash2, Eye, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import type { Berita } from '@/lib/types'
function fd(s:string){try{return new Date(s).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})}catch{return s}}
const TH:React.CSSProperties={padding:'9px 14px',textAlign:'left',fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:.5,whiteSpace:'nowrap'}
const TD:React.CSSProperties={padding:'12px 14px',borderBottom:'1px solid #f8fafc',fontSize:13,color:'#374151',verticalAlign:'middle'}
export default function AdminBeritaPage(){
  const[items,setItems]=useState<Berita[]>([])
  const[total,setTotal]=useState(0)
  const[page,setPage]=useState(1)
  const[loading,setLoading]=useState(true)
  const[del,setDel]=useState<number|null>(null)
  async function load(p:number){
    setLoading(true)
    try{const r=await fetch(`/api/berita?all=1&page=${p}&limit=10`);const d=await r.json() as{success:boolean;items:Berita[];total:number};if(d.success){setItems(d.items);setTotal(d.total)}}finally{setLoading(false)}
  }
  useEffect(()=>{load(page)},[page])
  async function remove(id:number,judul:string){
    if(!confirm(`Hapus "${judul}"?`))return
    setDel(id);try{await fetch(`/api/berita?id=${id}`,{method:'DELETE'});load(page)}finally{setDel(null)}
  }
  const totalPages=Math.ceil(total/10)
  return(
    <div style={{padding:'28px',fontFamily:'Poppins,sans-serif',paddingLeft:'28px'}} className="lg:pl-7 pl-14">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:22}}>
        <div><h1 style={{fontSize:21,fontWeight:800,color:'#1a202c',display:'flex',alignItems:'center',gap:8}}><Newspaper size={21} color="#0d5c38"/>Kelola Berita</h1><p style={{color:'#9ca3af',fontSize:13,marginTop:2}}>{total} total berita</p></div>
        <Link href="/admin/berita/tambah" style={{display:'inline-flex',alignItems:'center',gap:7,padding:'9px 17px',borderRadius:10,background:'#0d5c38',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none'}}><Plus size={15}/>Tambah</Link>
      </div>
      <div style={{background:'#fff',borderRadius:15,boxShadow:'0 1px 6px rgba(0,0,0,.06)',border:'1px solid #f1f5f9',overflow:'hidden'}}>
        {loading?<div style={{display:'flex',justifyContent:'center',padding:'56px 0'}}><Loader2 size={26} color="#0d5c38" className="spin"/></div>
        :items.length>0?(<>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead style={{background:'#f8fafc'}}><tr>{['No','Judul','Kategori','Tanggal','Status','Aksi'].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
              <tbody>{items.map((b,i)=>(
                <tr key={b.id}>
                  <td style={{...TD,color:'#9ca3af',width:44}}>{(page-1)*10+i+1}</td>
                  <td style={TD}><p style={{fontWeight:600,color:'#1a202c',marginBottom:2,maxWidth:280,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b.judul}</p><p style={{fontSize:11,color:'#9ca3af'}}>{b.slug}</p></td>
                  <td style={TD}><span style={{background:'#e8f5e9',color:'#0d5c38',fontSize:11,fontWeight:600,padding:'2px 9px',borderRadius:99}}>{b.kategori}</span></td>
                  <td style={{...TD,whiteSpace:'nowrap',color:'#6b7280'}}>{fd(b.tanggal)}</td>
                  <td style={TD}><span style={{background:b.is_published?'#dcfce7':'#f1f5f9',color:b.is_published?'#16a34a':'#6b7280',fontSize:11,fontWeight:600,padding:'2px 9px',borderRadius:99}}>{b.is_published?'Publik':'Draft'}</span></td>
                  <td style={TD}><div style={{display:'flex',gap:5}}>
                    <Link href={`/berita/${b.slug}`} target="_blank" style={{width:28,height:28,borderRadius:7,background:'#eff6ff',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}><Eye size={13} color="#2563eb"/></Link>
                    <Link href={`/admin/berita/${b.id}/edit`} style={{width:28,height:28,borderRadius:7,background:'#fffbeb',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}><Pencil size={13} color="#d97706"/></Link>
                    <button onClick={()=>remove(b.id,b.judul)} disabled={del===b.id} style={{width:28,height:28,borderRadius:7,background:'#fef2f2',display:'flex',alignItems:'center',justifyContent:'center',border:'none',cursor:'pointer'}}>
                      {del===b.id?<Loader2 size={13} color="#dc2626" className="spin"/>:<Trash2 size={13} color="#dc2626"/>}
                    </button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          {totalPages>1&&<div style={{display:'flex',justifyContent:'center',gap:7,padding:'12px',borderTop:'1px solid #f8fafc'}}>
            <button onClick={()=>setPage(p=>p-1)} disabled={page===1} style={{width:32,height:32,borderRadius:8,border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',opacity:page===1?.4:1}}><ChevronLeft size={15}/></button>
            {Array.from({length:totalPages},(_,i)=>i+1).map(n=><button key={n} onClick={()=>setPage(n)} style={{width:32,height:32,borderRadius:8,border:'1px solid',borderColor:n===page?'#0d5c38':'#e5e7eb',background:n===page?'#0d5c38':'#fff',color:n===page?'#fff':'#374151',cursor:'pointer',fontWeight:600,fontSize:13}}>{n}</button>)}
            <button onClick={()=>setPage(p=>p+1)} disabled={page===totalPages} style={{width:32,height:32,borderRadius:8,border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',opacity:page===totalPages?.4:1}}><ChevronRight size={15}/></button>
          </div>}
        </>):<div style={{textAlign:'center',padding:'56px 0',color:'#9ca3af'}}><Newspaper size={38} color="#e5e7eb" style={{margin:'0 auto 10px'}}/><p style={{marginBottom:14}}>Belum ada berita</p><Link href="/admin/berita/tambah" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'8px 16px',borderRadius:9,background:'#0d5c38',color:'#fff',fontWeight:600,fontSize:13,textDecoration:'none'}}><Plus size={14}/>Tambah Pertama</Link></div>}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}.spin{animation:spin 1s linear infinite}`}</style>
    </div>
  )
}
