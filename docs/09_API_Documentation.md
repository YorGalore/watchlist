# RESTful API DOCUMENTATION
## Sistem Aplikasi Movie Watchlist

## 1.0 INFORMASI UMUM
- **Sistem:** Movie Watchlist API
- **Versi API:** v1.0.0
- **Base URL Endpoint:** `/api/v1`
- **Format Data Konsumsi:** `application/json`
- **Kredensial Autentikasi:** Bearer Token (JSON Web Token - JWT)

**Mekanisme Ketat Autentikasi JWT:**
- **Header:** Wajib mengangkut injeksi konvensi `Authorization: Bearer <token_jwt_aktif>`.
- **Payload Data:** Bagian parameter tubuh Token murni menyelundupkan klaim substansial (`sub`) sebatas `user_id` absolut (UUID referensi) penggerak kepatuhan relasi isolasi baris SQL (Penegak Syarat FR-006).
- **Lifetime Expiry:** Retensi batas kedaluwarsa proksi ditetapkan putus otomatis menembus umur **24 Jam** paska peracikan keping token per perdana sandi *login*.

---

## 2.0 RESOURCE: AUTHENTICATION
Digunakan istimewa perihal pendirian titik awal negosiasi penerimaan identitas pengunjung eksternal untuk mengklaim delegasi ruang tiket operasinya.

### 2.1 Mendaftarkan Pilar Akun Baru (Register)
- **Method :** `POST`
- **Endpoint :** `/api/v1/auth/register`
- **Auth :** None
- **Deskripsi:** Pemahatan otonom alamat surel menabuh genderang kepemilikan partisi laci pangkalan tabel terisolasi gres.
- **Request Body:**
  ```json
  {
    "email": "user@mail.com",
    "password": "secure_password_123"
  }
  ```
- **Response 201 Created:**
  ```json
  {
    "status": "success",
    "data": { "id": "123e4567-e89b-12d3...", "email": "user@mail.com" },
    "token": "eyJhbGciOiJIUz...",
    "message": "Arsip Keanggotaan Terangkai Rapi"
  }
  ```
- **Response Error:** `400 Bad Request` (Benturan Redundansi Email/Validasi gagal struktural), `422 Unprocessable` (Alamat tidak patut).
- **Contoh cURL:**
  ```bash
  curl -X POST https://domain.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@mail.com","password":"pwd"}'
  ```

### 2.2 Serah Terima Validasi Sesi (Login)
- **Method :** `POST`
- **Endpoint :** `/api/v1/auth/login`
- **Auth :** None
- **Deskripsi:** Transaksi komparasi rahasia kata sandi memanen kunci identitas JWT menembus layar portal tersembunyi.
- **Request Body:**
  ```json
  {
    "email": "user@mail.com",
    "password": "secure_password_123"
  }
  ```
- **Response 200 OK:**
  ```json
  {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "message": "Delegasi Portal Tertembus Sukses"
  }
  ```
- **Response Error:** `401 Unauthorized` (Sandi tertebak ngawur / Pemutusan Surel fiktif nihil eksistensi).
- **Contoh cURL:**
  ```bash
  curl -X POST https://domain.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@mail.com","password":"pwd"}'
  ```

---

## 3.0 RESOURCE: WATCHLIST
Rute penanganan arus fungsionalitas manajemen *database* komoditas katalog sinema murni ranah pangkalan otonom pengguna.

