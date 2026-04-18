# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

## 1.0 Pendahuluan
### 1.1 Tujuan Dokumen
Dokumen Software Requirements Specification (SRS) ini adalah fondasi otoritatif tentang spesifikasi perangkat lunak sistem **Movie Watchlist**. Dokumen ini dikarakterisasikan sepadan taraf pemublikasiaan karya akademik tingkat Magister, bermaksud mengesahkan pakta teknis arsitektur perangkat lunak antara pengembang dengan pemegang kepentingan hierarkis asal Layanan Jasa.

### 1.2 Ruang Lingkup Produk
Produk sistem bersandi taksonomi "Movie Watchlist". Platform berbasis internet diperuntukan memfasilitasi pendataan koleksi film perseorangan bertajuk eksklusif Desktop web (*browser rendered*). Fungsional teras produk mengakomodasi penarikan riwayat daftar pustaka *third-party*, memilahkan preferensi tontonan visual pada dimensi status (akan, lantas, usai), tanpa menyisipkan anasir aktivitas media jejaring komunikasi antar personal.

### 1.3 Definisi, Akronim, dan Singkatan
- **API (Application Programming Interface):** Mekanisme operasional serah-terima data otomatis ke agen eksekutor peladen eksternal.
- **UI/UX (User Interface/User Experience):** Antarmuka tatap layar dan analisis fisis maupun emosional pengguna mendalami platform.
- **FR (Functional Requirement):** Standar teknis sistem yang menangguhkan persyaratan wajib guna.
- **NFR (Non-Functional Requirement):** Standar laten yang mencerminkan kualitas pengoperasian secara keseluruhan (kinerja, ketahanan keamanan, dsb).
- **OMDb / Wiki:** Platform portal rujukan metadata industri visual global yang menjadi acuan pengisian automasi.

### 1.4 Referensi
- IEEE Std 830-1998 (*IEEE Recommended Practice for Software Requirements Specifications*).
- Transkripsi Konfirmasi Kebutuhan dan Jawaban Elicitasi Pengguna "Layanan Jasa" (31 Maret 2026).

## 2.0 Deskripsi Keseluruhan
### 2.1 Perspektif Produk
Sistem berfungsi bebas rintang layaknya *Standalone Single Page Application* dengan penyanggah peladen *Backend Node.js* sentral. Lingkungan sirkuit komputasinya dirancang mengikat ke penyedia titik *endpoint* peladen terluar seperti *API Gateway Internet* untuk menggaet aset eksternal dan melokalisir repositori persisten ke dalam *Relational Database*.

### 2.2 Fungsi Produk
- Eksekusi Validasi Akses Profil terpisah multi-pengguna.
- Antarmuka manajemen intervensi basis data (CRUD), pengalihan log penayangan tonton.
- Operasi Polimorfisme manipulasi daftar perenderan lewat antarmuka memilah (Kategori Rating, Klasifikasi Gender Sinema, Rentang Abjad Leksikon, dan Tipe Rilis Platform).
- Pencaplokan Metrik otomatis lewat bilah pencarian *query term*.

### 2.3 Karakteristik Pengguna
Karakteristik spesifik entitas pengguna dideskripsikan sebagai penikmat film konvensional atau kritikus mandiri. Mereka memiliki tingkat edukasi sistem laman peramban *Desktop* memadai (PC/Laptop *first generation*) dengan ekspektasi ketertarikan gaya UI premium merujuk estetika minimalis (Contoh: Konvensi desain "Notion"). Tingkat toleransi terhadap navigasi *overhead* akibat antarmuka tumpang tindih kompleks adalah nol.

### 2.4 Batasan & Asumsi
Aplikasi dibatasi mematikan optimasi *responsive mobile layout grid* dengan dalil pengerucutan spesifikasi bagi orientasi horisontal layar gawai PC/Laptop. Asumsi utamanya memutlakkan pangkalan kerahasiaan kepemilikan partisi relasional antar identitas pengakses di bawah penegakan privasi.

## 3.0 Kebutuhan Fungsional

