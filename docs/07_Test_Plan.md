# MASTER TEST PLAN (IEEE 829 Compliant)
## Sistem Movie Watchlist

## 1.0 IDENTIFIKASI TEST PLAN
- **Nama Sistem:** Sistem Aplikasi Web Terpadu Movie Watchlist
- **Versi Dokumen:** 1.0.0
- **Kategori Pengujian:** Master Test Plan (Rencana Pengujian Induk Terpadu)
- **Tanggal:** 31 Maret 2026
- **Penulis (Author):** Tim AI Antigravity

## 2.0 REFERENSI
Kumpulan preseden dokumentasi acuan otoritatif fungsional kelayakan sistem (*Traceability Origin*):
1. `docs/02_PRD.md` - Spesifikasi Kebutuhan Produk Lini Bisnis Layanan Jasa.
2. `docs/03_SRS.md` - Parameter persetujuan Kebutuhan Fungsional (FR) dan Kesesuaian Non-Fungsional (NFR).
3. `docs/04_Use_Case.md` - Skenario interaksi komputasi otonom representasi aktor (*Main Flow*).
4. `docs/05_Database_Design.md` - Integritas restriksi referensi konstrain *Foreign Key* pangkalan *SQL*.

## 3.0 ITEM YANG DIUJI
Pengujian menjurus pada pendelegasian pemeriksaan keutuhan spesifikasi bersandar matriks (menurut FR-001 hingga FR-006 standar S2/IEEE):
1. **Modul Gerbang Otentikasi dan Dekripsi Token:** Kemampuan pemanggilan registrasi instan (*Sign-in/Sign-Out*) plus ekspektasi *JWT Authentication cookie state* (FR-001/UC-01).
2. **Modul Pembatasan Akses Privatisasi RDBMS Isolasi Identitas:** Keunggulan barisan kontrol pelindungan (*Row-Level Identity Protection*) menangkis ancaman penyurupan *watchlist* ke profil pihak asing bersekat ganda (FR-006/UC-01).
3. **Modul Tiga Pilar Log Penayangan Utama (CRUD Engine):** Manipulasi eksistensi pendaftaran film ke list pengguna, rekayasa pelaporan indeks evaluasi fisis rute rating metrik, pemindahan atribut "Telah/Sedang" ke status baru tonton (FR-002, FR-005/UC-03, UC-04, UC-06).
4. **Transmisi Sinkronisasi Tarikan Metrik Automasi Eksternal (API Aggregator Check):** Kemampuan delegasi *backend request* untuk meretas respons JSON leksikal pustaka OMDb membalik susunannya mencetak sampul rilis resolusi UI (FR-003/UC-02).
5. **Polimorfisme Enumeratif Dasbor:** Kapabilitas penyortiran dinamis kompilasi berarsitektur reduktor matriks filter ganda berseri (FR-004/UC-05).

## 4.0 FITUR YANG TIDAK DIUJI & ALASANNYA
1. **Ketersediaan Layanan Murni Pangkalan Eksternal OMDb/Wikipedia (Availability API Lintas Batas yurisdiksi):**
   *Alasan:* Kondisi kemutlakan ketahanan eksekusi peladen publik pihak ketiga mengangkasa di luaran otonomi jangkauan pengetesan *software local*. Kami mengisolirnya sebatas pembuktian mekanisme transisi proteksi luapan eror *mock timeout request*.
2. **Responsivitas Antarmuka Pada Resolusi Seluler (Mobile Device Viewport Portrayal View):**
   *Alasan:* Dokumen rancangan `02_PRD.md` mendevaluasi portasi hibrida ke telepon cerdas. Eksplorasi penjelajahan QA UI/UX terpatri secara mutlak melenggang di rasio ukuran komputasi layar memanjang spesifikasi mebel lebar Desktop minimalis tunggal sekelas 1024 pixel.

## 5.0 PENDEKATAN PENGUJIAN
### 5.1 Unit Testing (White-Box)
Pengujian parsial untuk menyapu parameter utiliter independensi sintaks spesifik (*Stateless logic*) layaknya validasi komponen perhitungan formula indeks kata kunci.
- **Teknologi Implementasi:** Eksekutor *Test Runner Jest* terintegrasi.
### 5.2 Integration Testing
Verifikasi rekonsiliasi integrasi melacak fiksasi komunikasi serah-terima sinyal antara gerbang *Frontend Component* merapat ke jalur internal API sebelum mengaktifkan transisi proksi basis data ORM murni Prisma tanpa harus menjalarkan beban pembukaan *emulator web sesungguhnya*.
- **Teknologi Implementasi:** Instans *Supertest API* + *Mock Postgres Environment*.
### 5.3 System Testing (Penganalisa Otonom Black-Box E2E)
Eksekusi sirkulasi operasional antarmuka (*End-to-End*) membelalak mensimulasikan fiksi navigasi manuver tikus perambah melenggang ketukan DOM *Render Dashboard UI* sampai tuntas menaruh mutasi pengubahan kolom pangkalan transaksional di sudut *Backend*.
- **Teknologi Implementasi:** Automatisasi instruksi peramban menggunakan **Cypress** atau ekosistem **Playwright E2E Robot**.
### 5.4 User Acceptance Testing (UAT - Eksaminasi Penerimaan Klien)
Pengecekan *Final State Demo* purna luncur mengagungkan umpan balik lisan maupun komando perizinan final meniti standar rekonsiliasi awal FR klien menimbang kebahagiaan navigasi estetika premium berdalil dokumentaris "Notion".
### 5.5 Performance Testing
Evaluasi uji stres latensi pembedahan menelaah titik runtuh peladen tatkala *concurrency Virtual Client* meledak memfilter antrian 10.000 log riwayat tontonan paralelisasi serentak.
- **Alat Skrip Beban:** Apache JMeter atau injeksi peranti mesin **K6 OS Load Testing Engine**.

