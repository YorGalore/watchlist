"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postLogout } from "@/services/auth.api";

/**
 * @module DashboardUI
 * @desc Header navigasi dengan profil user dan fitur Logout
 */
export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await postLogout();
      if (res.status === "success") {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };

  return (
    <header className="w-full bg-white border-b border-[#F1F1F0] px-8 py-3 flex justify-between items-center z-50 sticky top-0 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="px-1.5 h-8 bg-[#37352F] text-white flex items-center justify-center rounded-md font-bold text-sm tracking-tighter">YG</div>
        <span className="font-semibold text-[#37352F]">Movie Watchlist</span>
      </div>

      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded-full bg-[#F7F6F3] border border-[#E9E9E7] flex items-center justify-center hover:bg-[#E9E9E7] transition-colors"
        >
          <svg className="w-5 h-5 text-[#37352F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E9E9E7] shadow-xl rounded-md py-1 animate-in fade-in zoom-in duration-100 origin-top-right">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-[#EB5757] hover:bg-[#FFF5F5] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Keluar (Logout)
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
