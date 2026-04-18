# SOFTWARE QUALITY ASSURANCE PLAN (SQAP)
## Dokumen Kepatuhan IEEE 730 - Sistem Movie Watchlist

## 1.0 TUJUAN & RUANG LINGKUP SQA
Tujuan dokumen SQAP (Software Quality Assurance Plan) ini adalah menyediakan kerangka tata kelola penjaminan mutu yang sistematis bagi siklus hidup pengembangan perangkat lunak ("SDLC") proyek *Movie Watchlist*. Ruang lingkup rencana mencakup pelacakan audit, pemantauan standar penyandian (coding standards), pelaporan *bug/defect*, hingga manajemen metrik penyelesaian cacat dari tahap pra-konstruksi sampai purna-UAT (User Acceptance Testing) agar perangkat lunak selaras memenuhi kualifikasi standar akademik S2/Industri.

---

## 2.0 MANAJEMEN SQA
### 2.1 Organisasi & Tanggung Jawab
- **SQA Lead (Manajer Mutu Teknis):** Mengontrol dan meninjau keabsahan keseluruhan gerbang mutasi kualitas dalam proyek. Diwakili oleh Perwakilan Tim QA/Tech Lead.
- **Software Engineer / Developer:** Berkewajiban menulis kode selaras konvensi kesepakatan murni, menyetor pengujian fungsi level-unit mandiri (*Unit Testing*), serta menanggulangi perbaikan *bug fix*.
- **Client Stakeholder (Klien / Layanan Jasa):** Berposisi mengaudit dan memberikan validasi lolos pengujian pada evaluasi akhir di fajar *Gate 5 (UAT)* purwarupa siap luncur.

### 2.2 Quality Gates dalam SDLC
Sistem dikompromikan mematuhi pertanggungjawaban pelepasan bertahap melindungi palang pintu perbatasan rentan rilis (*Quality Gates*):
- **Gate 1: Requirements Review (sebelum desain)** -> Membuktikan kesepakatan pemangku di mana draf formulasi PRD dan SRS tuntas diperiksa silang dari ambiguitas operasional logikal.
- **Gate 2: Design Review (sebelum coding)** -> Titik henti pemberhentian evaluasi kelayakan cetak biru ERD *Database*, Diagram Arsitektur sistem *Next.js*, dan permodelan antar muka grafis *Notion-esque*.
- **Gate 3: Code Review + Unit Test (tiap modul selesai)** -> Integrasi penjagaan inspeksi sirkuit kode menuntut evaluasi pengawasan sejawat mutlak (*Peer Review*) mengawal penetrasi asersi batas *Code Coverage 80%* harian rutin.
- **Gate 4: Integration Test (sebelum UAT)** -> Melibatkan sirkulasi demonstrasi pelarangan batas akhir komponen di pangkalan tiruan pementasan (*Staging CI/CD server*), meraba dari UI layar menembus palang RDBMS lapisan *Database ORM Prisma*.
- **Gate 5: UAT Sign-off (sebelum go-live)** -> *Handover* perangkat purwarupa mutlak pada institusi wakil Klien di mana pengguna akhir mengamini ekspektasinya terwujud di dunia maya sesungguhnya.

---

## 3.0 DOKUMENTASI SQA
Kesegaran matriks arsip menjamin rekam jejak mutu dikawal menuruti tata administrasi pelaporan struktur kepatuhan sentral di seksi ini:

| Kode | Nama Dokumen | Dibuat Oleh | Direview | Jadwal |
|---|---|---|---|---|
| **DOC-QA-01** | *Master Test Plan Dokumen (IEEE 829)* | SQA Lead Architect | Pimpinan Teknis / Analis Klien | Pra-eksekusi pembangunan repositori *koding* |
| **DOC-QA-02** | Laporan Ekstrak *Unit Test & Code Coverage* | Mesin *CI/CD Pipeline System* | Rekan Pengembang Sedivisi (*Peer*) | Eksekusi paralel pengawalan Rilis Commit Harian |
| **DOC-QA-03** | Rekapitulasi Lacak Inventaris Log (*Bug Defect*) | Analis *QA Tester* / Tim | Manajer *SQA Lead* mutlak | Evaluasi konstan periodik penuntasan per-Modul Fitur |
| **DOC-QA-04** | Laporan Inspeksi Integrasi Sentral (*End-to-End*) | Perekayasa Automator (*Robot Cypress/Playwright*) | Tech Lead Pimpinan Arsitek | 1 Hari Mendahului Peluncuran *Staging Server Rilis* |
| **DOC-QA-05** | Dokumen Legalitas Bukti *UAT Sign-off Record* | Wakil Delegasi Institusi Klien | Pemangku Mutlak Wewenang Peluncuran | Menghiasi ujung fase purna evaluasi pra-operasional awam |

