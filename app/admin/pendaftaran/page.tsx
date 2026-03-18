'use client'
import{useState,useEffect}from 'react'
import{Users,ChevronLeft,ChevronRight,Loader2,Phone,Download,X}from 'lucide-react'
import type{Pendaftaran}from '@/lib/types'
function fd(s:string){try{return new Date(s).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})}catch{return s}}
const TH:React.CSSProperties={padding:'9px 13px',textAlign:'left',fontSize:11,fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:.5,whiteSpace:'nowrap'}
const TD:React.CSSProperties={padding:'11px 13px',borderBottom:'1px solid #f8fafc',fontSize:13,color:'#374151',verticalAlign:'middle'}
function badge(s:string){return{background:s==='Diterima'?'#dcfce7':s==='Ditolak'?'#fef2f2':'#fffbeb',color:s==='Diterima'?'#16a34a':s==='Ditolak'?'#dc2626':'#d97706',fontSize:11,fontWeight:600,padding:'2px 9px',borderRadius:99} as React.CSSProperties}
export default function AdminPendaftaranPage(){
  const[items,setItems]=useState<Pendaftaran[]>([])
  const[total,setTotal]=useState(0)
  const[page,setPage]=useState(1)
  const[loading,setLoading]=useState(true)
  const[updating,setUpdating]=useState<number|null>(null)
  const[detail,setDetail]=useState<Pendaftaran|null>(null)
  async function load(p:number){
    setLoading(true);try{const r=await fetch(`/api/pendaftaran?page=${p}`);const d=await r.json() as{success:boolean;items:Pendaftaran[];total:number};if(d.success){setItems(d.items);setTotal(d.total)}}finally{setLoading(false)}
  }
  useEffect(()=>{load(page)},[page])
  async function updateStatus(id:number,status:string){
    setUpdating(id);try{await fetch('/api/pendaftaran',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})});load(page)}finally{setUpdating(null)}
  }
  function exportCSV(){
    if(!items.length)return
    const hdr=['No','Nama','Tempat Lahir','Tgl Lahir','JK','Sekolah','Orang Tua','HP','Alamat','Program','Status','Tgl Daftar']
    const rows=items.map((p,i)=>[i+1,p.nama_lengkap,p.tempat_lahir,p.tanggal_lahir,p.jenis_kelamin,p.asal_sekolah,p.nama_orang_tua,p.nomor_hp,`"${p.alamat.replace(/"/g,'""')}"`,p.program??'-',p.status,fd(p.tanggal_daftar)])
    const csv=[hdr,...rows].map(r=>r.join(',')).join('\n')
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=`pendaftaran-${new Date().toISOString().split('T')[0]}.csv`;a.click()
  }
  const totalPages=Math.ceil(total/15)
  return(
    <div style={{padding:'26px',fontFamily:'Poppins,sans-serif'}} className="pl-14 lg:pl-7">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:22}}>
        <div><h1 style={{fontSize:21,fontWeight:800,color:'#1a202c',display:'flex',alignItems:'center',gap:8}}><Users size={21} color="#0d5c38"/>Data Pendaftaran</h1><p style={{color:'#9ca3af',fontSize:13,marginTop:2}}>{total} total pendaftar</p></div>
        <button onClick={exportCSV} style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 16px',borderRadius:10,background:'#fff',color:'#374151',fontWeight:600,fontSize:13,border:'1px solid #e5e7eb',cursor:'pointer',fontFamily:'Poppins,sans-serif'}}><Download size={15}/>Export CSV</button>
      </div>
      <div style={{background:'#fff',borderRadius:15,boxShadow:'0 1px 6px rgba(0,0,0,.06)',border:'1px solid #f1f5f9',overflow:'hidden'}}>
        {loading?<div style={{display:'flex',justifyContent:'center',padding:'56px 0'}}><Loader2 size={26} color="#0d5c38" className="spin"/></div>
        :items.length>0?(<>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead style={{background:'#f8fafc'}}><tr>{['No','Nama Santri','Sekolah','Program','Orang Tua','No HP','Tanggal','Status','Aksi'].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
              <tbody>{items.map((p,i)=>(
                <tr key={p.id}>
                  <td style={{...TD,color:'#9ca3af',width:38}}>{(page-1)*15+i+1}</td>
                  <td style={TD}><p style={{fontWeight:600,color:'#1a202c',marginBottom:2}}>{p.nama_lengkap}</p><p style={{fontSize:11,color:'#9ca3af'}}>{p.tempat_lahir}, {p.tanggal_lahir} · {p.jenis_kelamin}</p></td>
                  <td style={{...TD,maxWidth:130,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.asal_sekolah}</td>
                  <td style={TD}><span style={{background:'#e8f5e9',color:'#0d5c38',fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:99,whiteSpace:'nowrap'}}>{p.program?p.program.split('(')[0].trim().substring(0,20)??'-':'-'}</span></td>
                  <td style={{...TD,maxWidth:120,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.nama_orang_tua}</td>
                  <td style={TD}><a href={`tel:${p.nomor_hp}`} style={{color:'#0d5c38',fontSize:12,textDecoration:'none',display:'flex',alignItems:'center',gap:4}}><Phone size={11}/>{p.nomor_hp}</a></td>
                  <td style={{...TD,whiteSpace:'nowrap',color:'#6b7280'}}>{fd(p.tanggal_daftar)}</td>
                  <td style={TD}><span style={badge(p.status)}>{p.status}</span></td>
                  <td style={TD}><div style={{display:'flex',alignItems:'center',gap:5}}>
                    <select value={p.status} onChange={e=>updateStatus(p.id,e.target.value)} disabled={updating===p.id} style={{fontSize:12,border:'1px solid #e5e7eb',borderRadius:8,padding:'4px 7px',outline:'none',cursor:'pointer',fontFamily:'Poppins,sans-serif'}}>
                      {['Pending','Diterima','Ditolak'].map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                    {updating===p.id&&<Loader2 size={12} color="#0d5c38" className="spin"/>}
                    <button onClick={()=>setDetail(detail?.id===p.id?null:p)} style={{fontSize:11,color:'#2563eb',background:'none',border:'none',cursor:'pointer',fontFamily:'Poppins,sans-serif',whiteSpace:'nowrap'}}>Detail</button>
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
        </>):<div style={{textAlign:'center',padding:'56px 0',color:'#9ca3af'}}><Users size={38} color="#e5e7eb" style={{margin:'0 auto 10px'}}/><p>Belum ada data pendaftaran</p></div>}
      </div>
      {detail&&(<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:100,display:'flex',alignItems:'flex-end',justifyContent:'center',padding:16}} onClick={()=>setDetail(null)}>
        <div style={{background:'#fff',borderRadius:'18px 18px 0 0',padding:22,width:'100%',maxWidth:500,maxHeight:'85vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}><h3 style={{fontWeight:700,fontSize:15,color:'#1a202c'}}>Detail Pendaftaran</h3><button onClick={()=>setDetail(null)} style={{background:'none',border:'none',cursor:'pointer',color:'#9ca3af'}}><X size={19}/></button></div>
          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            {[['Nama Lengkap',detail.nama_lengkap],['Tempat, Tgl Lahir',`${detail.tempat_lahir}, ${detail.tanggal_lahir}`],['Jenis Kelamin',detail.jenis_kelamin],['Asal Sekolah',detail.asal_sekolah],['Nama Orang Tua',detail.nama_orang_tua],['Nomor HP',detail.nomor_hp],['Alamat',detail.alamat],['Program',detail.program??'-'],['Status',detail.status],['Tanggal Daftar',fd(detail.tanggal_daftar)]].map(([l,v])=>(
              <div key={l} style={{display:'grid',gridTemplateColumns:'140px 1fr',gap:8,padding:'9px 0',borderBottom:'1px solid #f8fafc',fontSize:13}}>
                <span style={{color:'#9ca3af',fontWeight:500}}>{l}</span><span style={{color:'#1a202c',fontWeight:500}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:9,marginTop:18}}>
            <a href={`https://wa.me/${detail.nomor_hp.replace(/[^0-9]/g,'').replace(/^0/,'62')}?text=${encodeURIComponent(
`Assalamu'alaikum Wr. Wb.

Kepada Yth. Bapak/Ibu *${detail.nama_orang_tua}*,

Kami dari *Pondok Pesantren Nurul Iman* Cisalak, Subang menghubungi terkait pendaftaran putra/putri Bapak/Ibu:

📋 *Data Pendaftar:*
• Nama   : ${detail.nama_lengkap}
• Program: ${detail.program ?? '-'}
• Status  : ${detail.status}

Mohon konfirmasi kehadiran untuk proses selanjutnya.

Jazakumullahu khairan 🙏
_Pondok Pesantren Nurul Iman_`)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,padding:'10px 0',borderRadius:10,background:'#22c55e',color:'#fff',fontWeight:700,fontSize:13,textDecoration:'none',textAlign:'center',display:'block'}}>💬 WhatsApp</a>
            <button onClick={()=>setDetail(null)} style={{flex:1,padding:'10px 0',borderRadius:10,border:'1px solid #e5e7eb',background:'#fff',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'Poppins,sans-serif'}}>Tutup</button>
          </div>
        </div>
      </div>)}
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}.spin{animation:spin 1s linear infinite}`}</style>
    </div>
  )
}