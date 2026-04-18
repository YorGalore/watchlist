# SPESIFIKASI DESAIN ANTARMUKA (UI DESIGN SPECIFICATION)
## Proyek: Sistem Movie Watchlist
## Konsep Estetika: Notion-esque Minimalist Design

---

## 1. DESIGN SYSTEM
Sistem identitas visual direkayasa menjiplak purwarupa aura produktivitas ekslusif perangkat lunak administrasi modern (*sekelas Notion*), menjunjung tinggipemakaian porsi ruang jeda memapas bersih (*whitespace*), struktur kepingan monokrom, serta melunturkan distorsi bayangan rumit.

### 1.1 Palet Warna Utama & Sekunder
- **Primary Background (Latar Muka Utama):** `#FFFFFF` (White) pada Light Mode / `#191919` (Dark Surface) memfasilitasi istirahat mata pada setelan rotasi Gelap.
- **Secondary/Sidebar (Panel Navigasi & Ruang Sisi):** `#F7F6F3` (Soft Grey) / `#202020` memisahkan rute navigasi dari kompartemen dokumen tontonan.
- **Accent Interactive (Identitas Aksi Dominan):** `#2383E2` (Notion Blue) / Tampil eksklusif hanya untuk mewarnai rujukan tautan atau penegasan tombol aksi mutlak (*Primary Button*).
- **Border/Divider (Bilah Sekat Garis Batas):** `#E9E9E7` (Thin Light Grey) / Bertugas membelah kisi-kisi grid tabel tanpa merusak distraksi fisis.
- **Core Text Colors:** `#37352F` (Dark Anthracite Typography) untuk tema Terang / `#D4D4D4` bagi mode malam untuk memblokir iritasi pantulan layar.

### 1.2 Tipografi
Konstelasi abjad dikarantina ke bentuk tatanan sans-serif modern berdaya pemindaian tinggi.
- **Font Family Utama:** Tata huruf rumpun `Inter`, ekuivalen `Segoe UI` (Bawaan Windows), atau keluarga murni `sans-serif`.
- **Heading 1 (Rujukan Judul Halaman):** Format `32px` bobot *Bold*, diiringi tarikan jarak kerapatan *Tracking* di `-0.02em`.
- **Heading 2 / 3 (Tajuk Sub-Blok Modul):** Proporsi `24px` atau `18px` dengan stempel *Semi-Bold*.
- **Body Text (Leksikon Dasar Paragraf):** Presisi murni `14px`, ketebalan *Regular*, kelapangan baris *Line-height* harmonis di jembatan skala `1.5`.
- **Label / Caption Metadata:** Resolusi kecil `12px` berwarna selubung subtil `#787774` untuk detail teknis (status tanggal, tipe).

### 1.3 Grid System & Spacing
- **Susunan Rangka Tata Letak:** Sistem adopsi asimetris dwi-zona Desktop murni; panel taktis *Sidebar* diam terkunci selebar 240px, meloloskan zona kanvas *Main Dashboard* untuk memenuhi luapan (*flex-1 full stretch*).
- **Spacing / Proporsi Jeda:** Berkutat pada komposisi kelipatan skala angka `4px` dan `8px`. Penempatan *Padding* internal kontainer ditetapkan royal berhiaskan luasan `24px-32px` memandu kelegaan "lapang bernapas".
- **Gaya Bidang Batas (Border Base):** Elemen pemisah diwujudkan oleh garis tunggal setipis `1px` padan warna sekat monokrom, dipatri nihil distorsi (diharamkan merayu mata menggunakan taktik *Drop Shadow/Box-Shadow* gembur mengambang).

### 1.4 Komponen UI Standar
- **Tombol Formasi (Buttons):** Dimensi keping pipih datar murni (*Flat design*), pengerutan lengkung pojok minimalis (*border-radius 2px hingga 4px*). Tanpa tikungan bola besar, simulasi status rabaan *hover* sekadar menggelapkan intensitas pewarnaan blok aksen sebesar rentang 5%. 
- **Bilah Masukan Kueri & Form (Input Fields):** Latar hamparan pasif disekat garis kotak abu-abu. Kala disentuh interaksi kedip (*Focused State*), kontur mendadak digaris bawahi siluet iluminasi rona `#2383E2` sebagai pandu. Nir-bayangan 3 Dimensi sama sekali.
- **Tabel Susunan Indeks / Tatanan Daftar (Lists):** Perbaris telanjang dilimitasi sekadar coretan garis horizontal batas bawah tanpa tumpang tindih pengecatan baris kontras selang-seling (Bebas corak kuda zebra).
- **Tirai Layar Tumpuk Navigasi / Modal Dialog:** Jendela melayang direkatkan bersendi layar tabir kaca pelindung redup (*dimming overlay opacity 40%*).

