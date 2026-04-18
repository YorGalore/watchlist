/**
 * @module Integrasi API Eksternal
 * @desc Service untuk menjembatani komunikasi antara server kita dengan OMDb API
 * @author Freta Yordinia Laura
 * @date 2026-04-01
 * @version 1.0
 */

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = process.env.OMDB_BASE_URL;

/**
 * Mendaftarkan tipe abstrak untuk respon OMDb
 */
export interface OMDbMovieSummary {
  external_api_id: string;
  title: string;
  year: string;
  poster_url: string;
  type: string;
}

export interface OMDbMovieDetails extends OMDbMovieSummary {
  genre: string;
  rating: string;
  plot: string;
}

/**
 * Mencari daftar film berdasarkan kata kunci judul
 * @param {string} query - Judul film yang dicari
 * @returns {Promise<OMDbMovieSummary[]>} Array berisi ringkasan film (Title, Year, imdbID, Poster)
 */
export const searchMoviesFromOMDb = async (query: string): Promise<OMDbMovieSummary[]> => {
  try {
    if (!API_KEY || !BASE_URL) throw new Error("Konfigurasi server OMDb hilang.");
    
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.Response === "False") {
      // Jika error karena 'Too many results' atau 'not found', cukup kembalikan array kosong
      // agar tidak memicu 500 Internal Server Error di Frontend saat pencarian parsial.
      return [];
    }

    // Mapping data agar bersih sesuai kebutuhan FR-003
    return data.Search.map((item: { imdbID: string; Title: string; Year: string; Poster: string; Type: string }) => ({
      external_api_id: item.imdbID,
      title: item.Title,
      year: item.Year,
      // Perlindungan jika OMDb poster corrupt/N/A
      poster_url: item.Poster !== "N/A" ? item.Poster : "/placeholder-poster.png",
      type: item.Type
    }));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    throw new Error(`Gagal memanggil OMDb: ${message}`);
  }
};

/**
 * Mengambil detail lengkap satu film berdasarkan ID IMDb
 * @param {string} imdbId - ID unik dari OMDb (ttXXXXX)
 * @returns {Promise<OMDbMovieDetails>} Objek detail referensi film
 */
export const getMovieDetails = async (imdbId: string): Promise<OMDbMovieDetails> => {
  try {
    if (!API_KEY || !BASE_URL) throw new Error("Konfigurasi server OMDb hilang.");
    
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbId}&plot=short`);
    const data = await response.json();
    
    if (data.Response === "False") throw new Error(data.Error || "Detail film tidak ditemukan");

    return {
      external_api_id: data.imdbID,
      title: data.Title,
      year: data.Year,
      type: data.Type,
      genre: data.Genre,
      rating: data.imdbRating,
      poster_url: data.Poster !== "N/A" ? data.Poster : "/placeholder-poster.png",
      plot: data.Plot
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    throw new Error(`Gagal membaca detail OMDb: ${message}`);
  }
};
