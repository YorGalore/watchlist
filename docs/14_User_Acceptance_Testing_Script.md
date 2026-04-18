# Dokumen 14: Panduan & Skenario User Acceptance Testing (UAT)

**Nama Sistem**: Movie Watchlist Application  
**Versi**: 1.1.0 (Premium Audit Refinement)  
**Tanggal**: 01 April 2026  
**Penyusun**: Antigravity (Assistant) & Freta Yordinia Laura  

---

## DAFTAR ISI
1. [PANDUAN UAT UNTUK PENGGUNA](#1-panduan-uat-untuk-pengguna)
2. [SKENARIO UAT PER MODUL](#2-skenario-uat-per-modul)
3. [FORMULIR TEMUAN BUG](#3-formulir-temuan-bug)
4. [TEMPLATE LAPORAN UAT](#4-template-laporan-uat)

---

## 1. PANDUAN UAT UNTUK PENGGUNA
*Bagian ini ditujukan bagi pengguna akhir (tester) yang bukan dari latar belakang IT.*

### A. Tujuan Pengujian
Memastikan bahwa aplikasi Movie Watchlist sudah berjalan sesuai dengan kebutuhan Anda dan nyaman digunakan untuk mengelola daftar tontonan film pribadi.

### B. Lingkungan Pengujian
- **URL**: `http://localhost:3000`
- **Perangkat**: Laptop/Desktop (Rekomendasi: Chrome atau Edge terbaru)

### C. Akun & Data Uji
Untuk melakukan pengujian, Anda disarankan menggunakan akun berikut:
- **Email**: `tester@example.com`
- **Password**: `password123`
*(Atau Anda dapat mendaftar akun baru langsung di aplikasi untuk menguji fitur Registrasi)*

### D. Cara Melaporkan Temuan
Jika Anda menemukan fungsi yang tidak berjalan atau tampilan yang membingungkan, silakan isi **Formulir Temuan Bug** di Bagian 3 dokumen ini.

---

## 2. SKENARIO UAT PER MODUL

### MODUL 1: AUTENTIKASI (AKSES MASUK)
**SKENARIO 1.1: Pendaftaran Akun Baru**
- **Persona**: Pengguna Baru
- **Tujuan**: Membuat akun agar bisa menggunakan aplikasi.
- **Langkah**:
  1. Buka laman Registrasi.
  2. Isi Nama, Email, dan Password.
  3. Klik tombol "Daftar Sekarang".
- **Hasil yang Diharapkan**: Sistem menampilkan pesan sukses dan mengarahkan ke laman Login.
- **Status**: `[ ]` Lulus / `[ ]` Gagal / `[ ]` Catatan:

**SKENARIO 1.2: Login & Logout**
- **Persona**: Pengguna Terdaftar
- **Tujuan**: Masuk ke dashboard dan keluar dengan aman.
- **Langkah**:
  1. Masukkan email dan password yang benar di laman Login.
  2. Setelah masuk, klik tombol "Logout" di kanan atas.
- **Hasil yang Diharapkan**: Berhasil masuk ke Dashboard, lalu kembali ke Login setelah logout.
- **Status**: `[ ]` Lulus / `[ ]` Gagal / `[ ]` Catatan:

---

### MODUL 2: PENCARIAN FILM (OMDB INTEGRATION)
**SKENARIO 2.1: Pencarian Film Real-time**
- **Persona**: Pengguna
- **Tujuan**: Mencari film dari database global OMDb.
- **Langkah**:
  1. Ketik "Inception" pada kotak pencarian di Dashboard.
  2. Tunggu sebentar hingga daftar film muncul di bawah kotak.
- **Hasil yang Diharapkan**: Muncul daftar film "Inception" (2010), dll dengan poster dan tahun.
- **Status**: `[ ]` Lulus / `[ ]` Gagal / `[ ]` Catatan:

**SKENARIO 2.2: Tombol Pembersih (Clear Search)**
- **Persona**: Pengguna
- **Tujuan**: Menghapus teks pencarian dengan cepat.
- **Langkah**:
  1. Ketik teks apa saja di kotak pencarian.
  2. Klik ikon "X" di ujung kanan kotak pencarian.
- **Hasil yang Diharapkan**: Teks terhapus seketika dan daftar hasil pencarian tertutup.
- **Status**: `[ ]` Lulus / `[ ]` Gagal / `[ ]` Catatan:

---

### MODUL 3: MANAJEMEN WATCHLIST (CRUD)
**SKENARIO 3.1: Menambah Film ke Daftar**
- **Persona**: Pengguna
- **Tujuan**: Simpan film ke koleksi pribadi.
- **Langkah**:
  1. Cari film via Search Box.
  2. Klik salah satu hasil film yang muncul.
- **Hasil yang Diharapkan**: Film muncul di grid "Daftar Tontonan" dengan status default "Plan to Watch".
- **Status**: `[ ]` Lulus / `[ ]` Gagal / `[ ]` Catatan:

**SKENARIO 3.2: Update Status & Hapus**
- **Persona**: Pengguna
- **Tujuan**: Mengubah status tontonan atau menghapus film.
- **Langkah**:
  1. Pada kartu film, ubah status menjadi "Finished".
  2. Klik ikon "Hapus" (Tong Sampah) untuk mengeluarkan film dari daftar.
- **Hasil yang Diharapkan**: Status berubah, dan film hilang dari daftar setelah dihapus.
- **Status**: `[ ]` Lulus / `[ ]` Gagal / `[ ]` Catatan:

---

### MODUL 4: FILTERING & UX
**SKENARIO 4.1: Pemilahan (Filtering)**
- **Persona**: Pengguna
- **Tujuan**: Mencari film tertentu di dalam daftar koleksi sendiri.
- **Langkah**:
  1. Klik filter "Semua Status", pilih "Finished".
  2. Masukkan kata kunci pada pencarian kategori/genre.
- **Hasil yang Diharapkan**: Daftar film menyusut hanya menampilkan film yang sesuai kriteria filter.
- **Status**: `[ ]` Lulus / `[ ]` Gagal / `[ ]` Catatan:

---

## 3. FORMULIR TEMUAN BUG

| ID Bug | Modul | Tanggal | Deskripsi Masalah | Hasil yang Diharapkan | Prioritas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| B-00X | ... | DD/MM | [Cantumkan langkah & apa yang salah] | ... | [Low/Med/High] |

---

## 4. TEMPLATE LAPORAN UAT
*Laporan ini diisi setelah seluruh pengujian selesai dilakukan.*

### A. Ringkasan Hasil
- **Total Skenario**: 7
- **Lulus**: ...
- **Gagal**: ...
- **Pending**: ...

### B. Daftar Temuan & Resolusi
*(Sebutkan ID Bug yang masih berstatus 'Open' atau 'In Progress')*

### C. Rekomendasi Go-Live
> `[ ]` **GO-LIVE**: Aplikasi layak dirilis ke produksi.  
> `[ ]` **PENDING**: Aplikasi memerlukan perbaikan mayor sebelum dirilis.

### D. Tanda Tangan Persetujuan
Dengan ini menyatakan bahwa pengujian telah dilakukan dan hasil telah disetujui.

**Penguji (User)**,  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Penanggung Jawab Sistem**,

*(Tanda Tangan)* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *(Tanda Tangan)*  
Nama: _________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nama: **Freta Yordinia Laura**