## 6.0 KRITERIA LULUS/GAGAL
**Kondisi Spesifikasi Status Lulus Paripurna (Test Clearance: Pass):**
1. Penyokong indikator esensial FR-001 hingga FR-006 menyabet resolusi verifikasi mutlak *(100% Passed)* luput kendala parameter peretasan *Severity 1 (Fatal Blocks)*.
2. Latensi navigasi *Client-Side Routing* filterisasi DOM statis antarmuka diekskusi peramban kurang dari hitungan mutlak tempo 1,5 detik.
3. Eskalasi serbuan mutasi sesi identitas memanipulasi *UUID Owner* (*Cross-Profile Data Read Vulnerability*) dimentongkan mutlak tanpa lubang jarum dalam parameter isolasi partisi basis data ganda per rilis tabel kepemilikan.

**Kondisi Eksekusi Status Pembekuan/Gagal Putus Celah (Test Suspension/Fail):**
1. Kebocoran kerentanan satu *pixel byte* log data penayangan profil ke ruang visibilitas pengguna sekutu lawan. Isolasi sistem ternodai absolut.
2. Tatanan daftar kueri gagal bermanuver menguraikan pengulangan kosong hingga menabrakkan eksekusi halaman dasbor UI membentur dinding *Client React Crash Boundary* fatal.

## 7.0 LINGKUNGAN PENGUJIAN (TESTING ENVIRONMENT)
- **Komponen Perangkat Keras (Hardware Requirements):** Tes pengawasan rekayasa direpresentasikan melenggang wajar atas piranti memori standard 8GB RAM serta bentang visualitas kanvas *Desktop Resolusi Minimum FHD (1080p)* ke atas.
- **Spekulasi Platform Layar Modifikasi OS Perangkat Lunak:** Ekstensifikasi menaungi lintas platform modern Windows 11 dan persilangan Darwin macOS. Simulasi peramban silang mendayagunakan enjin tervalidasi mutakhir murni: *Chrome Blink v120+*, dan tatanan minimalis *WebKit Apple Safari 17+*.
- **Arsip Parameter Set Replika (Test Mock Data Tuntutan):** Inisiasi pendirian lokomotif data basis fiktif menelurkan tiruan reka 5 sandi kredensial identitas figur tiruan dan benih rekap logistik kepemilikan tonton OMDb gado-gado membusungkan rekayasa penyaringan padat merayap.
- **Instrumentasi Test Toolchains Utama:** Postman (Tes Isolasi Rute Port API), Cypress/Playwright CLI (Tes DOM Browser), `jest` (Kalkulus Leksikal JS).

## 8.0 MATRIKS TANGGUNG JAWAB (RACI ASSIGNMENTS)
| Identifikasi Siklus Aktivitas | Ekskutor Operasional | Validator Kepatuhan (Approver) |
|---|---|---|
| Penetapan Dokumen Rencana Induk Uji Teknis Awal | Antigravity AI Engineer | Tim Perwakilan Eksekutif Pihak Klien |
| Penyemaian *Mock Data Schema Seed* SQL | Ahli Tata Kelola Pangkalan Database | Rekayasa *Systems Architect Lead* |
| Pengaitan Rutinitas Skrip Automasi (*Unit & API Testing*) | *Backend Software Developer* | Tim Integrator Tinjau Sesama (Pelaksana QA Koding) |
| Pemantauan Skenario Demonstrasi Simulasi *E2E Robot* murni | *Continuous Integration Tester Runner* | Pimpinan Rekayasan Kontrol Mutu |
| Unjuk Praktik Purna Latih Kepuasan Pengguna UAT | Agregator Layanan Institusi Eksekutif Klien | Para Komite Eksklusif dan Eksekutif Sponsor *Project Charter* |

## 9.0 TEST CASE DETAIL
*Arsip penyajian komposit tabel demonstrasi Test Case fisis:*

