export interface Berita {
  id: number
  judul: string
  slug: string
  ringkasan: string | null
  isi: string
  gambar: string | null
  kategori: string
  is_published: number
  tanggal: string
}

export interface Galeri {
  id: number
  judul: string
  gambar: string
  kategori: string
  tanggal: string
}

export interface Pendaftaran {
  id: number
  nama_lengkap: string
  tempat_lahir: string
  tanggal_lahir: string
  jenis_kelamin: string
  asal_sekolah: string
  nama_orang_tua: string
  nomor_hp: string
  alamat: string
  program: string | null
  status: string
  tanggal_daftar: string
}

export interface User {
  id: number
  username: string
  password_hash: string
}

export interface ApiResponse<T = null> {
  success: boolean
  message?: string
  data?: T
}
