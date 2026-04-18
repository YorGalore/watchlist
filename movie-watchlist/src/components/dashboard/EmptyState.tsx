import { Ghost, Inbox } from "lucide-react";

/**
 * @module EmptyStateComponent
 * @desc Penanda visual kekosongan data baik akibat filter maupun kekosongan koleksi murni.
 * @author Freta Yordinia Laura
 */

export function EmptyState({ isFilterEmpty = false }: { isFilterEmpty?: boolean }) {
  if (isFilterEmpty) {
    return (
      <div className="flex flex-col h-72 items-center justify-center text-center bg-[#FDFDFC] border border-dashed border-[#E9E9E7] rounded-lg text-[#787774]">
        <Ghost size={48} className="text-[#E9E9E7] mb-3" />
        <p className="text-[#37352F] font-medium mb-1">Tidak ada hasil ditemukan.</p>
        <p className="text-sm">Coba longgarkan atau hapus filter (Genre/Peringkat) di atas.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-72 items-center justify-center text-center bg-[#FDFDFC] border border-[#E9E9E7] rounded-lg shadow-sm text-[#787774] transition-all duration-300">
      <Inbox size={48} strokeWidth={1} className="text-[#D3D1CB] mb-4" />
      <p className="text-[#37352F] font-semibold text-lg mb-1">Koleksi Masih Kosong</p>
      <p className="text-sm max-w-sm">Temukan film dari penjuru dunia lewat mesin pencari OMDb di sudut kanan atas untuk mulai menyusun koleksi Anda!</p>
    </div>
  );
}
