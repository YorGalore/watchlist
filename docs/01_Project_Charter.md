# PROJECT CHARTER

## 1.0 Informasi Proyek
- **Nama Proyek:** Pengembangan Sistem Movie Watchlist
- **Klien:** Layanan Jasa
- **Tanggal:** 31 Maret 2026
- **Versi:** 1.0.0

## 2.0 Latar Belakang & Permasalahan
Saat ini, pencatatan histori tontonan film atau serial televisi masih banyak dilakukan secara manual atau terfragmentasi, menyulitkan individu untuk melacak entri. Selain itu, sistem pencatatan yang ada terkadang tidak memberikan privasi yang cukup atau memiliki fitur sosial yang terlalu kompleks dan tidak diperlukan oleh pengguna personal. Permasalahannya adalah kurangnya platform pelacakan film web terpadu, spesifik desktop, dan berfokus utuh pada privasi manajemen data pribadi tanpa gangguan jejaring sosial media.

## 3.0 Tujuan & Manfaat Sistem
- **Tujuan:** Mengembangkan aplikasi berbasis web *multi-user* yang memungkinkan pengguna mencatat, memfilter, dan mengorganisasi daftar tontonan mereka (akan ditonton, sedang ditonton, sudah ditonton) layaknya utilitas *workspace* mandiri.
- **Manfaat:** Memberikan efisiensi pencatatan dengan bantuan penarikan metainfo film eksternal sehingga input data lebih ringkas, sekaligus menjamin kerahasiaan kepemilikan data antar akun secara absolut.

## 4.0 Ruang Lingkup (Scope)
**In Scope:**
- Registrasi dan Autentikasi menggunakan standar Email dan Password.
- CRUD (Create, Read, Update, Delete) entri *Movie Watchlist*.
- Fitur segmentasi status penayangan ("Akan", "Sedang", "Sudah").
- Penyediaan sarana *filter/sort* berdasarkan abjad, genre, tipe rilis (film/seri), dan rating numerik.
- Integrasi asinkron kueri ke API Pihak ketiga (misal IMDb melalui OMDb/Wikipedia) untuk kelengkapan visual (poster, tahun, kategori).

**Out of Scope:**
- Modul *sharing* data daftar film atau metrik tontonan ke pengguna lain atau ke ranah publik.
- Jembatan interaksi komunikasi sosial seperti kolom komentar, forum atau interaksi mengikuti (follow) akun pengguna lain.
- Peluncuran *mobile application native* di Play Store atau App Store.
- Atribusi penilaian fiksasi teks/esai ulasan dalam entri film (terbatas pada rating berbintang/numerik).

## 5.0 Stakeholder & Peran
1. **Layanan Jasa (Klien Utama):** Berperan mengevaluasi spesifikasi kebutuhan (*requirements*), menyetujui, dan memvalidasi luaran platform (*deliverables*).
2. **Pengguna/Penonton (End-User):** Audiens akhir yang menggunakan produk jadi untuk manajemen *watchlist* personal yang otonom dan private.
3. **AI Assistant/Tim Pengembang (Antigravity):** Pihak penanggung jawab perancangan arsitektur, rekayasa kebutuhan, implementasi kode berbasis stack (frontend, backend), dan jaminan sistem siap produksi.

## 6.0 Asumsi & Kendala
- **Asumsi:** Klien sepakat memanfaatkan basis Web/Browser tanpa tuntutan distribusi berkas instalasi (.exe/.dmg). Peladen sumber film (sperti API OMDb) dianggap mampu merespons muatan *traffic* layanan secara stabil untuk menanggulangi interupsi data *input*.
- **Kendala:** Konsenterasi pengalaman navigasi dikonstrain secara eksklusif dan estetik pada *viewport screen* memanjang horizontal ala *desktop PC / Laptop*, mendevaluasi adaptabilitas ke lebar rasio portrait tipis smartphone seluler selaras arahan fungsional.

## 7.0 Risiko Awal
1. **Downtime API Pihak Ketiga (Kritikal):** Kegagalan operasional layanan OMDb/IMDb API akan menjatuhkan performa pencarian film instan dan menyulitkan pengguna dalam memuat formulir masukan baru.
2. **Kelambatan Akses Penyortiran dan Skalabilitas (Medium):** Diiringi pertumbuhan pesat data entri, skrip *filtering* multi-kriteria harus mumpuni agar indeks waktu muat *dashboard* tak termakan antrean beban memori klien.
3. **Pertahanan Identitas / Brute Force (Medium):** Tanpa verifikasi mutakhir (seperti 2FA / SSO), peretasan kata sandi di ambang rentan jika tak dijaga menggunakan algoritma batasan tingkat laju sandi (*Rate Limiting*).
4. **Mutasi Format Variabel Provider Eksternal (Medium):** Apabila provider publik (Wikipedia dll) sewaktu-waktu mengubah struktur respons JSON-nya, implementasi pemetaan sistem basis data internal kita berisiko korup atau membalik format string kosong (*null*).
5. **Kebocoran Zonasi Penyekatan Data Privasi (Kritikal):** Jika eksistensi *Router Security Row-Level* di pangkalan logistik data gagal membedakan kunci identitas masing-masing otentikator sesi, satu *user* tak sengaja mendapatkan otorisasi menduplikasi, membaca, atau mengubah daftar milik pihak *user* lawannya.

## 8.0 Milestone Utama (Estimasi)
1. **Fase Pengumpulan dan Dokumentasi Akademik (100%):** Project Charter, PRD, dan SRS telah didefinisikan secara resmi kepada Klien [Selesai: 31 Maret 2026].
2. **Fase Perancangan Sistem UX & Arsitektur (0%):** Menyiapkan kerangka UI Dashboard Desktop dan permodelan ERD Database.
3. **Fase Eksekusi/Implementasi (*Coding Stage*) (0%):** Mendirikan konfigurasi pondasi *Backend* Node.js, merakit *Frontend React*, dan merekayasa utilitas sambungan API metadata film.
4. **Fase QA & Verifikasi (*Testing*) (0%):** Isolasi evaluasi fungsional (CRUD, Keamanan Jalur Multi-User Token, Skrip Sorting Parameter).
5. **Rilis Lingkungan Produksi (0%):** Operasional final platform Go-Live.

## 9.0 Persetujuan
Dengan dicantumkannya validasi pada dokumen kontrak arsitektur di bawah, proyek telah diotorisasi berjalan sah.

| Peran | Nama / Entitas | Tanda Tangan | Tanggal |
|---|---|---|---|
| Klien | Layanan Jasa | _______________ | _______________ |
| Pengembang | Antigravity AI | _______________ | _______________ |
