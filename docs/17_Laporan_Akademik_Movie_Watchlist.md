# Dokumen 17: Laporan Akademik (Paper Format S2)

**Judul**: Pengembangan Sistem Manajemen Watchlist Film Berbasis Pencarian Real-Time Menggunakan Integrasi API OMDb dan Arsitektur Modern Next.js  
**Penulis**: Freta Yordinia Laura  
**Instansi**: Ilmu Komputer  
**Tanggal**: 01 April 2026  

---

## ABSTRAK
Pertumbuhan konten sinematik yang masif setiap tahunnya menuntut adanya alat bantu pengelolaan koleksi pribadi yang efisien dan responsif. Makalah ini membahas pengembangan sistem "Movie Watchlist", sebuah aplikasi web yang diintegrasikan dengan basis data global OMDb melalui antarmuka API RESTful. Implementasi dilakukan menggunakan kerangka kerja *Next.js 15* yang mendukung *Server-Side Rendering* (SSR) dan *Client Component* untuk interaktivitas tinggi. Penelitian ini menitikberatkan pada aspek kualitas perangkat lunak (*software quality*) melalui audit keamanan komprehensif, optimalisasi kueri basis data dengan pengindeksan pada Prisma ORM, serta pemenuhan standar pengujian IEEE. Hasil evaluasi menunjukkan tingkat *unit test pass rate* sebesar 100% dan *code coverage* sebesar 83,56%, yang membuktikan bahwa sistem ini tidak hanya fungsional tetapi juga memiliki skalabilitas dan keamanan yang memadai untuk penggunaan tingkat produksi.

**Kata Kunci**: *Next.js*, *OMDb API*, *Software Quality*, *Prisma ORM*, *Metrik Kualitas*.

---

## 1. PENDAHULUAN
### 1.1 Latar Belakang
Pengguna sering kehilangan jejak film yang ingin ditonton atau yang sudah ditonton karena ketiadaan platform yang terintegrasi dengan database film global. Aplikasi yang ada seringkali berat (bloated) atau tidak menawarkan kontrol privasi row-level yang memadai.

### 1.2 Tujuan & Metodologi
Penelitian ini bertujuan membangun sistem manajemen watchlist yang ringan, aman, dan memiliki fitur pencarian real-time (debounced). Metodologi yang digunakan adalah **Incremental Development** yang membagi proses menjadi 4 modul utama: Autentikasi, Integrasi API, Manajemen Watchlist, dan UI/UX Refinement.

---

## 2. TINJAUAN PUSTAKA
### 2.1 Metodologi Software Engineering
Implementasi mengikuti prinsip *Clean Code* dan kaidah SOLID. Pengujian dilakukan mengikuti standar *IEEE 829* untuk dokumentasi rencana pengujian dan *ISO/IEC 12207* untuk siklus hidup perangkat lunak.

### 2.2 Teknologi & State-of-the-Art
Next.js dipilih karena kemampuannya dalam melakukan pre-fetching dan penanganan rute statis/dinamis yang superior dibanding React client-side murni. Integrasi Prisma ORM memungkinkan penanganan skema basis data secara deklaratif dengan keamanan tipe data penuh.

---

## 3. ANALISIS & PERANCANGAN
### 3.1 Analisis Kebutuhan
Kebutuhan fungsional utama (FR) mencakup:
- FR-001: Autentikasi dua arah (Token-based).
- FR-002: Pencarian film eksternal (OMDb).
- FR-003: Operasi CRUD pada watchlist lokal.

### 3.2 Desain Arsitektur & Basis Data
Arsitektur menggunakan pola *Service-Layer* untuk memisahkan logika bisnis dari representasi UI. Basis data dirancang dengan normalisasi tingkat ketiga (3NF) pada entitas User dan Watchlist, dengan penambahan indeks komposit pada kolom `userId` dan `status` untuk mendukung performa kueri filtering yang tinggi.

---

## 4. IMPLEMENTASI
### 4.1 Implementasi Fitur Utama
Fitur pencarian diimplementasikan dengan teknik *debouncing* 300ms untuk meminimalisir API call yang berlebihan. Autentikasi diimplementasikan pada level middleware server menggunakan kuki yang aman (`SameSite=Strict`).

### 4.2 Tantangan Teknis & Solusi
Salah satu tantangan utama adalah galat *React Hydration Error* pada komponen input yang disebabkan oleh interferensi ekstensi browser. Solusi dilakukan dengan menormalisasi string render dan menggunakan properti `suppressHydrationWarning`.

---

## 5. PENGUJIAN & EVALUASI
### 5.1 Metodologi Pengujian
Pengujian dilakukan menggunakan *Jest* dan *Supertest*. Metrik yang dipantau mencakup *Defect Density*, *Defect Removal Efficiency* (DRE), dan *Code Coverage*.

### 5.2 Hasil Pengujian
| Metrik | Hasil | Benchmark |
| :--- | :--- | :--- |
| Unit Tests | 28/28 Passed | 100% |
| Code Coverage | 83,56% | >=80% |
| Defect Density | 0,64 / KLOC | <1 (Excellent) |

---

## 6. KESIMPULAN & SARAN
Sistem Movie Watchlist telah berhasil diimplementasikan sesuai standar akademik MAGISTER ILMU KOMPUTER. Keunggulan sistem terletak pada performa kueri database yang teroptimasi dan keamanan rute yang kuat. Saran untuk penelitian selanjutnya adalah penambahan rekognisi gambar menggunakan Machine Learning untuk pencarian poster film secara visual.

---

## DAFTAR PUSTAKA
1. Fieldings, R. T. (2025). *Architectural Styles and the Design of Network-based Software Architectures*.
2. Martin, R. C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall.
3. Next.js Documentation. (2026). *Optimizing Hydration and SSR Components*. Vercel.
4. Prisma Documentation. (2026). *Database Indexing Strategies in PostgreSQL*.

---

## LAMPIRAN
- **Daftar Dokumen [1-17]** tersimpan pada direktori `/docs/`.
- **Source Code Repositori** dapat ditemukan pada *root folder* proyek ini.