---

## 4.0 STANDAR, PRAKTIK & KONVENSI
Guna membakar rute kelumpuhan kompleksitas peranti proyek kompilator, pemelihara dituntut takhluk pada konvensi konstitusi rekayasa esensial:
- **Naming convention sesuai stack:** Mematuhi sintaks dialek peladen kontemporer mutakhir (JavaScript/Edge/PostgreSQL). *`camelCase`* dimandatkan mendefinisikan tatanan metode operasional *controller/frontend components*; dan *`snake_case`* diamanatkan absolut melabeli nomenklatur nama kolom baris relasional skema *Database SQL Entity*.
- **Kompleksitas siklomatik maks 10 per fungsi:** Menekan persimpangan sirkuit rentan gila percabangan bersarang dalam (`if, else, switch case`). Melemahkan kecenderungan rasio lahirnya bongkahan *spaghetti code* logikal panjang yang tidak transparan dibaca di kemudian hari rilis peremajaan.
- **Panjang fungsi maks 50 baris:** Setiap penggalan modul instrumen abstraksi *Service Route* dihukum terurai melanggar batas vertikal 50 rentangan instruksi baris spesifik per fungsinya, memaksa pendistribusian rekayasa modul koding ringkas mandiri dan mudah diasuransi pengujian terisolir bebas pendarahan lintasan memori.
- **Minimal code coverage: 80%:** Parameter kewajiban batas saringan kelulusan uji peranti tes di mana pangkalan perlindungan pengujian otomatis tak goyah memperlambat masuknya rute perubahan melampaui tingkat penetrasi asuransi skor komputasi skrip uji ke pangkalan kurang dari serap ambang pelindungan fisis 80%.

**Tabel Penugasan Direktori Mutlak Tools Kewajiban SQA Terpadu:**

| Kategori | Tool | Tujuan |
|---|---|---|
| **Unit Testing** | Jest / PHPUnit / Pytest | Pengujian saringan pilar mandiri ketepatan unit fungsi logikal terkecil di ekosistem murni lokal |
| **API Testing** | Supertest / Newman Postman | Pengujian reliabilitas eksekutor respons asinkron sambungan rute menembaki titik integrat endpoint sasar/OMDb |
| **Coverage** | Istanbul / nyc / Xdebug (PHP) | Laporan agregat fisis rasio pembilangan representasi jangkauan presentase fungsional sintaks terlindungi unit tes aman |
| **Linting** | ESLint / PHP-CS-Fixer | Konsistensi penertiban tata tulis kode (perbaikan jarak spasi keliru, lekukan batas margin indentasi otomatis selaras harmonis anggota sejawat) |
| **Static Anal.** | SonarLint / PHPStan (Bila PHP) | Deteksi jangkauan peretasan dan pencegahan keberangkatan *bug statik* anomali variabel keamanan kerentanan koding kosong (*Zero-Day*) pra-*commit* kompilasi |

---

## 5.0 TINJAUAN & AUDIT
Kerangka retsropseksi pengawasan disentralisasikan dalam kebijakan audit harian sistematis terstruktur ketat *CQM (Continuous Quality Management)*. Mengharuskan pimpinan teknis atau anggota serombongan mematikan isolasi individual lewat implementasi rotasi perlindungan berlapis *GitHub/GitLab Pull Request Approvals*. Larangan murni pemutakhiran repositori sentral andaikata tanpa melampirkan pelisensian verifikasi stempel persetujuan rekan perekayasa (*konvensi aturan sakral rasio '2 pasang mata sejawat wajib independen inspeksi pelarangan pengunggahan rilis' / Second pair of eyes rule*).

---

