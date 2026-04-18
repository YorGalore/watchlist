# DOKUMEN ARSITEKTUR SISTEM (IEEE 1016 compliant)
## Sistem Aplikasi Movie Watchlist

## 1.0 PENDAHULUAN
### 1.1 Tujuan & Audiens Dokumen
Dokumen Deskripsi Arsitektur Perangkat Lunak (*Software Architecture Description*) ini mendeskripsikan kerangka teknis dari platform *Movie Watchlist*. Struktur laporan diselaraskan terhadap pedoman konvensi akademik IEEE Std 1016, digunakan selaku rujukan operasional divalidasi bagi Insinyur Perangkat Lunak, Arsitek Sistem Pemeliharaan, Tim Evaluasi Mutu, serta klien *Layanan Jasa* dalam rangka melahirkan komprehensi yang koheren terkait arsitektur sistem.

### 1.2 Ruang Lingkup Arsitektur
Ruang lingkup arsitektur berpusat pada hierarki pertukaran lapisan klien (*Client-side Presentation*), unit transaksional pengurai logika (*Backend Business Logic*), rute abstraksi data, dan persistensi memori (RDBMS). Ruang lingkup dipatok eksklusif untuk melayani spesifikasi antar-muka tunggal antolog ganda pengguna (*single-tenant multi-user platform*) dalam ekosistem peramban penampil matriks, tanpa menjajaki migrasi *native mobile app* maupun disrupsi *Microservices* hibrida yang terlampau gemuk untuk operasional dasar target ini.

---

## 2.0 GAMBARAN ARSITEKTUR
### 2.1 Pola Arsitektur (Architecture Pattern)
Sistem *Movie Watchlist* menganut rancangan moduler **N-Tier (Layered Architecture)** melalui pemupukan integrasi mulus ke wujud koheren arsitektur **Full-Stack SPA Monolith**, dijalankan di bawah ekosistem silang Node.js dengan batasan garis tanggung jawab vertikal di setiap lapisannya.

### 2.2 Alasan Pemilihan Pola
Gagasan kerangka *Layered Architecture* sentralisasi disubstitusikan mengalahkan *Microservices* dikarenakan beban lalu-lintas operasional bertradisi transaksional sederhana (operasi CRUD leksikografis basis data dan *parsing* antarmuka OMDb API). Isolasi parameter logika ke dalam balok vertikal terpadu (N-Tier) memfasilitasi keleluasaan relokasi logis per modul di masa depan, merapatkan kohesi manajemen repositori kode, dan melemahkan *overhead* biaya pencatatan peladen *Cloud*.

### 2.3 Diagram Komponen (Format Tekstual)
```text
[Web Browser Klien - Komputasi PC Desktop] 
      |
    (Lintas Jaringan HTTP/HTTPS)
      |
      v
[Presentation Layer (Rangka UI/UX HTML DOM & State Manager)]  --> (Async Request) --> [API Publik: OMDb / Wikipedia]
      |
    (Panggilan Otorisasi Rute Internal JSON)
      |
      v
[Business Logic Layer (Autentikasi Kredensial, Penghitung Sortir, Enkapsulasi)]
      |
    (Prisma ORM Objects)
      |
      v
[Data Access Layer (Driver Adaptor Relasional RDBMS)]
      |
    (Koneksi soket TCP/IP Port 5432)
      |
      v
[Database Layer (PostgreSQL Persistent Storage Pangkalan Tabel)]
```

---

## 3.0 LAPISAN ARSITEKTUR
### 3.1 Presentation Layer (Frontend)
Merupakan tumpuan garis edar representasi antarmuka penayangan visual dan psikologis kepada pengguna aplikasi. Lapisan memori parsial dirender lewat kekuatan kapabilitas peramban web modern, mensyaratkan utilitas fungsional reaktif guna merangkul konversi data masukan murni peranti fisik (keyboard/mouse) ke konvensi interaktif, mengelola penyimpanan status *state* komponen transien untuk kalkulus fungsi penyortiran, sebelum mendistribusikan sinkronisasinya ke rute peladen internal.

