/**
 * @module WatchlistService
 * @desc Logika bisnis untuk Operasi CRUD pada Watchlist yang dikonstrain ke Otorisasi User
 * @author Freta Yordinia Laura
 * @date 2026-04-01
 * @version 1.0.0
 */

import prisma from "@/lib/prisma";
import { getMovieDetails } from "@/lib/services/omdb.service";

export interface WatchlistPayload {
  external_api_id?: string;
  title: string;
  year?: string;
  poster_url?: string;
  status?: string;
  rating?: number;
  notes?: string;
}

export interface WatchlistFilters {
  sort?: string;
  genre?: string;
  status?: string;
}

/**
 * Menambahkan film baru ke dalam daftar tontonan pengguna.
 * @param {string} userId - ID Pengguna dari token
 * @param {WatchlistPayload} movieData - Rekam profil film asimilasi OMDb
 */
export const addToWatchlist = async (userId: string, movieData: WatchlistPayload) => {
  let fetchedGenre: string | undefined = undefined;

  // Pencegahan Entri Film OMDb Ganda khusus untuk API eksternal
  if (movieData.external_api_id) {
    const existing = await prisma.watchlist.findUnique({
      where: {
        userId_external_api_id: {
          userId,
          external_api_id: movieData.external_api_id,
        }
      }
    });

    if (existing) {
      throw new Error("Film sudah ada di dalam Watchlist Anda.");
    }

    // FR-003: Otomatisasi penarikan Genre tanpa repot-repot user mengetik
    try {
      const details = await getMovieDetails(movieData.external_api_id);
      fetchedGenre = details.genre;
    } catch {
      console.warn("Gagal mengekstrak genre detail untuk film:", movieData.external_api_id);
    }
  }

  return prisma.watchlist.create({
    data: {
      userId,
      title: movieData.title,
      external_api_id: movieData.external_api_id,
      year: movieData.year,
      poster_url: movieData.poster_url,
      genre: fetchedGenre,
      status: movieData.status || "PLAN_TO_WATCH",
      rating: movieData.rating,
      notes: movieData.notes
    }
  });
};

/**
 * Mengambil rekap daftar tontonan milik satu pengguna tertentu (Mendukung FR-004 Filter & Sort).
 * @param {string} userId - Terjamin terekstrak dari perlintasan JWT
 * @param {WatchlistFilters} [filters] - Parameter opsional pemilahan database-level
 */
export const getUserWatchlist = async (userId: string, filters?: WatchlistFilters) => {
  const where: { userId: string; genre?: { contains: string; mode: 'insensitive' }; status?: string } = { userId };
  
  if (filters?.genre) {
    // Mode Insensitive agar 'action' atau 'Action' dihitung sama
    where.genre = { contains: filters.genre, mode: 'insensitive' };
  }
  if (filters?.status && filters.status !== 'ALL') {
    where.status = filters.status;
  }

  let orderBy: Record<string, string> = { createdAt: "desc" };
  
  if (filters?.sort) {
    switch (filters.sort) {
      case 'title-asc': orderBy = { title: "asc" }; break;
      case 'title-desc': orderBy = { title: "desc" }; break;
      case 'rating-desc': orderBy = { rating: "desc" }; break;
      case 'year-desc': orderBy = { year: "desc" }; break;
      default: orderBy = { createdAt: "desc" }; break;
    }
  }

  return prisma.watchlist.findMany({
    where,
    orderBy
  });
};

/**
 * Mengubah rincian status menonton pada objek film terpilih.
 * @param {string} userId - Penjamin otoritas rute aktual
 * @param {string} watchlistId - ID rekam watchlist film
 * @param {string} status - PLAN_TO_WATCH, WATCHING, FINISHED
 * @param {number} [rating] - Pemberian bintang/rating manual opsional
 */
export const updateWatchlistStatus = async (userId: string, watchlistId: string, status: string, rating?: number) => {
  const existing = await prisma.watchlist.findFirst({
    where: { id: watchlistId, userId }
  });

  if (!existing) {
    throw new Error("Akses penyuntingan tidak diizinkan atau data tak ditemukan.");
  }

  return prisma.watchlist.update({
    where: { id: watchlistId },
    data: { status, rating }
  });
};

/**
 * Mencabut tajuk rekam tontonan permanen ke tempat pembuangan.
 * @param {string} userId - Pengunci klaim hak cipta User
 * @param {string} watchlistId - Unik identifier dari tabel referensi film pribadi 
 */
export const removeFromWatchlist = async (userId: string, watchlistId: string) => {
  const existing = await prisma.watchlist.findFirst({
    where: { id: watchlistId, userId }
  });

  if (!existing) {
    throw new Error("Akses penghapusan ditolak atau data tak eksis.");
  }

  return prisma.watchlist.delete({
    where: { id: watchlistId }
  });
};