| Identifikator TC-ID | Sasaran Deskriptif | Prasyarat Dasar | Siklus Eskusi Pengujian Eksekutif | Ekspektasi Luaran Kondisi Sistem Akhir | Status |
|---|---|---|---|---|---|
| **TC-001** | Eksaminasi Gerbang Otentikasi & Restriksi Akses | Profil *credentials email* sah; Posisi *Log Out*. | 1. Ketuk jalur masuk URI rute `/login`.<br/>2. Tundukkan masukan konfirmasi parameter ganda email/sandinya.<br/>3. Eksekusi pemicu sirkuit *Sign In Button*. | Peladen menerbangkan peluru keamanan bungkusan *Cookie JWT HTTP-Only*, menendang rotasi orientas UI penjelajah masuk menuju `/dashboard`. | *Pending* |
| **TC-002** | Ketahanan *Query Timeout* Metadata OMDb API Eksternal | Sesi mutlak aktif di beranda. Jaringan internet luar peladen sengaja dibuat latensi lambat. | 1. Aktivasi jendela *"Tambahkan Film"*. <br/>2. Jejali isian spesifik log ("Zombieland 3000 Fake Edition").<br/>3. Perintahkan kueri interaktif pengambil data daring OMDb. | Fungsional tak terpancing keruntuhan tatanan komponen, menengahi parameter pencarian kandas disusupi sapaan anggun panji merah: *"Referensi Eksternal Tak Terpandang, Silakan Mengarsip Leksikal Mandiri!"*. | *Pending* |
| **TC-003** | Eksekusi Validasi Silang Kesakralan Mutlak Isolasi Profil Dasar | Mengemudikan 2 Jendela Penjelajah rahasia (*Incognito silang*) bagi akun figur User A dan B berdampingan. | 1. Sesi A mengeksekusi pemasukan rujukan arsip film *'Inception'*. <br/>2. Sesi figur wakil B mengalihkan pandangan rute navigasinya mensinkronisasi penyegaran antarmuka profil koleksi mandirinya sendiri ke matriks dasbornya. | Sesi B membentur dinding privasi solid nihil, dilarang meraba *footprint byte* logistik kepemilikan dokumen murni figur A yang ditambahkan menutupi FR-006 kesucian tatanan. | *Pending* |
| **TC-004** | Utilitas Manipulasi Substitutif Fiksasi Tontonan Mutakhir | Laman daftar relasional eksklusif menyimpan pendaftaran satu judul film fisis default berlebel rutinitas komite "Akan Tonton". | 1. Giring navigasi ketukan penanda *Edit/Ubah* dalam deret list parameter judul fisis dituju.<br/>2. Rotasi nilai parameter atribut leksikal drop-down penayangan diputar menjadi rujukan "Diselesaikan" + menoreh rating maksimal genap bernilai 10 bintang/skor. | Sinyal *commit HTTP* melenggang menyimpan tatanan parameter substitusi baru menimpa rekam abadi SQL, dibarengi fiksasi konfirmasi penayangan seketika tanpa harus merestart layar pemantau (*Client-page React state reload*). | *Pending* |
| **TC-005** | Eksibisi Penajaman Komputasi Saring Silang Filtrasi | Kepemilikan tabulasi log dipupuk 5 varians (3 dominan Action-Genre, 2 terselingi representasi Genre Melodrama). | 1. Ekspansi rentang selektor *Multi-filter Side Pane*.<br/>2. Sematkan seleksi murni mencentang boks kategori *Hanya Drama*.<br/>3. Putuskan prosesi tatanan urutan leksikon menuntut A-Z parameter. | Mesin *Redux/State* peramban membuang penayangan blok tiga deret film Action dan mutlak menyoroti daftar urutan indeks berdua khusus mengacu kepada genre pelipur lara murni tanpa sisa bayangan rekaman lain. | *Pending* |

## 10.0 JADWAL PENGUJIAN
1. **Pemusatan Pemodelan Dokumen *Test Blueprint***: Akhir pekan konklusi fase awal Pradokumentasi (Berakhir di *Maret 2026*).
2. **Katalisator Instrumentasi Lingkup Palsu DB Cypress**: Pasca-arsitektur dan fiksasi skema ERD Prisma.
3. **Konfirmasi Iteratif Tes Lapis Kode (Unit & Logic API Routing)**: Melambung bergegas menyemarakkan kompilasi tiap penyelesaian modul mikro pemrograman bulanan selama peluncuran siklus mingguan.
4. **Fungsi Ekskusi Pengaturan Menyeluruh *End-2-End***: Ekstensifikasinya digelar menyongsong tahapan *Freeze Code Feature* ke titik batas stabilitas pangkalan purwarupa Demo 1 (*Lingkungan Staging Server*).
5. **Inspeksi Penutup *UAT Client Release***: Evaluasi pertemuan konfirmasi virtual final yang melibatkan persetujuan dari dewan komite institusi Layanan Jasa sekejap mengizinkan peluncuran perdana mematahkan segel ke operasional ranah produksi abadi murni.
