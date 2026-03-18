'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, ImageIcon } from 'lucide-react'
import type { Berita } from '@/lib/types'
const KATS=['Umum','Pengumuman','Kegiatan','Prestasi']
const TOOLBAR=[{cmd:'bold',label:'B',st:{fontWeight:800}},{cmd:'italic',label:'I',st:{fontStyle:'italic'}},{cmd:'underline',label:'U',st:{textDecoration:'underline'}},{cmd:'insertUnorderedList',label:'• List',st:{}},{cmd:'insertOrderedList',label:'1. List',st:{}}]
export default function EditBeritaPage({params}:{params:Promise<{id:string}>}){
  const{id}=use(params)
  const router=useRouter()
  const[loading,setLoading]=useState(false)
  const[fetching,setFetching]=useState(true)
  const[err,setErr]=useState('')
  const[img,setImg]=useState('')
  const[imgLoad,setImgLoad]=useState(false)
  const[form,setForm]=useState({judul:'',ringkasan:'',isi:'',kategori:'Umum',is_published:1})
  const[editorKey,setEditorKey]=useState(0)
  function s(k:string,v:string|number){setForm(p=>({...p,[k]:v}))}
  useEffect(()=>{
    async function load(){
      try{const r=await fetch(`/api/berita?all=1&page=1&limit=100`);const d=await r.json() as{success:boolean;items:Berita[]};const b=d.items?.find(x=>x.id===parseInt(id));if(b){setForm({judul:b.judul,ringkasan:b.ringkasan??'',isi:b.isi,kategori:b.kategori,is_published:b.is_published});setImg(b.gambar??'');setEditorKey(k=>k+1)}}catch(e){setErr(String(e))}finally{setFetching(false)}
    }
    load()
  },[id])
  async function handleImg(e:React.ChangeEvent<HTMLInputElement>){
    const f=e.target.files?.[0];if(!f)return
    setImgLoad(true);try{const fd=new FormData();fd.append('file',f);fd.append('category','berita');const r=await fetch('/api/upload',{method:'POST',body:fd});const d=await r.json() as{success:boolean;url?:string};if(d.success&&d.url)setImg(d.url)}catch(e){alert(String(e))}finally{setImgLoad(false)}
  }
  async function submit(e:React.FormEvent){
    e.preventDefault()
    if(!form.judul.trim()){setErr('Judul wajib');return}
    setLoading(true);setErr('')
    try{const r=await fetch('/api/berita',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:parseInt(id),...form,gambar:img||null})});const d=await r.json() as{success:boolean;message?:string};if(d.success){router.push('/admin/berita');router.refresh()}else setErr(d.message??'Gagal')}
    catch(e){setErr(String(e))}finally{setLoading(false)}
  }
  const INP:React.CSSProperties={width:'100%',padding:'11px 14px',borderRadius:11,border:'1.5px solid #e5e7eb',fontSize:14,color:'#374151',outline:'none',fontFamily:'Poppins,sans-serif',background:'#fff'}
  if(fetching)return<div style={{display:'flex',justifyContent:'center',padding:'80px 0'}}><Loader2 size={28} color="#0d5c38" className="spin"/></div>
  return(
    <div style={{padding:'26px',fontFamily:'Poppins,sans-serif'}} className="pl-14 lg:pl-7">
      <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:22}}>
        <Link href="/admin/berita" style={{width:36,height:36,borderRadius:9,border:'1px solid #e5e7eb',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}><ArrowLeft size={17} color="#374151"/></Link>
        <div><h1 style={{fontSize:20,fontWeight:800,color:'#1a202c'}}>Edit Berita</h1><p style={{color:'#9ca3af',fontSize:12}}>Perbarui artikel berita</p></div>
      </div>
      {err&&<div style={{marginBottom:14,padding:'11px 14px',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:10,color:'#dc2626',fontSize:13}}>⚠️ {err}</div>}
      <form onSubmit={submit}>
        <div style={{display:'grid',gridTemplateColumns:'minmax(0,2.2fr) minmax(0,1fr)',gap:18,alignItems:'start'}}>
          <div style={{background:'#fff',borderRadius:15,padding:22,boxShadow:'0 1px 6px rgba(0,0,0,.06)',border:'1px solid #f1f5f9',display:'flex',flexDirection:'column',gap:16}}>
            <div><label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6}}>Judul *</label><input value={form.judul} onChange={e=>s('judul',e.target.value)} style={{...INP,fontSize:15,fontWeight:600}} required/></div>
            <div><label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6}}>Ringkasan</label><textarea value={form.ringkasan} onChange={e=>s('ringkasan',e.target.value)} rows={2} style={{...INP,resize:'none'}}/></div>
            <div>
              <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6}}>Isi Berita *</label>
              <div style={{border:'1.5px solid #e5e7eb',borderRadius:11,overflow:'hidden'}}>
                <div style={{display:'flex',flexWrap:'wrap',gap:4,padding:7,borderBottom:'1px solid #f1f5f9',background:'#f8fafc'}}>
                  {TOOLBAR.map(b=><button key={b.cmd} type="button" onMouseDown={e=>{e.preventDefault();document.execCommand(b.cmd,false)}} style={{padding:'3px 9px',borderRadius:6,border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer',fontSize:13,fontFamily:'Poppins,sans-serif',...b.st}}>{b.label}</button>)}
                  <button type="button" onMouseDown={e=>{e.preventDefault();document.execCommand('formatBlock',false,'h2')}} style={{padding:'3px 9px',borderRadius:6,border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer',fontSize:13,fontWeight:700,fontFamily:'Poppins,sans-serif'}}>H2</button>
                </div>
                <div key={editorKey} contentEditable suppressContentEditableWarning dangerouslySetInnerHTML={{__html:form.isi}} onInput={e=>s('isi',(e.currentTarget as HTMLDivElement).innerHTML)} className="editor" data-placeholder="Isi berita..."/>
              </div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{background:'#fff',borderRadius:15,padding:18,boxShadow:'0 1px 6px rgba(0,0,0,.06)',border:'1px solid #f1f5f9'}}>
              <h3 style={{fontWeight:700,fontSize:14,color:'#1a202c',marginBottom:14}}>Pengaturan</h3>
              <div style={{marginBottom:13}}><label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6}}>Kategori</label><select value={form.kategori} onChange={e=>s('kategori',e.target.value)} style={INP}>{KATS.map(k=><option key={k} value={k}>{k}</option>)}</select></div>
              <div style={{marginBottom:16}}>
                <label style={{display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}}>
                  <span style={{fontSize:13,fontWeight:600,color:'#374151'}}>Publikasikan</span>
                  <div onClick={()=>s('is_published',form.is_published===1?0:1)} style={{width:42,height:23,borderRadius:99,background:form.is_published===1?'#0d5c38':'#e5e7eb',cursor:'pointer',position:'relative',transition:'background .2s'}}>
                    <div style={{width:17,height:17,background:'#fff',borderRadius:'50%',position:'absolute',top:3,left:form.is_published===1?22:3,transition:'left .2s',boxShadow:'0 1px 3px rgba(0,0,0,.2)'}}/>
                  </div>
                </label>
              </div>
              <button type="submit" disabled={loading} style={{width:'100%',padding:'11px 0',borderRadius:10,background:loading?'#9ca3af':'#0d5c38',color:'#fff',fontWeight:700,fontSize:14,border:'none',cursor:loading?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:7,fontFamily:'Poppins,sans-serif'}}>
                {loading?<><Loader2 size={15} className="spin"/>Menyimpan...</>:<><Save size={15}/>Update Berita</>}
              </button>
            </div>
            <div style={{background:'#fff',borderRadius:15,padding:18,boxShadow:'0 1px 6px rgba(0,0,0,.06)',border:'1px solid #f1f5f9'}}>
              <h3 style={{fontWeight:700,fontSize:14,color:'#1a202c',marginBottom:12}}>Gambar</h3>
              {img&&<div style={{position:'relative',marginBottom:10}}><img src={img} alt="preview" style={{width:'100%',borderRadius:9,aspectRatio:'16/9',objectFit:'cover'}}/><button type="button" onClick={()=>setImg('')} style={{position:'absolute',top:5,right:5,background:'rgba(0,0,0,0.5)',border:'none',borderRadius:'50%',width:22,height:22,cursor:'pointer',color:'#fff',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>×</button></div>}
              <label style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'14px 12px',borderRadius:9,border:'1.5px dashed #e5e7eb',cursor:'pointer',background:'#fafafa',textAlign:'center'}}>
                <ImageIcon size={20} color="#9ca3af"/><span style={{fontSize:12,color:'#6b7280'}}>{imgLoad?'Mengupload...':'Klik untuk ganti gambar'}</span>
                <input type="file" accept="image/*" onChange={handleImg} disabled={imgLoad} style={{display:'none'}}/>
              </label>
            </div>
          </div>
        </div>
      </form>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}.spin{animation:spin 1s linear infinite}`}</style>
    </div>
  )
}
