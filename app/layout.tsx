import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: { default: 'Pondok Pesantren Nurul Iman — Cisalak, Subang', template: '%s | Pesantren Nurul Iman' },
  description: 'Pondok Pesantren Nurul Iman berdiri sejak 1973 di Cisalak, Kabupaten Subang, Jawa Barat. Mendidik santri dengan kurikulum Ahlussunnah Wal Jamaah, Tahfidz, Nahwu Shorof Metode Tabulas.',
  keywords: ['pesantren', 'nurul iman', 'cisalak', 'subang', 'tahfidz', 'nahwu shorof', 'pendaftaran santri'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}