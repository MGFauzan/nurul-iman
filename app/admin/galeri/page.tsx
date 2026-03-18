'use client'
import{useState,useEffect,useRef}from 'react'
import{Images,Upload,Trash2,Pencil,Loader2,X,ImageIcon,Check}from 'lucide-react'
import type{Galeri}from '@/lib/types'
const KATS=['Kegiatan','Pengajian','Olahraga','Seni','Wisuda','Lainnya']
const INP:React.CSSProperties={width:'100%',padding:'10px 13px',borderRadius:10,border:'1.5px solid #e5e7eb',fontSize:13,fontFamily:'Poppins,sans-serif',outline:'none',background:'#fff'}
export default function AdminGaleriPage(){
  const[items,setItems]=useState<Galeri[]>([])
  const[load,setLoad]=useState(true)
  const[uploading,setUploading]=useState(false)
  const[del,setDel]=useState<number|null>(null)
  const[editItem,setEditItem]=useState<Galeri|null>(null)
  const[ef,setEf]=useState({judul:'',kategori:''})
  const[uf,setUf]=useState({judul:'',kategori:'Kegiatan'})
  const[files,setFiles]=useState<File[]>([])
  const[success,setSuccess]=useState('')
  const ref=useRef<HTMLInputElement>(null)
  async function fetch_(){setLoad(true);try{const r=await fetch('/api/galeri');const d=await r.json() as{success:boolean;items:Galeri[]};if(d.success)setItems(d.items)}finally{setLoad(false)}}
  useEffect(()=>{fetch_()},[])
  async function upload(e:React.FormEvent){
    e.preventDefault()
    if(!files.length){alert('Pilih foto');return}
    if(!uf.judul.trim()){alert('Judul wajib');return}
    setUploading(true)
    try{
      for(const f of files){
        const fd=new FormData();fd.append('file',f);fd.append('category','galeri')
        const up=await fetch('/api/upload',{method:'POST',body:fd});const ud=await up.json() as{success:boolean;url?:string}
        if(ud.success&&ud.url)await fetch('/api/galeri',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({judul:files.length>1?`${uf.judul} - ${f.name.split('.')[0]}`:uf.judul,gambar:ud.url,kategori:uf.kategori})})
      }
      setSuccess(`${files.length} foto berhasil diupload`);setFiles([]);setUf({judul:'',kategori:'Kegiatan'})
      if(ref.current)ref.current.value='';fetch_();setTimeout(()=>setSuccess(''),3000)
    }catch(e){alert(String(e))}finally{setUploading(false)}
  }
  async function remove(id:number){
    if(!confirm('Hapus foto ini?'))return;setDel(id)
    try{await fetch(`/api/galeri?id=${id}`,{method:'DELETE'});setItems(p=>p.filter(x=>x.id!==id))}finally{setDel(null)}
  }
  async function saveEdit(e:React.FormEvent){
    e.preventDefault();if(!editItem)return
    await fetch('/api/galeri',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:editItem.id,...ef})})
    setEditItem(null);fetch_()
  }
  return(
    <div style={{padding:'26px',fontFamily:'Poppins,sans-serif'}} className="pl-14 lg:pl-7">
      <div style={{marginBottom:20}}><h1 style={{fontSize:21,fontWeight:800,color:'#1a202c',display:'flex',alignItems:'center',gap:8}}><Images size={21} color="#0d5c38"/>Kelola Galeri</h1><p style={{color:'#9ca3af',fontSize:13,marginTop:2}}>{items.length} foto</p></div>
      {success&&<div style={{marginBottom:14,padding:'11px 14px',background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:10,color:'#16a34a',fontSize:13,display:'flex',alignItems:'center',gap:7}}><Check size={15}/>{success}</div>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:18}}>
        <div style={{background:'#fff',borderRadius:15,padding:20,boxShadow:'0 1px 6px rgba(0,0,0,.06)',border:'1px solid #f1f5f9',alignSelf:'start'}}>
          <h3 style={{fontWeight:700,fontSize:14,color:'#1a202c',marginBottom:16,display:'flex',alignItems:'center',gap:7}}><Upload size={15} color="#0d5c38"/>Upload Foto</h3>
          <form onSubmit={upload} style={{display:'flex',flexDirection:'column',gap:13}}>
            <div><label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:5}}>Judul Foto *</label><input value={uf.judul} onChange={e=>setUf(p=>({...p,judul:e.target.value}))} style={INP} placeholder="Nama kegiatan/foto"/></div>
            <div><label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:5}}>Kategori</label><select value={uf.kategori} onChange={e=>setUf(p=>({...p,kategori:e.target.value}))} style={INP}>{KATS.map(k=><option key={k} value={k}>{k}</option>)}</select></div>
            <div>
              <label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:5}}>Pilih Foto</label>
              <div onClick={()=>ref.current?.click()} style={{border:'1.5px dashed #e5e7eb',borderRadius:11,padding:'20px 14px',textAlign:'center',cursor:'pointer',background:'#fafafa'}}>
                <ImageIcon size={24} color="#9ca3af" style={{margin:'0 auto 7px'}}/><p style={{fontSize:13,color:'#6b7280'}}>Klik atau drag foto</p><p style={{fontSize:11,color:'#9ca3af',marginTop:3}}>PNG, JPG, WebP maks 5MB</p>
                <input ref={ref} type="file" accept="image/*" multiple style={{display:'none'}} onChange={e=>setFiles(Array.from(e.target.files??[]))}/>
              </div>
              {files.length>0&&<div style={{marginTop:7,display:'flex',flexDirection:'column',gap:3}}>{files.map((f,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:7,background:'#f8fafc',borderRadius:7,padding:'5px 9px',fontSize:12,color:'#6b7280'}}><ImageIcon size={11}/><span style={{flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.name}</span><span>{(f.size/1024).toFixed(0)}KB</span></div>)}</div>}
            </div>
            <button type="submit" disabled={uploading||files.length===0} style={{padding:'10px 0',borderRadius:10,background:uploading||files.length===0?'#9ca3af':'#0d5c38',color:'#fff',fontWeight:700,fontSize:13,border:'none',cursor:uploading||files.length===0?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:7,fontFamily:'Poppins,sans-serif'}}>
              {uploading?<><Loader2 size={15} className="spin"/>Uploading...</>:<><Upload size={15}/>Upload{files.length>0?` (${files.length})`:''}</>}
            </button>
          </form>
        </div>
        <div style={{background:'#fff',borderRadius:15,padding:20,boxShadow:'0 1px 6px rgba(0,0,0,.06)',border:'1px solid #f1f5f9'}}>
          <h3 style={{fontWeight:700,fontSize:14,color:'#1a202c',marginBottom:16}}>Koleksi Foto ({items.length})</h3>
          {load?<div style={{display:'flex',justifyContent:'center',padding:'36px 0'}}><Loader2 size={24} color="#0d5c38" className="spin"/></div>
          :items.length>0?<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))',gap:11}}>
            {items.map(g=>(
              <div key={g.id} style={{position:'relative',aspectRatio:'1',borderRadius:11,overflow:'hidden',background:'#e8f5e9'}}>
                {g.gambar&&!g.gambar.startsWith('/images/placeholder')?<img src={g.gambar} alt={g.judul} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}><ImageIcon size={22} color="#a7f3d0"/></div>}
                <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0)',transition:'background .2s',display:'flex',alignItems:'center',justifyContent:'center',gap:5}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='rgba(0,0,0,0.6)';e.currentTarget.querySelectorAll<HTMLElement>('.ov').forEach(b=>b.style.opacity='1')}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='rgba(0,0,0,0)';e.currentTarget.querySelectorAll<HTMLElement>('.ov').forEach(b=>b.style.opacity='0')}}>
                  <button className="ov" onClick={()=>{setEditItem(g);setEf({judul:g.judul,kategori:g.kategori})}} style={{opacity:0,transition:'opacity .2s',width:28,height:28,borderRadius:7,background:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><Pencil size={13} color="#d97706"/></button>
                  <button className="ov" onClick={()=>remove(g.id)} disabled={del===g.id} style={{opacity:0,transition:'opacity .2s',width:28,height:28,borderRadius:7,background:'#fff',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>{del===g.id?<Loader2 size={13} color="#dc2626" className="spin"/>:<Trash2 size={13} color="#dc2626"/>}</button>
                </div>
                <div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(to top,rgba(0,0,0,0.7),transparent)',padding:'10px 7px 5px'}}>
                  <p style={{color:'#fff',fontSize:10,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{g.judul}</p>
                </div>
              </div>
            ))}
          </div>:<div style={{textAlign:'center',padding:'36px 0',color:'#9ca3af'}}><Images size={34} color="#e5e7eb" style={{margin:'0 auto 9px'}}/><p>Belum ada foto. Upload dulu!</p></div>}
        </div>
      </div>
      {editItem&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
        <div style={{background:'#fff',borderRadius:17,padding:22,width:'100%',maxWidth:340,boxShadow:'0 20px 60px rgba(0,0,0,0.25)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}><h3 style={{fontWeight:700,fontSize:15,color:'#1a202c'}}>Edit Foto</h3><button onClick={()=>setEditItem(null)} style={{background:'none',border:'none',cursor:'pointer',color:'#9ca3af'}}><X size={18}/></button></div>
          <form onSubmit={saveEdit} style={{display:'flex',flexDirection:'column',gap:13}}>
            <div><label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:5}}>Judul</label><input value={ef.judul} onChange={e=>setEf(p=>({...p,judul:e.target.value}))} style={INP} required/></div>
            <div><label style={{display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:5}}>Kategori</label><select value={ef.kategori} onChange={e=>setEf(p=>({...p,kategori:e.target.value}))} style={INP}>{KATS.map(k=><option key={k} value={k}>{k}</option>)}</select></div>
            <div style={{display:'flex',gap:9,marginTop:3}}>
              <button type="button" onClick={()=>setEditItem(null)} style={{flex:1,padding:'9px 0',borderRadius:9,border:'1px solid #e5e7eb',background:'#fff',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'Poppins,sans-serif'}}>Batal</button>
              <button type="submit" style={{flex:1,padding:'9px 0',borderRadius:9,background:'#0d5c38',color:'#fff',fontSize:13,fontWeight:700,border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6,fontFamily:'Poppins,sans-serif'}}>Simpan</button>
            </div>
          </form>
        </div>
      </div>}
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}.spin{animation:spin 1s linear infinite}`}</style>
    </div>
  )
}
