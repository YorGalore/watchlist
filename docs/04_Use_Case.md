# SPESIFIKASI USE CASE (UC)
## Lampiran Dokumen SRS - Sistem Movie Watchlist

## 1. DAFTAR AKTOR
Aktor adalah representasi entitas fungsional yang berinteraksi langsung dengan batas sistem. Berikut adalah peran yang teridentifikasi:

1. **Pengguna Biasa (End-User):**
   Aktor utama yang memiliki akun teregistrasi (berbasis Email). Perannya mengeksekusi kendali otonom untuk merekayasa koleksi daftar film di ruang *dashboard* isolasi mutlaknya (tanpa kapabilitas administratif terhadap wewenang maupun data kepemilikan ranah pengguna lain).
2. **Sistem API Eksternal (Contoh: OMDb / IMDb / Wikipedia API):**
   Aktor non-manusia *(Passive System Actor)* yang membalikkan *request* metrik/fakta teknis parameter data film pasca dipanggil (*triggered*) melalui pengetikan *query* pencarian antarmuka mandiri oleh pengguna akhir. Bisa secara otomatis menambahkan genre dan/atau jenis/kategori film saat judul selesai diketik serta tidak akan berpengaruh apa-apa apabila judul tidak ditemukan di IMDb/OMDb.

## 2. USE CASE DIAGRAM (Deskripsi Tekstual)
Relasionalitas komunikasi arsitektur antarmuka fungsional diringkas sebagai berikut:

- Pengguna -> [UC-01: Registrasi & Autentikasi Login]
- Pengguna -> [UC-02: Mencari Metadata Film Eksternal]
- Sistem API Eksternal -> [UC-02: Mencari Metadata Film Eksternal]
- Pengguna -> [UC-03: Menambahkan Film ke Watchlist]
  - [UC-03: Menambahkan Film ke Watchlist] -> *<<include>>* -> [UC-02: Mencari Metadata Film Eksternal]
- Pengguna -> [UC-04: Memperbarui Status/Atribut Film]
- Pengguna -> [UC-05: Memfilter & Mengurutkan Daftar Film]
- Pengguna -> [UC-06: Menghapus Entri Film] (Asosiasi)

---

## 3. SPESIFIKASI USE CASE DETAIL

**UC-01: Registrasi & Autentikasi Login**
+-- Aktor : Pengguna
+-- Deskripsi : Pengguna melakukan pembuatan identitas kredensial gres atau masuk mengeklaim token sesinya menggunakan kompilasi padanan Email dan Password.
+-- Precondition : Pengguna berada di gerbang navigasi utama sistem dalam keadaan *logged-out* (tidak memiliki instrumen sesi lintas batas yang masih berlaku).
+-- Basic Flow : 
    1. Pengguna memasukkan alamat surel dan form kata sandi ganda.
    2. Sistem mengevaluasi *hash verification* terhadap padanan rekaman basis data relasional.
    3. Jika divalidasi presisi, pangkalan data mendepositkan token otorisasi rahasia (*JWT/Session*) ke kanal lokal klien.
    4. Navigasi web pengguna dialihkan otomatis berevolusi ke rute *dashboard* utama.
+-- Alternative : Pengguna baru menginputkan *email* yang belum pernah ada, menu rute mengganti modul layar *login* ke layar *register* untuk dikukuhkan rekam cadangan persetujuan *password*-nya.
+-- Exception : Kredensial tidak *match* atau format pengetikan keliru menyebabkan modul menayangkan panji (banner) restriksi penolakan tanpa membukan rute perlindungan dalam.
+-- Postcondition: Konteks sesi tertib tervalidasi aktif. Pengguna mendapatkan wewenang otonom memodifikasi koleksi referensi baris pangkalan data yang berindeks *(Row Level Security)* persis sama dengan UUID-nya sendiri.

**UC-02: Mencari Metadata Film Eksternal**
+-- Aktor : Pengguna, Sistem API Eksternal
+-- Deskripsi : Prosedur otomasi inkuiri ke bank pengetahuan pihak penengah (ekuivalen OMDb) memformalkan kueri nama leksikal fiktif bertransformasi mendapatkan paket deskripsi teknis (rating dasar, genre presisi dominan, rentang panjang durasi episode dan poster).
+-- Precondition : Pengguna berwenang mengklik navigasi pemicu tombol fungsional "Tambah Film" pada utilitas laman antar muka.
+-- Basic Flow : 
    1. Pengguna memicu pengetikan kueri nama tajuk karya sinema pada *input bar* pencarian.
    2. Konstruksi *Node Client* merancang laju *Payload HTTP Request* ke proksi gerbang API Eksternal.
    3. API meninjau beban kueri dan merespons paket bundel struktur *JSON* berdasar kalkulus probabilitas referensi leksikal tertinggi.
    4. Kerangka layar *Frontend React* membedah komponen (*parsing*) metadatanya menjelma manifestasi pratinjau kartu.