### 3.2 Business Logic Layer (Backend/API)
Zona eksklusif kontrol otak logis perangkat lunak. Modul fungsional di pilar ini berkeputusan mutlak mengecek restriksi hak izin kepemilikan pengguna profil A atas rekaman arsip A (berdasarkan token wewenang enkripsi), melakukan agregasi perambanan ke API katalog pihak ketiga, serta mentransformasi parameter rute *frontend* murni menjadi paket muatan layak olah ke pangkalan inti.

### 3.3 Data Access Layer
Jembatan fisis statis berbasiskan obyek kelas fungsional (*Object Relational Mapper*). Tugas esensial adaptasi ini di antaranya mengamankan lalu lalang *query filter* berlapis klien dari distorsi kelemahan peretasan struktural injeksi, mensinkronisasikan abstraksi dari orientasi JavaScript bertransisi ke dialek mesin *Database* murni di belakang layar.

### 3.4 Database Layer
Lapisan penyimpanan fundamental bermutu paling awet, dieksklusikan operasionalnya secara ketat dari paparan visibilitas internet publik (berada dalam balutan rute awan partisi). Lapis ini memberdayakan *Relational Database Management System* (RDBMS) penampung tatanan log mutlak, selaras harmonis relasi tabel paten pada draf dokumen *05_Database_Design.md*.

---

## 4.0 TEKNOLOGI STACK
| Layer | Teknologi | Versi | Alasan Pemilihan |
|---|---|---|---|
| **Presentation** | React (via Next.js Framework) | v14+ | Mengeksploitasi arsitektur perenderan silang komponen tanpa batas responsivitas antarmuka *Client Component Navigation*. |
| **Presentation** | Tailwind CSS / Vanilla CSS | v3+ / Native | Mengakselerasi penyelarasan skema palet minimalis eksklusif elegan (Notion-esque) mengabaikan penimbuan librari blok usang berlebihan. |
| **Business Logic**| Node.js / Next.js Serverless API | LTS / Node.js 20+ | Eliminasi penerjemahan logika majemuk bahasa program. Konsolidasi homogen ke fiksasi silang peramban dan peladen (`JS/TS End-to-end`). |
| **Data Access** | Prisma ORM | Mutakhir | Sistem konstrain pengetikan tipenya mementahkan probabilitas malfungsi kalkulus *query database rute ganda* yang lumrah ditemui pemelihara *SQL mentah*. |
| **Database** | PostgreSQL | v15 / v16 | Agregator RDBMS standar mahsyur kelas wahid dunia mempertahankan keutuhan relasional isolasi atomik murninya tanpa distraksi skalabilitas perambanan tatanan tabel asing. |

---

## 5.0 KEAMANAN ARSITEKTUR
### 5.1 Autentikasi & Otorisasi
Lingkungan menolak preservasi wewenang berbasis *stateful session* memori manual, dipindahkan otonominya bersumber kriptografi **JSON Web Token (JWT)**. Validasi mutlak pendelegasian otoritas menitis pada stempel otentikasi tersebut dan diamankan secara proaktif mengandalkan restriksi penahanan sirkuit peramban *HTTP-Only & Secure Cookies*, menutup lobang manuver penjarah *Cross-Site Scripting (XSS)* mengeksploitasi dokumen.

### 5.2 Enkripsi Data & Audit Trail
- **Enkripsi Transit Parameter:** Segala lalu lalang peluru parameter komunikasi berlindung dibalik selimut protokol simetris *Transport Layer Security* (Memutar koneksi melintasi standar aman HTTPS).
- **At-Rest Storage:** Properti krusial peladen utamanya kata sandi profil dieksekusi fiksasi *Salted Password Hashing* bergantung kalkulasi pertahanan tangguh penunda waktu bruteforce, yakni algoritma `Bcrypt` putaran tinggi.
- **Audit Logging Atribut:** Operasional rotasi komoditas entri katalog persisten ditautkan otomatis dengan rekaman pelacak garis waktu kronologisnya secara mutlak lewat modifikasi indeks `created_at` dan rotasinya di `updated_at`.