### 3.1 Pengerukan Tatanan Koleksi (Get Watchlist)
- **Method :** `GET`
- **Endpoint :** `/api/v1/watchlist`
- **Auth :** Diwanti Bearer Token (JWT)
- **Deskripsi:** Menarik membentangkan jala jajaran baris rekam portofolio log film absolut terdedikasi hak waris profil yang tengah terhubung.
- **Query Params Filter Logis (FR-004 Mutlak):** `?status=PLAN&sort_by=rating_desc&genre=Action`
- **Response 200 OK:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "abc-123",
        "movie": { "title": "Inception", "genre": "Sci-Fi", "poster_url": "https..." },
        "watch_status": "PLAN",
        "rating_score": null
      }
    ],
    "message": "Tarikan Dasbor Mengangkasa Sempurna"
  }
  ```
- **Response Error:** `401 Unauthorized`.
- **Contoh cURL:**
  ```bash
  curl -X GET "https://domain.com/api/v1/watchlist?status=COMPLETED&sort_by=rating_desc" \
  -H "Authorization: Bearer <TOKEN_JWT_DI_SINI>"
  ```

### 3.2 Transplantasi Tambahan Tayang Baru (Add Movie Entity)
- **Method :** `POST`
- **Endpoint :** `/api/v1/watchlist`
- **Auth :** Mutlak Bearer Token (JWT)
- **Deskripsi:** Menambatkan replika ikatan hak paten log pemirsa merujuk abstraksi sinopsis API peladen penyedia luar (Agregasi OMDb).
- **Request Body:**
  ```json
  {
    "external_api_id": "tt1375666",
    "watch_status": "COMPLETED",
    "rating_score": 9.5
  }
  ```
- **Response 201 Created:**
  ```json
  {
    "status": "success",
    "data": { "id": "xyz-987", "movie_id": "def-456", "watch_status": "COMPLETED" },
    "message": "Rekam Jejak Tonton Tertambat Megah"
  }
  ```
- **Response Error:** `400 Bad Request` (Rute duplikasi), `422 Unprocessable` (Parameter tipe rentang kueri salah), `403 Forbidden`.
- **Contoh cURL:**
  ```bash
  curl -X POST https://domain.com/api/v1/watchlist \
  -H "Authorization: Bearer <TOKEN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"external_api_id":"tt1234567","watch_status":"PLAN"}'
  ```

### 3.3 Penyesuaian Revolusi Manipulatif Status (Update Watchlist Entry)
- **Method :** `PATCH`
- **Endpoint :** `/api/v1/watchlist/{id}`
- **Auth :** Wajib Bearer Token (JWT)
- **Deskripsi:** Transisi merotasi atribut rujukan kelayakan (Status Tamat / Pergeseran Matriks Rating Tonton mutakhir - Ketentuan FR-005).
- **Request Body:**
  ```json
  {
    "watch_status": "COMPLETED",
    "rating_score": 8.0
  }
  ```
- **Response 200 OK:**
  ```json
  {
    "status": "success",
    "data": { "id": "xyz-987", "watch_status": "COMPLETED", "rating_score": 8.0 },
    "message": "Mutasi Properti Leksikal Tertuang Paten"
  }
  ```
- **Response Error:** `403 Forbidden` (Cacat peretasan: Usaha menodai formasi UID milik entitas pengguna maya lain), `404 Not Found` (Cacat ID Relasi siluman), `422 Unprocessable`.
- **Contoh cURL:**
  ```bash
  curl -X PATCH https://domain.com/api/v1/watchlist/xyz-987 \
  -H "Authorization: Bearer <TOKEN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"watch_status":"COMPLETED", "rating_score": 8.5}'
  ```

### 3.4 Eliminasi Baris Kepemilikan (Delete Entry)
- **Method :** `DELETE`
- **Endpoint :** `/api/v1/watchlist/{id}`
- **Auth :** Diperlukan Bearer Token (JWT)
- **Deskripsi:** Kemutlakan penarikan pencabutan riwayat satu judul eksistensi di perbatasan otonomi log *database* relasional pemanggilnya murni.
- **Response 200 OK:**
  ```json
  {
    "status": "success",
    "data": null,
    "message": "Eradikasi Ruang Data Tuntas Tanpa Sisa"
  }
  ```
- **Response Error:** `403 Forbidden` (Sirkulasi Wewenang Tercemar Tumpah), `404 Not Found`.
- **Contoh cURL:**
  ```bash
  curl -X DELETE https://domain.com/api/v1/watchlist/xyz-987 \
  -H "Authorization: Bearer <TOKEN_JWT>"
  ```

---

## 4.0 RESOURCE: EXTERNAL SEARCH (API PROXY BRIDGE)

### 4.1 Eksekusi Sinkronisasi Jendela Proksi OMDb Eksternal
- **Method :** `GET`
- **Endpoint :** `/api/v1/search`
- **Auth :** Bearer Token Membatasi (JWT)
- **Deskripsi:** Pendelegasian proksi perantara penyeberangan jaringan *backend server Node.js* menuju belantara titik OMDb guna menyelubungi jejak rahasia *Third-Party Keystore API* klien dari ranah bongkaran paparan peramban publik luaran.
- **Query Params:** `?q={title_query}`
- **Response 200 OK:**
  ```json
  {
    "status": "success",
    "data": [
      {
        "external_api_id": "tt1375666",
        "title": "Inception",
        "release_format": "movie",
        "poster_url": "https:...",
        "genre": "Action, Sci-Fi"
      }
    ],
    "message": "Tangkapan Sinyal Radikal Eksternal Tembus Bersih"
  }
  ```
- **Response Error:** `400 Bad Request` (Ketukan pancingan kueri `q` dibiarkan tandus nihil), `500 Internal Error` (Pihak Luar Mengalami Gejolak Hancur / Tumbang).
- **Contoh cURL:**
  ```bash
  curl -X GET "https://domain.com/api/v1/search?q=Inception" \
  -H "Authorization: Bearer <TOKEN_JWT>"
  ```

---

## 5.0 LAPSUS KODE STATUS & ERROR HANDLING
Mesin komputator merespons patuh melempar parameter sandi telemetri standar global yang konstan membeberkan keadaan sehat rute interaksi:
- **`200 OK / 201 Created`**: Titik sasaran ekskusi rute konfirmasi dijamah sempurna tuntas laksana janji alurnya mulus.
- **`400 Bad Request`**: Permulaan cacat menyusup di bilik parameternya. Bentukan struktur input muatan `body/query` bertebaran tak patuh format.
- **`401 Unauthorized`**: Utusan malaikat pelindung garda tak menemukan keping otentikator Token JWT (Disita rusak kekosongan nihil, telah hangus membusuk oleh limitasi waktu *Expiry 24 Jam*, atau cetakan sablon palsu).
- **`403 Forbidden`**: Pengusiran Puncak Konstrain (Restriksi Amanat FR-006)! Token menyisip sah, sayangnya pengguna nekat mengkhianati zonasi melangkah berupaya mengintervensi atau mencekik log rekaman rute baris matriks ID milik ranah kebangsaan tetangganya secara liar.
- **`404 Not Found`**: Histerisnya eksekusi pencarian ID pada ujung rantai pangkalan deret target parameter entitas sungguhan tak berwujud.
- **`422 Unprocessable Entity`**: Evaluasi benturan logika fisis asertif masukan (*Validation Array Range Limit*, contoh: Memberi rentang angka leksikal `999` pada pilar kueri *rating skor limit mutlak 10* mendesak penolakan eksekutor validasi pangkalan statis ZOD/Joi dsb).
- **`500 Internal Server Error`**: Ambrolnya pondasi sekuritas dinding mesin penggerak *Database* mandiri RDBMS maupun lumpuhnya kelistrikan jembatan gerbang OMDb yang kebetulan tak sanggup ditekan daya angkat skrip tangkap antisipasi Node.js internal kita pada detik insiden.

---

## 6.0 KEBIJAKAN SEKTORAL KEAMANAN & RATE LIMITING
- **Defensif Rate Limiting Policy:** Diperketat komputasinya melempar perisai batu batas status cegatan `429 Too Many Requests` tatkala pelacakan menabrak alamat asal IP pengakses serampangan mengerubuti pengetukan rute melampaui rentangan limit pelarangan **100 *request* mutlak sirkulasi rotasi batas per-15 menitan**. (Memproteksi sirkulasi rute pelarian dari ekskploitasi beban kerugian penagihan tarif komersial pada celah pintu masuk pelabelan OMDb `search route`).
- **Sita Batas CORS Restriction:** Penjegalan rute penyusupan silang (*Cross-Origin Resource Sharing*) murni ditolak bertubi-tubi menyisir ke segala penjuru entitas panggilan fisis awan terluar bilamana merayap di dimensi di luar gerbang selubung *Whitelisted-origins* domain konfigurasi pangkalan *Web Portal App* resmi berpenghuni. Mematikan intervensi peretas ekskul via ekstensi Postman umum tanpa izin teritorial mutlak.
- **Struktur Versioning Cerdas:** Menancapkan segel pijakan kestabilan rute *URL Parameter* bersusunan `/api/v1/` meyakinkan konsistensi pengerukan *endpoint* bagi *software interface client-frontend*. Tatkala masa revolusi merengkuh pemutakhiran ekstrem infrastruktur rilis kebaruan `/v2/` pada dekade masa depan, peluncuran ini akan menyamping harmonis seraya tidak menodai kemurnian tulang punggung sandaran versi mula klien historis yang mengkonsumsi utilitas versi perdana terdahulu.
