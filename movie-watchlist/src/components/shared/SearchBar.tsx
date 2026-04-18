"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X, Loader2 } from "lucide-react";
import { searchMoviesApi } from "@/services/search.api";
import { OMDbSearchResult } from "@/types/movie";

/**
 * @module Integrasi API Eksternal
 * @desc Komponen input pencarian film Premium dengan feedback visual real-time
 * @author Freta Yordinia Laura
 */
export default function SearchBar({ onSelectMovie }: { onSelectMovie: (movie: OMDbSearchResult) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<OMDbSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debouncing 300ms (UX Refinement)
  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      setLoading(false);
      setHasSearched(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      setHasSearched(true);
      try {
        const json = await searchMoviesApi(query);
        if (json.status === "success" && json.data) {
          setResults(json.data);
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="relative w-full max-w-lg group">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#787774]">
          <Search size={16} />
        </div>
        
        <input
          type="text"
          placeholder="Cari judul film... (Inception, Batman, dll)"
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-[#E9E9E7] rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2383E2]/20 focus:border-[#2383E2] text-[#37352F] placeholder-[#A0A09E]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          suppressHydrationWarning
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
          {loading ? (
            <Loader2 size={16} className="animate-spin text-[#2383E2]" />
          ) : query.length > 0 ? (
            <button 
              onClick={handleClear}
              className="p-1 hover:bg-[#F1F1F0] rounded-full text-[#787774] transition-colors"
              title="Bersihkan Pencarian"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      </div>
      
      {/* Search Dropdown / Results */}
      {query.length >= 3 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-[#E9E9E7] shadow-2xl rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {loading ? (
            <div className="p-4 text-center text-sm text-[#787774]">Sedang mencari film...</div>
          ) : results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {results.map((movie: OMDbSearchResult, idx) => (
                <div 
                  key={`${movie.external_api_id}-${idx}`}
                  onClick={() => {
                    onSelectMovie(movie);
                    handleClear();
                  }}
                  className="flex items-center p-3 hover:bg-[#F7F6F3] cursor-pointer transition-colors border-b border-[#F1F1F0] last:border-0 group/item"
                >
                  <div className="relative w-10 h-14 flex-shrink-0 mr-4 shadow-sm">
                    {movie.poster_url && movie.poster_url !== "N/A" ? (
                      <Image 
                        src={movie.poster_url} 
                        alt={movie.title} 
                        fill 
                        className="object-cover rounded-md" 
                        unoptimized 
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F1F1F0] flex items-center justify-center text-[8px] text-[#A0A09E]">Cover</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#37352F] truncate group-hover/item:text-[#2383E2] transition-colors">{movie.title}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-[10px] bg-[#F1F1F0] text-[#787774] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">{movie.year}</span>
                      <span className="text-xs text-[#787774]">ID: {movie.external_api_id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : hasSearched && (
            <div className="p-6 text-center">
              <p className="text-sm text-[#787774]">Film "<span className="font-medium">{query}</span>" tidak ditemukan.</p>
              <p className="text-xs text-[#A0A09E] mt-1">Coba kata kunci lain atau periksa koneksi internet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