---

## 2. SITEMAP / NAVIGASI
Peta kedudukan lokasi tautan ditata tak berlapis lebat, memastikan orientasi kognitif yang tajam bagi operasional efisien perangkat PC/Desktop:

```text
EKOSISTEM ROOT MOVIE WATCHLIST 
+-- LANDING PAGE (Modul Penyambut Pemakai Publik)
|   +-- Gerbang Otentikasi Sentral (Masuk Area / Mendaftar Kredensial)
|
+-- DASHBOARD (Ruang Utilitas Tervalidasi Utama)
    +-- Panel Samping / Navigasi Induk (Sidebar Kiri Konstan)
    |
    +-- Modul Pangkalan Data Sentral (My Watchlist Main Content)
    |   +-- Sub-Modul Grid Tayang Silang: "Semua Kategori" (All)
    |   +-- Sub-Modul Filter Konstan: "Menanti Tayang" (Planning)
    |   +-- Sub-Modul Filter Konstan: "Pengamatan Mendalam" (Watching)
    |   +-- Sub-Modul Filter Konstan: "Tamat Absolut" (Completed)
    |
    +-- Modul Utilitas Pengambilan (Search & Injeksi Entri)
    |   +-- *Pop-up Intervensi Jaringan: Search OMDb Eksekutor*
    |
    +-- Kumpulan Konfigurasi Profil (Modul Settings)
        +-- Papan Kontrol Spesifikasi Kredensial Akun (Akun & Sandi)
        +-- Panel Interaksi Eliminasi Sesi Keluar Akses (Logout Trigger)
```

---

## 3. WIREFRAME TEKSTUAL (5 Halaman Utama Utama Desktop)

**Halaman 1: Otentikasi Pembuka Sesi (Landing / Sign-in)**
```text
+-----------------------------------------------------------------------+
|                               [LOGO MVC]                              |
|                                                                       |
|                          [ HEADING: SIGN IN ]                         |
|                       +----------------------+                        |
|                       | Alamat Email:        |                        |
|                       | [__________________] |                        |
|                       | Kunci Kata Sandi:    |                        |
|                       | [__________________] |                        |
|                       | <TOMBOL SIGN IN>     |                        |
|                       +----------------------+                        |
|                            Pelanggan Baru?                            |
|                           [Daftar di sini]                            |
+-----------------------------------------------------------------------+
```

**Halaman 2: Layar Kendali Eksekutif Dasbor (Tata Letak Horisontal)**
```text
+-----------------------------------------------------------------------+
| [LOGO: MovieWL]        [Bilah Search Keras...]     [V Info Profil]    |
+-----------------------------------------------------------------------+
|                       |                                               |
|       [SIDEBAR]       |    [HEADING 1: My Watchlist]     [+ Add New]  |
|                       |                                               |
| > All Daftar          |   +------------------------------------+      |
| > Planning            |   | Filter: [Genre V] [Rating V] [A-Z V] |    |
| > Watching            |   +------------------------------------+      |
| > Completed           |                                               |
| [==================]  |    [SUSUNAN KARTU GALERI SINEMA (GRID)]       |
|                       |   +----------+  +----------+  +----------+    |
| - Pengaturan Akun     |   | [Poster] |  | [Poster] |  | [Poster] |    |
| - Sign Out/Keluar     |   | Judul-1  |  | Judul-2  |  | Judul-3  |    |
|                       |   | ⭐ 8.5   |  | ⭐ 9.0   |  | ⭐ 7.2   |    |
|                       |   +----------+  +----------+  +----------+    |
+-----------------------------------------------------------------------+
|               [FOOTER/Pijakan: Proyek Independen - 2026]              |
+-----------------------------------------------------------------------+
```

