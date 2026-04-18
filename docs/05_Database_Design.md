# DATABASE DESIGN & DATA MODELING
## Lampiran Dokumen Spesifikasi Sistem - Movie Watchlist

## 1. ERD (Entity-Relationship Diagram) — Format Tekstual
Menerjemahkan representasi visual menjadi matriks tekstual korelasi tabel kardinalitas terstruktur. Dan diperlukan adanya trigger untuk updated_at, yaitu menambahkan fungsi trigger agar kolom updated_at otomatis terupdate setiap kali ada perubahan baris tanpa harus didefinisikan manual di level aplikasi.

ENTITAS: users
+-- id : UUID [PK]
+-- email : VARCHAR(255) [UNIQUE, NOT NULL]
+-- password_hash : VARCHAR(255) [NOT NULL]
+-- created_at : TIMESTAMP [NOT NULL, DEFAULT NOW()]
+-- updated_at : TIMESTAMP [NOT NULL, DEFAULT NOW()]

ENTITAS: movies
+-- id : UUID [PK]
+-- external_api_id : VARCHAR(100) [UNIQUE, NULL]
+-- title : VARCHAR(255) [NOT NULL]
+-- release_format : VARCHAR(50) [NOT NULL]
+-- release_date : DATE [NULL]
+-- running_time_min : INT [NULL]
+-- poster_url : VARCHAR(500) [NULL]
+-- created_at : TIMESTAMP [NOT NULL, DEFAULT NOW()]

ENTITAS: genres
+-- id : INT [PK, AUTO_INCREMENT]
+-- name : VARCHAR(100) [UNIQUE, NOT NULL]

ENTITAS: movie_genres
+-- movie_id : UUID [PK]
+-- genre_id : INT [PK]
+-- FK: movies.id (berelasi ke Entitas movies)
+-- FK: genres.id (berelasi ke Entitas genres)

ENTITAS: watchlists
+-- id : UUID [PK]
+-- user_id : UUID [NOT NULL]
+-- movie_id : UUID [NOT NULL]
+-- watch_status : VARCHAR(50) [NOT NULL]
+-- rating_score : DECIMAL(3,1) [NULL]
+-- added_at : TIMESTAMP [NOT NULL, DEFAULT NOW()]
+-- updated_at : TIMESTAMP [NOT NULL, DEFAULT NOW()]
+-- FK: users.id (berelasi ke Entitas users)
+-- FK: movies.id (berelasi ke Entitas movies)

---

## 2. KAMUS DATA (Data Dictionary)

### Tabel: `users`
| Nama Field | Tipe Data | Panjang | Null | Default | Keterangan |
|---|---|---|---|---|---|
| id | UUID | 36 | NO | gen_random_uuid() | Kunci primer sistem representatif Identitas User |
| email | VARCHAR | 255 | NO | - | String email unik mutlak penjaga gawang otentikasi sesi |
| password_hash | VARCHAR | 255 | NO | - | Kredensial kata sandi yang telah di-hash melalui kriptografi khusus (mis. bcrypt) |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | Jejak penentuan rentang waktu mendaftarkan ekosistem profilnya |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | Penanda waktu modifikasi baris profil spesifik termutakhir |

### Tabel: `movies`
| Nama Field | Tipe Data | Panjang | Null | Default | Keterangan |
|---|---|---|---|---|---|
| id | UUID | 36 | NO | gen_random_uuid() | Kunci primer judul persisten pangkalan *database* |
| external_api_id | VARCHAR | 100 | YES | NULL | Nomor *Identifier* orisinil API rujukan (Contoh ID IMDb: *tt1234567*) |
| title | VARCHAR | 255 | NO | - | Susunan huruf alfanumerik nama utama tajuk rilis karya sinema |
| release_format | VARCHAR | 50 | NO | - | Enumerasi kategorikal tipe teater ('movie', 'series') |
| release_date | DATE | - | YES | NULL | Penanggalan aktual konfirmasi kelayakan rilis tontonan |
| running_time_min | INT | 4 | YES | NULL | Kuantitas durasi pengaliran waktu format menit rasional |
| poster_url | VARCHAR | 500 | YES | NULL | Alamat referensial *string URL Endpoint* gambar resolusi visual sampul film |
| created_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | Stempel umur baris riwayat persisten pada ekosistem lokal |

### Tabel: `genres`
| Nama Field | Tipe Data | Panjang | Null | Default | Keterangan |
|---|---|---|---|---|---|
| id | INT | 4 | NO | AUTO_INCREMENT | Identifikator absolut numerik primer kategori format spesifik genre |
| name | VARCHAR | 100 | NO | - | Konvensi nomenklatur tata penamaan *genre* (Misal 'Action', 'Sci-Fi') |

