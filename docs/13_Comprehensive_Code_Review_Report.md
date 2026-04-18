# 13. LAPORAN REVIEW KODE KOMPREHENSIF (MODUL 1-4)

## 0.0 Informasi Dokumen
- **Nama Sistem:** Movie Watchlist (YG Sinema)
- **Klien:** Layanan Jasa
- **Tanggal:** 1 April 2026
- **Versi:** 1.0.0
- **Author:** Antigravity (Quality Assurance Lead)

---

## MODUL 1: AUTENTIKASI & OTORISASI

### [KUNING] Kualitas Kode — Medium
- **Lokasi:** `src/lib/services/auth.service.ts:32`
- **Masalah:** Fungsi `verifyToken` hanya merupakan *wrapper* redundan untuk `jwtVerify` dari `jwt.service.ts`. Hal ini melanggar prinsip **KISS (Keep It Simple, Stupid)**.
- **Rekomendasi:** Gunakan langsung import dari `jwt.service.ts` pada layer controller/API untuk mengurangi *depth of call stack*.
- **Kode Perbaikan:**
```typescript
// Di Controller/Layout, import langsung:
import { verifyToken } from "@/lib/services/jwt.service";
```

### [MERAH] Keamanan — Low/Medium
- **Lokasi:** `src/app/api/v1/auth/login/route.ts:49`
- **Masalah:** Penggunaan `sameSite: 'lax'` pada kuki JWT memberikan perlindungan dasar, namun tanpa proteksi CSRF tambahan (seperti `Origin` header check atau CSRF Token) pada endpoint `POST/DELETE`, sistem rentan terhadap serangan lintas situs sederhana.
- **Rekomendasi:** Implementasikan pengecekan header `Origin` atau `Referer` pada middleware atau setel kuki ke `Strict` jika navigasi lintas situs tidak diperlukan.
- **Kode Perbaikan:**
```typescript
response.cookies.set({
  // ...
  sameSite: 'strict', // Ubah ke strict untuk proteksi maksimal
});
```

---

## MODUL 2: MANAJEMEN WATCHLIST

### [HIJAU] Performa — High
- **Lokasi:** `prisma/schema.prisma`
- **Masalah:** Tidak ada indeks pada kolom `status`, `genre`, `rating`, dan `year`. Pencarian dengan filter pada `getUserWatchlist` akan melakukan *Full Table Scan* seiring pertumbuhan data.
- **Rekomendasi:** Tambahkan indeks pada kolom-kolom yang sering digunakan dalam klausa `WHERE` dan `ORDER BY`.
- **Kode Perbaikan:**
```prisma
model Watchlist {
  // ...
  @@index([userId, status])
  @@index([userId, genre])
  @@index([userId, rating])
}
```

### [MERAH] Keamanan — Low
- **Lokasi:** `src/lib/services/watchlist.service.ts:118`
- **Masalah:** Meskipun isolasi `userId` sudah diterapkan, fungsi `findUnique` hanya menggunakan `id`. Verifikasi kepemilikan baru dilakukan *setelah* data diambil dari DB.
- **Rekomendasi:** Masukkan `userId` langsung ke dalam kueri `where` untuk efisiensi dan keamanan berlapis.
- **Kode Perbaikan:**
```typescript
const existing = await prisma.watchlist.findFirst({
  where: { id: watchlistId, userId }
});
```

---

## MODUL 3: INTEGRASI API EKSTERNAL

### [HIJAU] Performa — Medium
- **Lokasi:** `src/lib/services/omdb.service.ts`
- **Masalah:** Tidak ada mekanisme *caching* untuk hasil pencarian OMDb. Setiap pencarian kata kunci yang sama akan memicu request jaringan baru ke API eksternal.
- **Rekomendasi:** Implementasikan *In-memory cache* atau Redis (opsional) untuk query populer.
- **Kode Perbaikan:**
```typescript
const cache = new Map();
export const searchMoviesFromOMDb = async (query: string) => {
  if (cache.has(query)) return cache.get(query);
  // ... fetch logic ...
  cache.set(query, results);
  return results;
};
```

---

## MODUL 4: UI/UX & REFINEMENT

### [KUNING] Kualitas Kode — Low
- **Lokasi:** `src/components/dashboard/MovieCard.tsx:27`
- **Masalah:** Penggunaan `alert()` untuk penanganan galat API. Ini memberikan pengalaman pengguna (UX) yang kurang premium dan terkesan seperti aplikasi *development*.
- **Rekomendasi:** Gunakan komponen *Toast* atau *Notification* yang terintegrasi dengan desain sistem (Notion-style).

---

## KESIMPULAN REVIEW

### Skor Kualitas Keseluruhan: 88/100
- **Keamanan**: 90/100 (Isolasi data sangat baik).
- **Kualitas Kode**: 85/100 (Struktur folder bersih, sedikit redundansi).
- **Performa**: 75/100 (Butuh optimalisasi indeks database).

### Prioritas Perbaikan:
1. **P1 (Kritis)**: Penambahan Indeks Database (Modul 2).
2. **P2 (Penting)**: Pengecekan kepemilikan data langsung di kueri (Modul 2).
3. **P3 (Saran)**: Implementasi Caching API (Modul 3).
