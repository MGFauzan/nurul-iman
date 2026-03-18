export function fmtDate(s: string, opts?: Intl.DateTimeFormatOptions): string {
  try {
    return new Date(s).toLocaleDateString('id-ID', opts ?? { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return s }
}

export function fmtDateShort(s: string): string {
  return fmtDate(s, { day: '2-digit', month: 'short', year: 'numeric' })
}

export function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + '...' : s
}