---

## 6.0 DEPLOYMENT ARCHITECTURE
### 6.1 Topologi Deployment
Beban pendelegasian komputatonal mendistribusikan aset pada pola arsitektur *Serverless Edge / PaaS* (Platform-As-A-Service). Muatan kerangka logis dan layar mereduksi sentralisasi dengan menyebar ke simpul delegasi ujung peranti internet sedunia (*Global CDN*). Posisi mesin basis data mengokupasi klaster terisolasi dilindungi pengalamatan mutlak tertutup selubung sirkuit maya jaringan awan fiktif (*VPC Firewall*).

### 6.2 Kebutuhan Infrastruktur
- Lapis Komputasi Transaksional: Penyuplai rute Vercel merangkul tugas menyajikan rute penampungan rilis dan komputasi persisten (mengotomasikan peluncuran berkelanjutan integrasi *Git CI/CD Pipeline* mutlak).
- Ekosistem Peladen Pangkalan Data: Disuplai instansi *managed-hosting* relasional berspesialisasi mengelola Postgres untuk efisiensi kelembaman performa basis murni.

### 6.3 Strategi Backup & Recovery
Integritas arsip data awan tervalidasi rutinitas perputaran cadangan tangkapan sistem (*Daily Full Volume Snapshot Backup*) diputar berkisar retensi 7-hari pengukuhan absolut. *Recovery Point Objective* dipatok presisi melarang kebocoran kerugian waktu hilang pengoperasian transisional yang tidak mumpuni melebihi kalkulasi tenggat kaliber 24 jam.

---

## 7.0 KEPUTUSAN ARSITEKTUR (ADR)

**ADR-001: Pelekatan Infrastruktur Monolitik Full-Stack Menggunakan Next.js**
- **Status:** *Accepted* (Diterima)
- **Konteks:** Spesifikasi platform didominasi mutlak rutinitas komputasi statis berorientasi basis log masuk-keluar (CRUD konvensional pangkalan data rekam medis tontonan) tanpa sirkulasi eksekusi *Job Processing* belakang layar masif gila-gilaan, menyarankan pemeliharaan dua fondasi reporsitori koding raksasa (`Create React Frontend Base` vs `Express.js Backend Server Base`) sebagai kegiatan surplus terlampau mahal untuk pembiayaan integrasi silang ke depannya.
- **Keputusan:** Melebur balok peranti penanganan UI klien dan API logika transitif pengaliran basis data melintasi ekosistem absolut kerangka dasar kerangka sentral *Next.js (App Router/Pages Router Backend Integrations)* Node.js.
- **Konsekuensi:** Restriksi keteraturan *engineering* ke vendor spesifik penyaji infrastruktur React terkunci abadi. Pembalasan manfaatnya berupa percepatan *build compilation time* peluncuran dan pemeliharaan peremajaan perangkat lunak lintas lapis ekstrim luar laju kodratnya.

**ADR-002: Eksklusi Pendirian Sistem Basis Data NoSQL (Diambil Alih Konsensus RDBMS/PostgreSQL)**
- **Status:** *Accepted* (Diterima)
- **Konteks:** Rekayasa perangkat tertuntut menaati isolasi profil majemuk dalam standar ekstrem persinggungan mutlak 0 toleransi *Bug Security* log antar baris relasional dokumen tontonan profil ke pengguna beda partisi. (Melampaui syarat FR-006: Mutlak Otonom).
- **Keputusan:** Mengeliminasi skema arsitektur ganda rentan duplikasi pangkalan penyebaran dokumen gembur (*sperti platform NoSQL MongoDB*) demi mengakomodir hierarki pangkalan tabel RDBMS PostgreSQL kokoh ketat.
- **Konsekuensi:** Kemandirian rekayasa mutlak dipaksa memodulasi dan memelihara pemindahan kaku tata bahasa instruksi DDL statis (*Manual Database Migrations Schema changes*). Sejalan meratifikasi kehandalan pertahanan inkonsistensi perombakan anomali relasional data berstatus sakral yang digarap pengembang demi kenyamanan absolut audiens.
