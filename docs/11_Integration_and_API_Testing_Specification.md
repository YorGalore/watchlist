# 11. SPESIFIKASI DAN STRATEGI PENGUJIAN INTEGRASI & API

## 0.0 Informasi Dokumen
- **Nama Sistem:** Movie Watchlist (YG Sinema)
- **Klien:** Layanan Jasa
- **Tanggal:** 1 April 2026
- **Versi:** 1.0.0 (Akademik - Magister Ilmu Komputer)
- **Status:** Final Draft

---

## DAFTAR ISI
1. [Pendahuluan](#10-pendahuluan)
2. [Strategi Integration Testing](#20-strategi-integration-testing)
3. [Pengujian Database (Persistence Integration)](#30-pengujian-database-persistence-integration)
4. [Pengujian API Endpoint (HTTP Integration)](#40-pengujian-api-endpoint-http-integration)
5. [Security Testing (Penetration Lite)](#50-security-testing-penetration-lite)
6. [Glosarium dan Referensi](#60-glosarium-dan-referensi)

---

## 1.0 Pendahuluan
Dokumen ini disusun untuk memberikan panduan teknis mengenai metodologi pengujian integrasi pada sistem *Movie Watchlist*. Pengujian integrasi berfokus pada verifikasi interaksi antar modul, aliran data dari lapisan pangkalan data hingga antarmuka pemrograman aplikasi (API), serta pemenuhan standar keamanan minimum sebelum sistem dinyatakan layak produksi (*Production Ready*).

---

## 2.0 Strategi Integration Testing

### 2.1 Metodologi: Incremental (Bottom-Up)
Pengujian dilakukan secara berjenjang dari lapisan terbawah menuju lapisan teratas untuk memastikan pondasi sistem (Database & Service) stabil sebelum menguji gerbang akses (API).

### 2.2 Hirarki Integrasi (Dependency Graph)
Integrasi modul mengikuti urutan logis sebagai berikut:
1.  **Level 1: Arsitektur Data**: Koneksi PostgreSQL melalui Prisma ORM.
2.  **Level 2: Logika Autentikasi**: Integrasi enkripsi argon2 dan pengelolaan sesi via JWT (Jose).
3.  **Level 3: Relasi Bisnis**: Hubungan entitas User dengan koleksi Watchlist.
4.  **Level 4: Konsumsi Eksternal**: Sinkronisasi asinkron dengan OMDb API Provider.

---

## 3.0 Pengujian Database (Persistence Integration)

Fokus pengujian ini adalah memastikan bahwa *schema migration* dan *ORM mapping* berfungsi sebagaimana mestinya pada database lingkungan pengujian.

### 3.1 Skenario Uji Watchlist Persistence
**Case ID:** INT-DB-01  
**Tujuan:** Memverifikasi penyimpanan data film ke PostgreSQL tanpa kegagalan integritas.

```typescript
/**
 * @test Watchlist Repository — Integration
 */
describe('Watchlist Persistence — Integration', () => {
  const testUserId = "user_test_999";

  beforeAll(async () => {
    // Sinkronisasi database testing
    await prisma.watchlist.deleteMany({ where: { userId: testUserId } });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Harus berhasil menyimpan entri film dan membacanya kembali secara akurat', async () => {
    const data = {
      title: 'Inception',
      external_api_id: 'tt1375666',
      year: '2010',
      poster_url: 'https://image.com/p.jpg'
    };

    // ACT: Pemanggilan service nyata
    await addToWatchlist(testUserId, data);

    // ASSERT: Validasi data di PostgreSQL
    const saved = await prisma.watchlist.findFirst({
      where: { userId: testUserId, external_api_id: 'tt1375666' }
    });

    expect(saved).not.toBeNull();
    expect(saved?.title).toBe('Inception');
  });
});
```

---

## 4.0 Pengujian API Endpoint (HTTP Integration)

Memasangkan logika bisnis dengan protokol HTTP untuk menjamin responsivitas dan kepatuhan status kode.

### 4.1 Modul Autentikasi (`/api/v1/auth/login`)
| Nama Test | Input Payload | Ekspektasi Status | Output Data |
| :--- | :--- | :--- | :--- |
| Valid Login | Email & Pass Benar | 200 OK | Token JWT (Set-Cookie) |
| Invalid Pass | Email Benar, Pass Salah | 401 Unauthorized | Pesan Galat |
| Missing Field | Payload {} | 422 Unprocessable | Array Validation Errors |

### 4.2 Modul Watchlist (`/api/v1/watchlist`)
Memverifikasi bahwa *Middleware Guard* mampu menangkal akses anonim.
- **Skenario:** Request `POST` atau `GET` tanpa header otorisasi.
- **Ekspektasi:** Status 401 Unauthorized, muatan data ditolak.

---

## 5.0 Security Testing (Penetration Lite)

Sebagai standar akademik, sistem diuji terhadap serangan fundamental berbasis OWASP.

### 5.1 SQL Injection Prevention
- **Metode:** Menyisipkan query `' OR 1=1 --` pada parameter pencarian.
- **Alasan:** Prisma ORM menggunakan *parameterized queries* secara default, mengubah input menjadi literal string sehingga tidak mengeksekusi perintah SQL tambahan.

### 5.2 XSS (Cross-Site Scripting)
- **Metode:** Pengiriman string `<script>alert(1)</script>` pada data film.
- **Mitigasi:** Next.js (React) secara otomatis melakukan *encoding* pada teks, mencegah eksekusi skrip berbahaya pada sisi peramban.

### 5.3 JWT Tampering & ID Traversal
Sistem memvalidasi tanda tangan (*signature*) JWT. Jika dimodifikasi, pustaka `jose` akan menolak token. Selain itu, setiap akses data film diproses dengan filter `where: { userId: payload.id }` untuk mencegah eksploitasi akses data milik pengguna lain.

---

## 6.0 Glosarium dan Referensi

### 6.1 Glosarium
- **Integration Test:** Pengujian gabungan beberapa unit untuk memverifikasi fungsionalitas antar modul.
- **JWT (JSON Web Token):** Media pertukaran data klaim secara aman dan ringkas antara client dan server.
- **ORM (Object-Relational Mapping):** Teknik yang menghubungkan database relasional dengan pemrograman berorientasi objek (Prisma).

### 6.2 Referensi
- IEEE 829-2008 Standard for Software and System Test Documentation.
- ISO/IEC 12207 Systems and Software Engineering — Software Life Cycle Processes.
- OWASP Top Ten (A03:2021-Injection).