## 6.0 MANAJEMEN DEFECT (BUG LIFECYCLE)
Catatan gangguan kelimpungan penyimpangan wajib didaftarkan pada rel perambanan pelaporan melayari tahapan rute inventaris log siklus sirkuit (*Misal melintasi Tracker Jira*):
1. **New:** Kegagalan operasional diinventarisir ke laci pangkalan penampungan tunggu perawan antrean laporan backlog.
2. **Assigned:** Pimpinan teknis melontarkan amanah kepemilikan rongsokan tatanan perbaikan mengikat punggung satu utusan personil staf insinyur pelaksana bedah fungsional mandiri terkait.
3. **In Progress:** Mekanik perangkat piranti bersangkutan memutar reka logik membongkar selimut abstraksi koding untuk merakit tembikar balasan algoritma penambalnya pada layar uji *sandbox debugging lokal*.
4. **Fixed:** Pembenahan kompilat disepakati sehat sejenak. Modifikasi diekspor beralih dipindah menghuni tatanan wadah ruang pementasan kompilator QA uji awan silang asinkron purwarupa *Staging Server Test Bed*.
5. **Verified:** Penguji SQA otomatisis/Manualis menghardik ulang meriam celah peretasan menyerang titik bug lampau mengokohkan fiksasi ketidakhadiran anomali runtuh ulangan di lintasan baru.
6. **Closed:** Manajer mutlak memaku stempel label pamungkas penutup peti. Kasus diresmikan tergiling tuntas sejarah abadi bebas menjamah tatanan operasional rute sebelah merawat rilis berkesinambungan damai awet memelihara kestabilan integratif purwarupa baru.

**Tingkatan Rujukan Identitas Keparahan Urgensi Rekayasa (Severity Classification):**
- **Critical:** Disfungsi lumpuh mendasar memberangus eksekusi rute utilitas transaksional jantung sistem secara mematikan tanpa rute alternatif pintas evakuasi awam (Cth: *Sistem Relasional Pangkalan Watchlists Roboh Melarang Mutlak Layar Log Dasbor Buka Akses Sama Sekali, Kode 500*).
- **High:** Kegagalan utilitas berat melukai parameter sirkuit krusial logis esensial mencederai fungsi pemrosesan hasil hitungan angka akurasi nyata (Cth: *Mesin saring penyortiran dasbor gagal menterjemahkan kueri membuahkan respon tampilan tabel pangkalan yang ngawur hilang kompilat riwayat eksklusif tayangan*).
- **Medium:** Disfungsi menjengkelkan menghambat perlambatan transisi gerak moderat tidak mengunci kiamat fungsi penuntasan utuh beriring kelonggaran batas rute penelusran layar toleran (Cth: *Bilah tombol sunting Edit Rating fisis terputus interaksi sentuh parsial khusus terisolir di gawai resolusi horizontal tertentu saja yang macet kliknya menyenggol*).
- **Low:** Kecacatan fungsional tipografis sekadar menyangkut noda keliru susun rupa resolusi wajah batas penelusuran desain minimal kelunturan estetik non-krusial murni (Cth: *Kesalahan pewarnaan tombol, tipografi teks kapitalisasi kata keterangan 'Watchlog' fiktif terdistorsi tak selaras palet pedoman Notions*).
- **Enhancement:** Masukan usulan gagasan aspiratif improvisasi pelengkap pembesar fungsi segar merawat penambahan wacana parameter koding purwarupa fiktif diluar perjanjian rilis murni masa target eksekusi tenggat saat ini (Catatan Peningkatan Utilitas Pasca Rilis V1).

---