**Halaman 3: Tabir Tambahan Katalog Murni (API OMDb Asynchronous Modal)**
```text
+-----------------------------------------------------------------------+
|                  [TIRAI BELAKANG REDUP / DIM OVERLAY]                 |
|       +-------------------------------------------------------+       |
|       | [HEADING: Tambah Dokumentasi Film Baru]           [X] |       |
|       |                                                       |       |
|       | Lempar Titik Kueri (Judul atau Kode IMDb Asli):       |       |
|       | [ The Matrix........................ ] [ Bidik Cari ] |       |
|       |                                                       |       |
|       | +---------------------------------------------------+ |       |
|       | | [POSTER] Judul Hak Paten: The Matrix (1999)       | |       |
|       | |          Daftar Rentang Genre: Sci-Fi, Action     | |       |
|       | |          Tentukan Nasib Status: [ Dropdown V ]    | |       |
|       | |          <TOMBOL KONFIRMASI INJEKSI KE DAFTAR>    | |       |
|       | +---------------------------------------------------+ |       |
|       +-------------------------------------------------------+       |
+-----------------------------------------------------------------------+
```

**Halaman 4: Papan Sunting Modul Klasifikasi Tayang (Edit Property Overlay)**
```text
+-----------------------------------------------------------------------+
|                  [TIRAI BELAKANG REDUP / DIM OVERLAY]                 |
|       +-------------------------------------------------------+       |
|       | [HEADING: Edit Atribut Leksikon "Avatar 2"]       [X] |       |
|       |                                                       |       |
|       | Rotasi Arah Tontonan Anda (Status):                   |       |
|       | [ Eksekusi Selesai/Completed  V ]                     |       |
|       |                                                       |       |
|       | Anugerahkan Evaluasi Angka:                           |       |
|       | [ ⭐ 8.0 / 10 ]                                       |       |
|       |                                                       |       |
|       | [BATALKAN PROSESI]        <TOMBOL EKSEKUSI PEMBARUAN> |       |
|       +-------------------------------------------------------+       |
+-----------------------------------------------------------------------+
```

**Halaman 5: Lembar Rekayasa Pengaturan Privasi (Settings Page)**
```text
+-----------------------------------------------------------------------+
|       [SIDEBAR]       |    [HEADING 1: Settings & Account Control]    |
|                       |                                               |
| > Rekaman Profil      |   - Identitas Taut Email: pengguna@mail.com   |
| > Utilitas Keamanan   |   - Afiliasi Usia Akun: Sejak 31 Mar 2026     |
|                       |                                               |
|                       |   [Tombol Pembaruan Rotasi Sandi Keamanan]    |
|                       |   ---------------------------------------     |
|                       |   [TOMBOL PERMANENT ACCOUNT TERMINATION]      |
+-----------------------------------------------------------------------+
```

---

## 4. UX FLOW (Konsep Aliran Inti Penambahan Entri)
Prosedur rekayasa kognitif sentral untuk mendaratkan log tontonan (Entri Basis OMDb API Async), dirantai sekelumit persimpangan logika rute:
1. **Titik Sentuh Pemicu (Trigger Action):** Pandangan mata pengguna dikunci menuju aksen tombol biru primer `[+ Add New]` di pojok utara deretan Dasbor Desktop.
2. **Kueri Masukan Eksekusi:** Sebuah partisi jendela *Modal Dialog* menumpuk layar (Fokus paksa). Pengguna merakit kueri abjad penelusuran. *(Cth Ketukan: "Interstellar")*.
3. **Eksekusi Tarikan Peladen Asynchronous:** Roda piringan *Loading Spinner* / Efek kerangka tulang menari (*Skeleton UI Loader*) menggantikan formulir hitungan milidetik membentangkan representasi interupsi beban komputasi peladen jauh.
4. **Keputusan Komputatif Logis (Decision Threshold - Menabrak Hasil Tarikan?):**
   - Rute **KEGAGALAN (Data Kosong)**: Pemakai ditampar pemberitahuan panji rekat, menyurakan pesan peringatan *"Manifestasi Judul Eksternal Terblokir. Lanjut Masukan Parameter Utuh Manual?"*.
   - Rute **KEMENANGAN (Hit Valid)**: Pemutar membalik memuntahkan antarmuka sub-*Card Preview*. Memamerkan konfirmasi wujud grafis wajah *Poster*, Label Kalender, plus Taksonomi *Genre*.
