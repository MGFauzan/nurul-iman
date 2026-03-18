# Pondok Pesantren Nurul Iman — Website v2.0

## Stack
- Next.js 15.0.3 + TypeScript
- Cloudflare Pages + D1 (database) + R2 (storage)
- JWT Authentication
- Google Sheets integration

## Setup Lokal

```bash
# 1. Install dependencies
npm install

# 2. Salin env
cp .env.example .env.local
# Edit .env.local sesuai kebutuhan

# 3. Jalankan
npm run dev
```

Buka: http://localhost:3000  
Admin: http://localhost:3000/admin/login  
Login: admin / admin123

## Copy Logo
Salin file logo.png ke: `public/images/logo.png`

## Deploy ke Cloudflare Pages

```bash
# 1. Install wrangler
npm install -g wrangler

# 2. Login
wrangler login

# 3. Buat D1 database
wrangler d1 create pesantren-db
# Copy database_id ke wrangler.toml

# 4. Jalankan schema
wrangler d1 execute pesantren-db --file=./database/schema.sql

# 5. Buat R2 bucket
wrangler r2 bucket create pesantren-uploads

# 6. Build & deploy
npm run pages:build
wrangler pages deploy

# 7. Set environment variables di Cloudflare Dashboard:
# JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD, GOOGLE_SCRIPT_URL, R2_PUBLIC_URL
```

## Struktur Folder
```
app/
  page.tsx              → Beranda
  profil/               → Profil Pesantren
  berita/               → Daftar Berita
  berita/[slug]/        → Detail Berita
  galeri/               → Galeri Foto
  pendaftaran/          → Form Pendaftaran
  admin/                → Panel Admin (auth protected)
  api/                  → API Routes
components/             → Komponen reusable
lib/                    → Utilities (auth, db, upload, dll)
database/schema.sql     → Skema database D1
```