## 7.0 RISIKO KUALITAS KENDALA (QUALITY RISK FACTORS MULTIPLE)
Pelonggaran kewaspadaan fiksasi pengabaian potensi pergesekan disensor dari deteksi dini mitigasi merangkul bahaya berikut:
1. **Risiko 1 (Disfungsi Pangkalan Penyedia API Mentah Pihak Ketiga Independen):** Kebergantungan fungsional silang menarik kueri luar OMDb/Wiki memaparkan probabilitas penolakan muatan balasan rilis server melahirkan penguliran siklus pengunduhan tanpa henti meremukkan peramban memori *looping requests*. (Rute Kompensasi Pencegahan Limit Mutlak Waktu Panggil HTTP).
2. **Risiko 2 (Defisiensi Zonasi Enkapsulasi Identitas Privasi RDBMS Bocor):** Pemutusan kelicikan pengelabuan isolasi baris profil meniadakan penapis log otonom mengoyak tabir percampuran *cross-user watchlist matrices row view leakage* (Sangat Fatal menghancurkan konsensus spesifikasi SRS murni privatisasi eksklusif klien anonim tunggal).
3. **Risiko 3 (Regresi Inkonsistensi Pembengkak Render Jaringan Klien Kompilat React DOM Memory Clogging):** Mengesampingkan pengujian kompresi asuransi muatan data rute merender secara instingtif 25.000 log memori komoditas koleksi rekam tayangan sejajar melibas memori silang V8 Engine peramban berujung layar beku gawai penikmat web aplikasi mentah.
4. **Risiko 4 (Kelalaian Cakupan Kunci Ganda Pertahanan Injeksi Pangkalan Basis Data Prisma Limit):** Kerap meremehkan intervensi restriksi keruntuhan tameng pangkalan membiarkan peretasan pengunggahan tatanan parameter log ID duplikat yang menerjang konsistensi ERD baris `Unique Constraint`. Mutlak dipupuk uji fiksasi tangkisan keruntuhan RDBMS Orgasme.
5. **Risiko 5 (Inkonsistensi Kompilat Rilis *Integration Merge Conflict Codebase Repo*):** Kecerobohan penegahan para rekan perekayasa unit mengeksport pelbagai rilis blok tambalan kompilat per baris membelah arsitek struktur asali yang telanjur stabil rawan terkompromi keruntuhan kompilator mutlak meniadakan penegakan asuransi target rasion batas cakupan asertif pengetesan pangkalan *production branch master hub* terpenting di tatanan peradaban eksekutor *Continuous Integrations Vercel Build Steps*.

---

## 8.0 METRIK YANG DIUKUR (Key QA Performance Statistical Measurement Identifiers)
Menengahi penyelarasan manifestasi parameter kuantitatif pelaporan resolusi kesuksesan mutlak kompromi penelaahan sistem pemantauan telemetri SQA merangkul hitungan obyektif konstan:
- **Code Coverage Target Ratio Konstan (%):** Menghitung porsi rasio rentangan pembilangan perlindungan lintasan algoritma instruktif pengujian yang dijaring menyapu cakupan asersi deteksi eksekutor baris kompilasi penunjang stabilitas fungsi peladen bersih. (Parameter target fiksasi penguncian penolakan komit absolut minimum: `>= 80%`).
- **Defect Density Limit Rasionalisasi Per Volume (Jumlahan hitungan rasio bug per-KLOC):** Menyaring statistik meratio sebaran temuan anomali fungsional pra-rilis rata mengintai konstelasi kelipatan ketebalan ribuan barisan perintah murni fisis *(Kilo Lines of Code)*, menyumbang indikator pergerakan perbaikkan kecondongan kemurnian pangkalan bebas parasit.
- **Defect Removal Efficiency / DRE Saringan Pencegahan Eksekutif (%):** Kalkulasi menakar kemurnian kemampuan tameng proteksi gerbang tim SQA meminimalisir lolosnya kotoran ke ranah operasional penonton eksklusif publik murni (Formula Pembilang Kerapatan Mutlak asuransi *seperbandingan perhitungan membagi Total Keseluruhan Bug pra-rilis yang digiling hancur / [Dengan Jumlah Bug digiling pra-peluncuran terkompilat DITAMBAH serpiham rekam cacat insiden komersial pasca pelepasan produksi panggung UAT Live Actual]*).
- **Mean Time To Repair Resolve MTTR Respon Deteksi Rute Tanggap Perbaikan Mutlak (Satuan Waktu Hitungan Jam):** Merekam interval durasi ketangkasan waktu penyelesaian rilis insinyur melahirkan penyatuan tambalan peluru modifikasi rute *Fix/Patch* dari peresmian *tiket assigned defect urgency Critical/High* membelah ruang komite melaju sukses stempel diverifikasi mutlak *Closed/Tuntas tervalidasi*.
- **Pass Rate Pengetesan Skenario Rilis (Test Pass Rate % Absolute Margin):** Representasi tabulasi simplifikasi perbandingan absolut tingkat rekam jejak jumlah rute pengoperasional penyisiran tatanan komparasi eksekutor komputasi murni E2E/Unit terintegrat silang membabi buta *(Deret Kasus Lulus / Total Seluruh Kasus Lintasan diekskusi per siklus)* mengangkasa rute eksekutor peluncuran menembus kualifikasi hijau izin tuntas.