5. **Set Pemuatan Properti Dini (*Initial Property Sets*):** Pemakai menakar konstelasi relasional atribut yang harus diembankan pada properti (Dropdown dialihkan menuju setelan tontonan `[Menanti di-Eksekusi]`).
6. **Titik Serah Terima Resolusi Akhir:** Klik mutlak di panji aksi `[Konfirmasi Injeksi]`. Formulir *Modal Dialog Pop-up* menyemburkan dirinya (*Dismissal Trigger*) diiringi sirkulasi lebur transparan mulus pudar tanpa memaksa peramban memicu letupan pembaharuan ulang halaman (*React No-page-reload behavior renders*). Notasi lencana hijau melambung konfirmasi kemerdekaan, *"Entri Koleksi Tertambat Abadi pada Arsip Dasbor Anda!"*. Elemen kisi layar merefleksikan baris kartu pendatang anyar mutakhir secara serempak otomatis.

---

## 5. RESTRUKTURISASI TATA AKSESIBILITAS (WCAG 2.1 Peringkat AA)
Penyematan inklusivitas hak pemakai dikodifikasi mengapit keandalan ketahanan parameter visual:
- **Kondensasi Kontras Batas Peringkat Menengah:** Ambang batas pembilangan ketegasan huruf abjad dan landasan kanvas disekat rasio konstan limitasi tidak kurang dari parameter absolut `4.5 : 1`. Garis kurungan pinggir sekat (*Borders*) serta pangkalan fungsional mengunci eksistensi kekerasan kontras di `3 : 1`.
- **Navigasi Alat Ketik Murni (Interaksi Tuts Tab Keyboard):** Jangkauan pelintasan mutlak diekspos menyanggupi jelajah komando navigasi *Keyboard Arrow/Tab*. Lompatan ke terminal form akan merangsang aktivasi nyala pendar **Focus State** yang diterangi pelukan cincin penanda identitas fisis tebal Biru terang (`border-blue-500` ring width 2px) bagi keakuratan fokus penuding mata.
- **Transmisi Fiksasi Leksikon Etiket Lanjut (Label Semantik Pembaca Layar):** Keseluruhan properti blok form terkurung mandaya `aria-label` penjelas. Input dan properti ditambatkan simpul ikatan absolut tag pembungkus HTML murni `<label for="[identitas]">` untuk memastikan kesuksesan terjemahan intervensi utilitas *Screen Reader Text-to-Speech Accessibility Output*.

---

## 6. PARAMETER RESPONSIVE DESIGN & GRID CONSTRAINT
Arsitektur spesifikasi rekayasa kanvas layar dikutuk merajai tatanan Horisontal Lapang mematuhi dekrit limitasi klausul *SRS 2.4*:
- **Puncak Tatanan Desktop Lebar (Resolusi >= 1200px) [PRIORITAS KEGEMILANGAN 1]:** Pelebaran kanvas rasio utuh (*Fluid Full-width stretch*). Kotak penjara menu navigasi sisi kiri (*Sidebar menu tray*) di-segel beku setebal 240px tak terpindahkan dari posisinya (*Fixed persistence*). Ekosistem penyajian album koleksi judul tayang digenjot membentuk perangkaian horizontal masif memamerkan 4 hingga kelipatan 5 bingkai petak bujur sangkar per-barisan melintang. 
- **Adaptasi Kompresi Format Laptop/Tablet Horizontal Bertahan (Resolusi 768px hingga 1199px):** Penyusutan gradual parameter margin lebar. Pos jaga kurungan menu pilar kiri diizinkan mengerut rapi, dialih-tumpuk ke mekanisme lipat tombol garis tiga konvensional susun (*Hamburger collapse off-canvas drawer layer*). Barisan bentang kuota bingkai poster film disunat menjadi 2 atau 3 deretan tumpuk bersebelahan bagi efisiensi napas.
- **Pelunturan Tanggung Jawab Potret Genggam Sempit (Resolusi di bawah < 768px) [Zona Fallback Minimum]:** Menjunjung konstitusi spesifikasi PRD yang membelenggu kompatibilitas native layar sentuh telepon genggam, tidak dialokasikan utilitas porsi hibrida murni. Layar rongsok terkompresi paksa sekadar memadat ditelantarkan menumpuk berbaris menjuntai secara sumbu Y murni (*Vertical block flow CSS*), plus penaburan spanduk pasrah peringatan informatif, *"Ekosistem Platform Dipatok Optimal Melintasi Peranti Tontonan Meja PC / Desktop Samping!"*.
