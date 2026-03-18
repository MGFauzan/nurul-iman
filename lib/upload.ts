// lib/upload.ts — Node.js compatible (no edge runtime required)
export async function uploadFile(file: File, category: string): Promise<string> {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (!allowed.includes(file.type)) throw new Error('Format tidak didukung. Gunakan JPG, PNG, atau WebP.')
  if (file.size > 5 * 1024 * 1024) throw new Error('Ukuran file maks 5MB.')

  // Coba R2 (production Cloudflare)
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getRequestContext } = require('@cloudflare/next-on-pages')
    const bucket = getRequestContext()?.env?.BUCKET as R2Bucket | undefined
    if (bucket) {
      const key = `${category}/${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '-')}`
      await bucket.put(key, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type, cacheControl: 'public,max-age=31536000' },
      })
      const base = process.env.R2_PUBLIC_URL ?? ''
      return base ? `${base}/${key}` : `/uploads/${key}`
    }
  } catch { /* fallback ke base64 */ }

  // Dev fallback: base64 data URL (gambar tetap bisa ditampilkan)
  const buf = await file.arrayBuffer()
  const bytes = new Uint8Array(buf)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i])
  const b64 = btoa(binary)
  return `data:${file.type};base64,${b64}`
}