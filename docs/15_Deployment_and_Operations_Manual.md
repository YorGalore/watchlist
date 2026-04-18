# Dokumen 15: Panduan Deployment & Operasional Sistem

**Nama Sistem**: Movie Watchlist Application  
**Versi**: 1.1.0 (Premium Audit Refinement)  
**Tanggal**: 01 April 2026  
**Penyusun**: Freta Yordinia Laura & Antigravity (Assistant)  

---

## 1. DEPLOYMENT CHECKLIST (SEBELUM GO-LIVE)
Sebelum melakukan rilis ke lingkungan produksi, pastikan seluruh poin berikut telah diverifikasi:

- [ ] **Environment Variables**: Seluruh variabel di `.env` telah dikonfigurasi sesuai server produksi (terutama `DATABASE_URL` dan `JWT_SECRET`).
- [ ] **Database Migration**: Skema database telah sinkron dengan menjalankan `npx prisma migrate deploy`.
- [ ] **SSL Certificate**: Pastikan domain utama menggunakan HTTPS (SSL/TLS).
- [ ] **Backup Database**: Melakukan backup awal (initial snapshot) sebelum data pengguna masuk.
- [ ] **Security Headers**: Verifikasi kuki kuki `auth_token` memiliki atribut `SameSite=Strict` dan `HttpOnly`.
- [ ] **UAT Sign-off**: Dokumen 14 telah ditandatangani oleh pemangku kepentingan.

---

## 2. PANDUAN INSTALASI PRODUCTION

### A. Kebutuhan Server (Minimum)
- **CPU**: 1 Core (Rekomendasi 2 Core)
- **RAM**: 1 GB (Rekomendasi 2 GB untuk build process Next.js)
- **Storage**: 10 GB SSD (Tergantung volume database)
- **OS**: Ubuntu 22.04 LTS atau Linux berbasis Debian lainnya.
- **Node.js**: v18.x atau v20.x (LTS)
- **Database**: PostgreSQL 14+

### B. Langkah Instalasi & Konfigurasi
1. **Clone & Install**:
   ```bash
   git clone [REPOS_URL]
   cd movie-watchlist
   npm install --production
   ```
2. **Environment Setup**:
   Salin berkas `.env.example` menjadi `.env` dan isi nilai yang sesuai:
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/watchlist_db"
   JWT_SECRET="Gunakan_String_Acak_Dan_Panjang"
   OMDB_API_KEY="be750939"
   ```
3. **Database & Build**:
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   npm run build
   ```
4. **Web Server (Nginx Reverse Proxy)**:
   Konfigurasi Nginx untuk mengarahkan port 80/443 ke internal port 3000.

---

## 3. PANDUAN OPERASIONAL (SOP)

### A. Pengelolaan Service (Menggunakan PM2)
Disarankan menggunakan PM2 untuk menjamin aplikasi tetap berjalan (*auto-restart*):
- **Menjalankan**: `pm2 start npm --name "movie-watchlist" -- start`
- **Menghentikan**: `pm2 stop movie-watchlist`
- **Melihat Log**: `pm2 logs movie-watchlist`

### B. Prosedur Backup & Restore
- **Backup Mingguan**:
  `pg_dump -U postgres watchlist_db > backup_$(date +%Y%m%d).sql`
- **Restore**:
  `psql -U postgres watchlist_db < backup_file.sql`

### C. Troubleshooting Umum (FAQ)
- **Error 500 saat Login**: Periksa apakah `JWT_SECRET` sudah terisi di `.env`.
- **Film tidak muncul di Search**: Cek koneksi internet server dan validitas `OMDB_API_KEY`.
- **Database Connection Error**: Pastikan layanan PostgreSQL sedang berjalan dan IP server di-allow oleh DB.

---

## 4. PANDUAN PENGGUNA (USER MANUAL)

### A. Keamanan Akun
- Gunakan password minimal 8 karakter dengan kombinasi angka.
- Selalu klik **Logout** jika menggunakan komputer publik.

### B. Alur Utama Penggunaan Fitur
1. **Menambah Film**:
   - Ketik judul film di kotak pencarian (kanan atas).
   - Klik hasil yang muncul; film akan otomatis masuk ke daftar Anda.
2. **Mengelola Daftar**:
   - Gunakan **Filter Status** untuk memisahkan film yang "Sedang Ditonton" atau "Selesai".
   - Klik **X (Hapus)** pada kartu film untuk mengeluarkan dari koleksi.
3. **Pencarian Cepat**:
   - Gunakan fitur pencarian real-time untuk navigasi koleksi yang sudah besar (ratusan film).

---

## 5. CATATAN RILIS (RELEASE NOTES)

| Versi | Tanggal | Fitur Baru | Perbaikan Bug | Isu Diketahui |
| :--- | :--- | :--- | :--- | :--- |
| **1.0.0** | 31/03/26 | Initial Release (Auth, Watchlist, OMDb) | - | API Latensi |
| **1.1.0** | 01/04/26 | **Premium Search**, Filter Indexing, CSRF Shield | Hydration Error Fix, DB Indexing | - |

---
**Persetujuan Deployment:**  
Nama: **Freta Yordinia Laura**  
Jabatan: **Lead Developer / Project Manager**  
Status: **APPROVED FOR PRODUCTION**
