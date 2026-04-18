"use client";

import { useEffect, useState, useCallback } from "react";
import { getMyWatchlist, addMovieToWatchlist } from "@/services/watchlist.api";
import MovieCard from "@/components/dashboard/MovieCard";
import SearchBar from "@/components/shared/SearchBar";
import FilterBar from "@/components/dashboard/FilterBar";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Movie, OMDbSearchResult } from "@/types/movie";

/**
 * @module DashboardPage
 * @desc Laman Utama Daftar Tontonan Film dengan Dukungan Pemilahan Kinerja Tinggi
 * @author Freta Yordinia Laura
 */
export default function WatchlistPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  
  // State Filter dinamis (FR-004)
  const [filters, setFilters] = useState<{ sort?: string; genre?: string; status?: string }>({});

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await getMyWatchlist(filters);
      if (resp.status === "success") {
        setMovies(resp.data);
      }
    } catch {
      console.error("Gagal memuat film");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Re-fetch kueri otomotis berjalan bila matriks filter tersentuh
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchMovies();
    }, 400); // 400ms debounce menghindari API bombardir saat mengetik nama genre
    
    return () => clearTimeout(delayDebounce);
  }, [fetchMovies]);

  const handleSelectFromSearch = async (movieData: OMDbSearchResult) => {
    setIsSearching(true);
    try {
      const res = await addMovieToWatchlist({
        external_api_id: movieData.external_api_id,
        title: movieData.title,
        year: movieData.year,
        poster_url: movieData.poster_url,
      });
      
      if (res.status === "success") {
        // Berhasil menambahkan, kosongkan filter dan tarik ulang agar data absolut terbaru muncul
        setFilters({});
        fetchMovies(); 
      } else {
        alert(res.message || "Gagal menambah film.");
      }
    } catch {
      alert("Koneksi gagal saat menambah film.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-8 md:p-12 lg:px-24">
      <header className="mb-8 border-b border-[#F1F1F0] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#37352F] tracking-tight">Daftar Tontonan</h1>
          <p className="text-sm text-[#787774] mt-2 max-w-lg">Kelola jejak rekam apresiasi sinema Anda.</p>
        </div>

        {/* Celah Ekstraktif Komponen Modul 2 */}
        <div className="w-full md:w-96">
          <SearchBar onSelectMovie={handleSelectFromSearch} />
          {isSearching && <span className="text-xs text-[#2383E2] mt-2 block animate-pulse">⚙️ Melakukan Asimilasi Metadata Otomatis...</span>}
        </div>
      </header>

      {/* Celah Pemilahan (Filtering) FR-004 */}
      <FilterBar currentFilters={filters} onFilterChange={setFilters} />

      {isLoading ? (
        // Rangkaian Skeleton Loading untuk UX Modul 4
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col border border-[#E9E9E7] rounded-md overflow-hidden bg-white shadow-sm h-96">
              <div className="w-full h-64 bg-[#F2F1EE]"></div>
              <div className="p-3">
                <div className="h-4 bg-[#E9E9E7] rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-[#E9E9E7] rounded w-1/2 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-7 bg-[#E9E9E7] rounded flex-1"></div>
                  <div className="h-7 bg-[#E9E9E7] rounded w-10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <EmptyState isFilterEmpty={Object.keys(filters).length > 0} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onRefresh={fetchMovies} />
          ))}
        </div>
      )}
    </div>
  );
}
