CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS berita (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  judul TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  ringkasan TEXT,
  isi TEXT NOT NULL,
  gambar TEXT,
  kategori TEXT DEFAULT 'Umum',
  is_published INTEGER DEFAULT 1,
  tanggal TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS galeri (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  judul TEXT NOT NULL,
  gambar TEXT NOT NULL,
  kategori TEXT DEFAULT 'Kegiatan',
  tanggal TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS pendaftaran (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_lengkap TEXT NOT NULL,
  tempat_lahir TEXT NOT NULL,
  tanggal_lahir TEXT NOT NULL,
  jenis_kelamin TEXT NOT NULL,
  asal_sekolah TEXT NOT NULL,
  nama_orang_tua TEXT NOT NULL,
  nomor_hp TEXT NOT NULL,
  alamat TEXT NOT NULL,
  program TEXT,
  status TEXT DEFAULT 'Pending',
  tanggal_daftar TEXT DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO users (username, password_hash) VALUES ('admin', 'dev-hash');