+-- Alternative : Mengaktivasi pencarian memanfaatkan susunan Nomor Identifikasi standar basis data internasional (Contoh ID IMDb: `tt1234567`) dan bukan teks naratif konvensional.
+-- Exception : Trafik jaringan API kandas merespons dan/atau beban pendaftaran melampaui limit gratis (*Rate-Limit*). Modul reaktif berinisiatif menutupi kegagalan dengan pemutaran formulir mentah masukan mandiri.
+-- Postcondition: Pustaka tatanan memori *client-side* klien berhasil menangkap cadangan variabel meta siap sandang ke form pendaftaran pengarsipan basis data utama (berlanjut ke siklus inklusi UC-03).

**UC-03: Menambahkan Film ke Watchlist**
+-- Aktor : Pengguna
+-- Deskripsi : Menyisipkan komoditas tontonan rujukan baru pada portofolio penayangan *database* lokal dengan menyilang padanan preferensi kepribadian ekspektasi tontonan log film aktual yang dikendalikan pengguna pribadi.
+-- Precondition : Modul wujud pratinjau (mendera pasca eksekusi inklusif *include* UC-02) telah mengantongi struktur meta parameter seutuhnya. Subsistem *auth token* diklaim mutlak.
+-- Basic Flow : 
    1. Pengguna menyetujui korelasi konfirmasi data film rujukan OMDb bersangkutan di bilah modul yang tersaji.
    2. Pengguna memodulasi *state* klasemen fungsional visual referensial di level opsi tonton: "Akan" / "Sedang" / "Selesai".
    3. Pengguna menembakan *action invoke* lewat interaksi ketukan "Simpan/Konfirmasi Dokumen Baru".
    4. Aluran antarmuka dialihkan menembus peladen persisten (Backend Node.js) dan mengeklaim *commit query Insert SQL*.
    5. Antarmuka DOM List *Dashboard Client* mengeksekusi regenerasi daftar yang dibubuhi daftar barunya (*State Update* instan).
+-- Alternative : Mengonversi pencatatan manual jika karya teater spesifik/independen luar jejaring komersial belum terafiliasi IMDb.
+-- Exception : Peladen Pangkalan Data menolak registrasi log komoditas ini dikarenakan *timeout exception connection loss* antara web app terhadap PostgreSQL awan.
+-- Postcondition: Tabel matriks terisolasi mengklaim kenaikan pertambahan presisi kuantitas sebanyak 1 entri sinema fungsional terdaftar persisten menambat pada pemanggil UUID eksklusif.

**UC-04: Memperbarui Status/Atribut Film**
+-- Aktor : Pengguna
+-- Deskripsi : Merekayasa rotasi atribut preferensi dinamika sesudah peloncatan kurun usia koleksi (contoh implementif fungsionalis: menaikkan parameter nilai penikmatan setelah *grading* aktual tonton dan mengubah mode baris fisis form 'Akan' -> menduduki tata letak format list tabel 'Tuntas/Selesai Ditonton').
+-- Precondition : Sistem mendeteksi entri tabel memiliki agregat eksistensi rekaman absolut tak nol.
+-- Basic Flow : 
    1. Konsumen memantik aksi *Edit* / Ubah Nilai lewat sub-menu baris detail properti satu karya eksklusif.
    2. Jendela parameter (*modal/drawer*) tersorot merekam rekaan susunan konfigurasi tatanan rekaman log aktual yang kini dipakai saat disana berdiam asalnya baris ini.
    3. Aktor mensimulasikan perpindahan variabel selektor (Merotasi nilai bintang kualifikasi dari nihil berubah memegang 4 / 5 skalasi nilai utuh).
    4. Pengguna memanggil komando eksekutor *Update*.
    5. Penggantian skema variabel mereplace persis nilai properti log spesifik tabel.
+-- Alternative : Teknik fungsional antarmuka *UI Drag-And-Drop Kanban* difungsikan memberlakukan mutasi instingtif pergantian letak tatanan tabel *status layer* tanpa repot mengarungi pengetikan manual di dialog pop-up edit bersarang.
+-- Exception : Pendelegasian perintah fisis tidak merotasi keadaan memori lantaran hilangnya koneksi TCP diam-diam di balik layer peramban selama transisi perbankan sinyal.
+-- Postcondition: Baris data menampakkan rotasi keadaan valid tergurat presisi persisten pada entitas bersangkutan.

