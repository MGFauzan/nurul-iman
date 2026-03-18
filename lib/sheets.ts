export async function kirimKeSheets(data: Record<string, string | null | undefined>): Promise<void> {
  const url = process.env.GOOGLE_SCRIPT_URL
  if (!url) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, tanggal: new Date().toLocaleString('id-ID') }),
    })
  } catch { /* silent — jangan gagalkan pendaftaran */ }
}