### Tabel: `movie_genres`
| Nama Field | Tipe Data | Panjang | Null | Default | Keterangan |
|---|---|---|---|---|---|
| movie_id | UUID | 36 | NO | - | *Foreign Key* jembatan penghubung entitas dasar `movies` |
| genre_id | INT | 4 | NO | - | *Foreign Key* jembatan pendamping rujukan referensial `genres` |

### Tabel: `watchlists`
| Nama Field | Tipe Data | Panjang | Null | Default | Keterangan |
|---|---|---|---|---|---|
| id | UUID | 36 | NO | gen_random_uuid() | Kunci persisten utama log siklus baris transaksi tontonan |
| user_id | UUID | 36 | NO | - | *Foreign Key* merujuk kepemilikan partisi otentik otonom *Row Identity* |
| movie_id | UUID | 36 | NO | - | *Foreign Key* relasional target observasi film penampungan lokal |
| watch_status | VARCHAR | 50 | NO | 'PLAN' | Evaluasi indikator rute status siklus pengguna: 'PLAN', 'WATCHING', 'COMPLETED' |
| rating_score | DECIMAL | 3,1 | YES | NULL | Ekstraksi bobot evaluasi numerik pecahan maksimal berskala utuh ke-10 (Misal: 8.5) |
| added_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | Histori rekam perdana saat entri katalog tersimpan menembus dasbor otonom |
| updated_at | TIMESTAMP | - | NO | CURRENT_TIMESTAMP | Stempel rekayasa waktu bergeser sesudah parameter fungsional/logis diringkas termutakhir |

---

## 3. PROSES NORMALISASI
Metodologi normalisasi didedikasikan mengurangi ekspektasi cacat perangkaian skenario tak-selaras (anomali) di pangkalan persisten data dengan menghancurkan dependensi logis rentan tumpang-tindih.

**- Unnormalized Form (UNF):**
Skema data berkerumun dalam satu lembaran tabel datar semrawut bertajuk `UserWatchlog`.
*Contoh Entitas Fiktif:* Rekaman baris menyebutkan pengguna `andy@mail.com` menonton judul `Avatar 2` dan mensyaratkan deskripsi pengkategoriannya sebagai `Action, Sci-Fi` dalam satu entri sel (*Comma separated string / Array mentah*).

**- Tahap 1NF (Bentuk Normal Pertama):**
Syarat keharusan atribut murni atomik menuntut tiadanya nilai kumpulan yang dihuni di petak lajur kompartimen tunggal. Atribut plural *genre* `Action, Sci-Fi` mesti didekompresi menempati dimensi tatanan ganda berbaris merdeka. (Contoh transisi: Baris 1: Andy - Avatar 2 - Action; Disiplin diiringi di Baris 2: Andy - Avatar 2 - Sci-Fi).

**- Tahap 2NF (Bentuk Normal Kedua):**
Syarat pelulusan pasca 1NF memestikan netralisir elemen distorsi dari himpunan ikatan sebagian komposit. Akibat email pendaftar (`andy@mail.com`) maupun literatur entri film konstan dieja ulang melipatgandakan limbah perulangan redundan pangkalan data, kami mengekstraksi obyeknya diatur otonom. Relasional kunci proksi mandiri buatan semacam ID disubstitusikan menggeser elemen komposit, meneledorkan kehadiran leksikal berulang. Akibatnya, `users` diekstraksi ke perbatasan absolut sendiri dan bersinergi melalui delegasi panah UUID tak perlu merujuk kembali baris teks surat.

**- Tahap 3NF (Bentuk Normal Ketiga):**
Harmonisasi bentuk ketiga merepresi perlawanan atribut pengikat perintis atas sifat intervensi transitif di mana properti non-kunci tak lazim menyandarkan fungsinya melintasi elemen non-kunci pendamping yang bukan kunci utamanya sungguh-sungguh.
Sebagai rujukan, andaikan ada atribusi tatanan parameter `nama_lokal_genre` disematkan membaur dengan referensi judul di ekosistem `movies`. Logika leksikal pelafalan genre sama sekali bukanlah takdir alami ketergantungan eksistensi terhadap peluncuran karyanya. Karenanya, ekosistem 3NF mendeduksi tabel mandiri konstan penamaam kategori murni ke partisi sentral tunggal (`genres`), mencegah rekaan salah pengetikan (typo) genre merambat dan menghimpun sinkronisasinya menyilang pangkalan proksi terusan majemuk `movie_genres`.

