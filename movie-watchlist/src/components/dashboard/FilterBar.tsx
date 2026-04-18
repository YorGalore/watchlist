"use client";

import { Filter, ArrowUpDown, Tag } from "lucide-react";

interface FilterBarProps {
  onFilterChange: (filters: { sort?: string; genre?: string; status?: string }) => void;
  currentFilters: { sort?: string; genre?: string; status?: string };
}

/**
 * @module FilterBarComponent
 * @desc Antarmuka bilah pemilahan koleksi dengan desain fungsional minimalis.
 * @author Freta Yordinia Laura
 */
export default function FilterBar({ onFilterChange, currentFilters }: FilterBarProps) {
  
  const handleSelect = (key: string, value: string) => {
    onFilterChange({ ...currentFilters, [key]: value === "ALL" ? undefined : value });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-[#F7F6F3] p-3 rounded-md border border-[#E9E9E7] mb-6">

      <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded border border-[#E9E9E7] text-sm">
        <ArrowUpDown size={14} className="text-[#787774]" />
        <select 
          className="bg-transparent focus:outline-none text-[#37352F] cursor-pointer"
          value={currentFilters.sort || "created-desc"}
          onChange={(e) => handleSelect("sort", e.target.value)}
        >
          <option value="created-desc">Terbaru Ditambahkan</option>
          <option value="title-asc">Abjad (A-Z)</option>
          <option value="title-desc">Abjad (Z-A)</option>
          <option value="rating-desc">Rating Tertinggi</option>
          <option value="year-desc">Tahun Rilis (Terbaru)</option>
        </select>
      </div>

      <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded border border-[#E9E9E7] text-sm">
        <Tag size={14} className="text-[#787774]" />
        <input 
          type="text"
          placeholder="Filter Kategori / Genre..."
          className="bg-transparent focus:outline-none w-36 text-[#37352F] placeholder-[#D3D1CB]"
          value={currentFilters.genre || ""}
          onChange={(e) => handleSelect("genre", e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded border border-[#E9E9E7] text-sm md:ml-auto">
        <Filter size={14} className="text-[#787774]" />
        <select 
          className="bg-transparent focus:outline-none text-[#37352F] cursor-pointer font-medium"
          value={currentFilters.status || "ALL"}
          onChange={(e) => handleSelect("status", e.target.value)}
        >
          <option value="ALL">Semua Status</option>
          <option value="PLAN_TO_WATCH">Plan to Watch</option>
          <option value="WATCHING">Watching</option>
          <option value="FINISHED">Finished</option>
        </select>
      </div>

    </div>
  );
}