**UC-05: Memfilter & Mengurutkan Daftar Film**
+-- Aktor : Pengguna
+-- Deskripsi : Sub-komponen arsitek fungsionalitas merestrukturisasi presentasi optik pemetaan koleksinya melalui konvensi himpunan kompilasi variabel asimetrik guna merampingkan laju visibilitas hasil temuan tatanan log yang diinginkan mendesak.
+-- Precondition : Eksistensi rekapitulasi data pangkalan logistik memiliki keragaman rekam majemuk minimal 2 atau selebih varian bersilangan beda entri untuk mendukung proses kondisional utilitas saring berfaedah.
+-- Basic Flow : 
    1. Pemegang otoritas membentangkan bilah panel penyortiran seleksi.
    2. Aktor menentukan konstelasi parameter seleksi ganda kompleks (contoh logis: Mewajibkan *Type Equals*'Selang Episodik berseri', namun Mengeliminir *Status tontonan* 'Akan ditilik' diselingi mensortir abjad 'Z-A').
    3. Komponen mesin reaktif *Dashboard State Side* mengerahkan metode fungsi sintaksis logik reduksi *array* iteratif *Frontend* murni (menanggalkan proses sinkron *database request backend* tak bermakna).
    4. Kesimpulan pemangkasan himpunan ditayangkan pada wadah grid render layar penayangan dalam rasio tempo faksi millisekon.
+-- Alternative : Kondensasi sekadar merespons rotasi satu opsi penyaringan mendasar tunggal (sekelas urutan Skor Nilai Metrik dari pucuk tertinggi ke nihil).
+-- Exception : Kalkulus penyelerasan silang memproduksi kesimpulan selesaian nihil mutlak, antarmuka layar membalas kompensasi panji visual elegan (berketerangan teks pemberitahuan informatif 'Log Tidak Beririsan'). 
+-- Postcondition: Pemandangan susunan kompilat logistik log menciut presisi di level fokus algoritma pengondisian rekayasa seleksi penentuan pengguna membatasi rentang kognitif penelusuran katalog besarnya.

---

## 4. TRACEABILITY MATRIX
Tabel *Requirement Traceability Matrix* memverifikasi tingkat akomodasi keselarasan konseptual dari desain spesifikasi model fungsional *Use Case* (UC) menjawab kerangka tuntutan esensial operasional sistem (*Functional Requirement* - FR) terdokumentasi sebelumnya dari tatanan standar `03_SRS.md`:

| ID Kebutuhan (Referensi FR pada SRS) | Ref. Spesifikasi Use Case Berkaitan | Verifikasi Parameter Harmonisasi (Konkordansi) |
|---|---|---|
| **FR-001** (Atribut Otentikasi Modul Sign-In Terpusat Email dan Otentikator Sandi) | UC-01 | Alokasi utilitas pintu kanal otonom kredensial ditanggung murni pelaksanaannya pada struktur arsitektur UC-01 yang membakukan token. |
| **FR-002** (Layanan Terotorisasi Memanipulasi Log Kehidupan Persisten: Menambah, Modulasi Aktual Rekaman, Eliminasi Entri Radikal) | UC-03, UC-04, UC-06 | Pendelegasian rutinitas manajemen wewenang mutlak siklus ini diderivasi rinci eksekutornya kedalam UC-03 (Pendaftaran File), UC-04 (Pembaruan Rekam Atribut Usia/Fase Tonton), ditambah dukungan sekutu logis pada fungsi penghapusan presisi di model rintisan UC-06. |
| **FR-003** (Kompensator Efisiensi Penulis via Aliran Algoritma Parametris Mesin Entitas Pihak Eksternal: IMDB/OMDb API Handler) | UC-02 | Fungsionalitas penarikan spesifikasi pangkalan film Wikipedia/IMDb dijembatani menjadi pemonitor tunggal pemandu form pengisian di *flow use case* pendaftar antarmuka UC-02 *sebagai pendahulu mutlak bagi proses log UC-03*. |
| **FR-004** (Konfigurasi Polimorfisme Tatanan Layar UI lewat Algoritma Penyusunan Indeks Silang Pemilahan Bersyarat) | UC-05 | Keharusan manajemen visual untuk mengklasifikasi log sesuai kehendak pengguna mutlak diimplementasi tuntas via rekayasa fungsi *reduksi array array filter list* di penjuru utilitas spesifikasi UC-05. |
| **FR-005** (Standardisasi Mutlak Limitasi Metode Analisis Karya Terkonsentrasi via Fiksasi Komponen Matriks Nilai Interger Numerikal Saja) | UC-03, UC-04 | Regulasi eksklusi entri ulasan paragraf dan penetapan kualifikasi film dengan bilangan skoring terpatri di perwujudan interaksi layar masukan rutinitas pengumpulan daftar log di UC-03, dan terekspos ketat saat interaksi memediasi layar pergantian rekaman di operasi rotasi UC-04. |
| **FR-006** (Isolasi Restriksi Zonasi *Endpoint Database Row Authorization Architecture Multiuser Privacy*) | UC-01 | Perlindungan sekat tatanan privat tak berlapis rute *Social Network* ditabalkan implementasinya menjadi pondasi postkondisi pada persetujuan pertimbangan komitmen validitas di layar navigasi pengantar UC-01. |