---

## 4. INDEKS & OPTIMASI (Indexing Strategy)
Untuk memastikan *dashboard* bereaksi kilat menembus halangan kompleksitas *query* dan kompilasi seleksi majemuk dalam kompleksitas waktu pencarian sub-linear (*O(log n)*), dianjurkan penyematan kerangka algoritma b-tree index fundamental:

1. **`IDX_users_email`** (Fiksasi `UNIQUE Index B-Tree` untuk entitas sandang `users.email`)
   - *Rasionalitas:* Akselerasi keabsahan panggilan utilitas modul *login*, meringkas eksekusi baris komparasi pengecekan integritas identitas rawan benturan *rate-limiter* keamanan kriptografi.
2. **`IDX_watchlists_user_movie`** (Delegasi `UNIQUE Composite Index` melintasi padanan proksi silang `watchlists(user_id, movie_id)`)
   - *Rasionalitas:* Mengawal ketat validitas konstrain *Database*. Restriksi asimetrik *engine* RDBMS akan menterminasi otomatis eksperimen masuk log duplikat dari tangan pemakai atas takdir rujukan judul serupa dari *database*, merawat rekam entitas eksklusif dari paparan penggumpalan duplikasi tak senonoh.
3. **`IDX_movies_external_id`** (`Index` penunggal pangkalan agregator log `movies.external_api_id`)
   - *Rasionalitas:* Transparansi optimasi rute *Upsert Check (Insert or Update)* atas parameter yang dicaplok saat inkuiri instingtif menanti rilis OMDb, meyakinkan tak mengendapkan limbah redudansi "Film Serupa" saat peladen menyalin data masuk menembus repositori lokalnya.
4. **`IDX_watchlists_status_rating`** (`Composite Index` navigasi ganda padanan `watchlists(watch_status, rating_score)`)
   - *Rasionalitas:* Konsumen akan gigih menuntut rentang filter asimetrik gila-gilaan menantang latensi rute render layar. *Penyortiran* tatanan komposit silang memantik kilat kalkulus relasional susunan list merayap parameter multi-gradasi.

---

## 5. SCHEMA SQL (DDL)
Konfigurasi struktur kode instruksional peladen *Data Definition Language* mengagungkan konvensi leksikal *snake_case*, mereplika penganutan sekte tatanan formasi dialek SQL relasional industri PostgreSQL kontemporer:

```sql
-- Menggenerasikan Tabel Ekosistem Pengguna Otoritatif
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Mendirikan Tabel Entitas Lumbung Pangkalan Karya Sinema
CREATE TABLE movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_api_id VARCHAR(100) UNIQUE,
    title VARCHAR(255) NOT NULL,
    release_format VARCHAR(50) NOT NULL,
    release_date DATE,
    running_time_min INT,
    poster_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Menempatkan Rujukan Referensi Induk Master Format Klasemen
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Merangkai Transmisi Proksi Sinkron Klasifikasi Penganut Silang
CREATE TABLE movie_genres (
    movie_id UUID NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    CONSTRAINT fk_mg_movies FOREIGN KEY (movie_id) 
        REFERENCES movies (id) ON DELETE CASCADE,
    CONSTRAINT fk_mg_genres FOREIGN KEY (genre_id) 
        REFERENCES genres (id) ON DELETE CASCADE
);

-- Eksekusi Utama Manifestasi Log Rutinitas Entri Pangkalan Transitif
CREATE TABLE watchlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    movie_id UUID NOT NULL,
    watch_status VARCHAR(50) NOT NULL DEFAULT 'PLAN',
    rating_score DECIMAL(3,1),
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Membentengi keterpurukan rute referensi yatim piatu tak berpangkalan
    CONSTRAINT fk_wl_users FOREIGN KEY (user_id) 
        REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_wl_movies FOREIGN KEY (movie_id) 
        REFERENCES movies (id) ON DELETE CASCADE,
    -- Memastkan larangan berlakunya 2 entri ganda menuding relasi judul yang sama dari 1 subjek pengklaim
    CONSTRAINT unique_user_movie_watchlist UNIQUE (user_id, movie_id)
);

-- Meneguhkan Indexing Pemangkasan Kalkulus Akselerasi Penelusuran Mesin
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_movies_external_id ON movies(external_api_id);
CREATE INDEX idx_watchlists_user_id ON watchlists(user_id);
CREATE INDEX idx_watchlists_status_rating ON watchlists(watch_status, rating_score);
```
