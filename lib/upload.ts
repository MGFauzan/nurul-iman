export async function uploadFile(file: File, category: string): Promise<string> {
  const allowed = ['image/jpeg','image/jpg','image/png','image/gif','image/webp']
  if (!allowed.includes(file.type)) throw new Error('Format tidak didukung')
  if (file.size > 5 * 1024 * 1024) throw new Error('File maks 5MB')

  // Try R2 in Cloudflare Workers runtime
  try {
    if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bucket = (globalThis as any).__cloudflare?.env?.BUCKET as R2Bucket | undefined
      if (bucket) {
        const key = `${category}/${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi,'-')}`
        await bucket.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type, cacheControl: 'public,max-age=31536000' } })
        const base = process.env.R2_PUBLIC_URL ?? ''
        return base ? `${base}/${key}` : `/uploads/${key}`
      }
    }
  } catch { /* fallback */ }

  // Dev fallback: base64
  const buf = await file.arrayBuffer()
  const bytes = new Uint8Array(buf)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i])
  return `data:${file.type};base64,${btoa(binary)}`
}