"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { editWatchlistStatus, removeMovieFromWatchlist } from '@/services/watchlist.api';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  onRefresh: () => void;
}

/**
 * @module UIComponent
 * @desc Kartu display inventori Film dengan tombol aksi CRUD (Edit status, Hapus)
 * @author Freta Yordinia Laura
 */
export default function MovieCard({ movie, onRefresh }: MovieCardProps) {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      await editWatchlistStatus(movie.id, newStatus);
      onRefresh();
    } catch {
      alert("Gagal memperbarui status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    // Sederhanakan alur hapus untuk stabilitas visual & API
    setLoading(true);
    try {
      const res = await removeMovieFromWatchlist(movie.id);
      if (res.status === "success") {
        onRefresh();
      } else {
        alert(res.message || "Gagal menghapus.");
      }
    } catch {
      alert("Terjadi kesalahan koneksi saat menghapus.");
    } finally {
      setLoading(false);
    }
  };

  const statusColors: Record<string, string> = {
    "PLAN_TO_WATCH": "bg-[#E9E9E7] text-[#787774]",
    "WATCHING": "bg-[#D3E5EF] text-[#2383E2]",
    "FINISHED": "bg-[#DBEDDB] text-[#1C3829]"
  };

  return (
    <div className={`flex flex-col border border-[#E9E9E7] rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-200 ${loading ? 'opacity-50' : ''}`}>
      {/* Gambar Poster */}
      <div className="relative w-full h-64 bg-[#F7F6F3] overflow-hidden">
        {movie.poster_url && movie.poster_url !== "N/A" ? (
          <Image 
            src={movie.poster_url} 
            alt={movie.title} 
            fill 
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full text-[#787774] text-sm">No Poster</div>
        )}
      </div>

      {/* Konten Text */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-[#37352F] text-sm leading-snug line-clamp-2" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-xs text-[#787774] mt-1 mb-3 truncate">
          {movie.year || "Unknown"} • {movie.genre || "No Genre"}
        </p>
        
        {/* Spacer untuk mendongkrak tombol ke bawah */}
        <div className="flex-grow"></div>

        {/* Action Tray */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F1F1F0]">
          <select 
            value={movie.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={loading}
            className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm font-bold focus:outline-none appearance-none cursor-pointer border border-transparent hover:border-[#E9E9E7] transition-all ${statusColors[movie.status] || statusColors["PLAN_TO_WATCH"]}`}
          >
            <option value="PLAN_TO_WATCH">Plan</option>
            <option value="WATCHING">Watching</option>
            <option value="FINISHED">Finished</option>
          </select>

          <button 
            onClick={handleDelete}
            disabled={loading}
            title="Hapus Film"
            className="text-[#EB5757] hover:bg-[#FFF5F5] p-1.5 rounded-md transition-colors flex items-center justify-center border border-transparent hover:border-[#FADBD8]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