| ID | Deskripsi | Prioritas | Sumber |
|---|---|---|---|
| **FR-001** | Sistem wajib mengakomodasi form *Sign-In* maupun Pendaftaran dengan basis identifikasi Email serta Kata Sandi (Password). | Tinggi | Klien |
| **FR-002** | Pengguna yang melewati verifikasi sesi diberikan wewenang penuh membaca koleksinya, merakit katalog entri baru, membaharui state atribut kepemilikan, atau memusnahkan riwayat entri tontonannya. | Tinggi | Klien |
| **FR-003** | Algoritma pendaftaran film ditenagai *handler* pencarian (API request) untuk menyingkronikasikan dan menarik data publik eksternal (Genre, Tipe Film/Series, Rating, Visual Poster) secara otomatis, mereduksi keharusan penginputan formulir berlebihan. | Tinggi | Klien |
| **FR-004** | Modul antar-muka *dashboard* mendikte fungsional utilitas instrumen penyaring rentang data terpadu bersumber pada klasemen: Abjad absolut, Genre film dominan, Skoring metrik (*Rating* peringkat), serta Format rilis rujukan. | Tinggi | Klien |
| **FR-005** | Form rekam medis tontonan dibatasi mengandalkan bobot nilai metrik skoring berbintang (*Numerical rating*) untuk mendeterminasi keunggulan karya sepihak, menyetop interupsi berupa pengajuan input ulasan karangan esai. | Sedang | Klien |
| **FR-006** | Struktur pertahanan enkapsulasi mencegah subjek pengguna berwenang A untuk menjamah, memanipulasi, atau mengizinkan pembaruan bagi daftar properti yang dimiliki oleh Subjek B pada *database*. | Kritis | Klien |

## 4.0 Kebutuhan Non-Fungsional
### 4.1 Kebutuhan Performa
- Kecepatan latensi respons navigasi antar halaman statis SPA dihukum melampaui batasan di bawah ukuran log 1.5 detik (Syarat toleransi internet sedang).
- Siklus perubahan pemilahan filter list tontonan diselesaikan secara *Synchronous Interface Rendering* agar tak terdapat *loading bar* persisten bagi penyortiran daftar tertinggal (*Client-sided states*).

### 4.2 Kebutuhan Keamanan
- Kriptografi lintas rute dimandatkan pemakaian *SSL Certificate (HTTPS / TLS.1.2)*.
- Pertukaran kredensial dijawab oleh *Secure Authentication Token (e.g. JWT)* beridentifikasi atribut *HTTP-Only & Secure Cookies*, guna menangkal manuver peretasan manipulasi alih token (XSS).
- Model peladen memprakarsai parameter yang disanitasi ketat (ORM) demi eliminasi infiltrasi *Script SQL Injection* via celah *input URL*.

### 4.3 Kebutuhan Keandalan & Portabilitas
- Kapabilitas sistem menerapkan *Graceful Degradation* di kala konektivitas API Eksternal dihentikan: Alih-alih meremukkan eksekusi *rendering page* menyeluruh, utilitas UI beralih menampikan *feedback failure toast* tanpa melunturkan proses *CRUD Watchlist* statis per-identitas.
- Operasional *Desktop* diklaim portabel serta patuh standar W3C di pelbagai wadah perambah modern: Google Chrome (Engine Blink), Firefox (Engine Gecko), dan Apple Safari untuk jangkauan laptop kontemporer. Trigger untuk updated_at, yaitu perlu menambahkan fungsi trigger agar kolom updated_at otomatis terupdate setiap kali ada perubahan baris tanpa harus didefinisikan manual di level aplikasi.

## 5.0 Kebutuhan Antarmuka Eksternal
1. **User Interfaces (UI):** Disyaratkan penerapan elemen DOM interaktif dengan hirarki margin elegan, mewarisi prinsip palet perwarnaan "Notion-like" untuk kejelasan taksis navigasi visual premium secara horisontal PC.
2. **Hardware Interfaces:** Nol campur tangan piranti *hardware proprietary*. Semua instruksi memuaskan fungsional sensor periferi bawaan perangkat keras komputer (Penunjuk visual panah kursor, Klik Kiri / Kanan, serta pemakaian ketukan di *Keyboard Layout* baku).
3. **Software Interfaces:** Antigravity membangun sirkuit terpusat di lingkungan runtime silang (Contoh *Node.js*) yang bergesekan secara konvensional via *Adapter Interface* dengan sistem database (Postgres).
4. **Communications Interfaces:** Keterhubungan HTTP / TCP/IP melalui jaringan maya standar, disokong *Cross-Origin Resource Sharing (CORS Policy)* untuk pertukaran sumber eksternal tanpa risiko sekuritas blok peramban.
