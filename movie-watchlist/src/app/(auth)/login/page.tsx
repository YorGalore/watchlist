"use client";

import { useState } from "react";
import { postLogin } from "@/services/auth.api";

/**
 * @module Autentikasi
 * @desc Halaman Login dengan desain minimalis presisi ala Notion
 * @author Antigravity (Redesigned by Gemini)
 * @version 1.2.0
 */
export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await postLogin(form);
      if (result.status === "success") {
        // Simpan token ke cookie/localStorage (auth-token diatur via Route Handler / Middleware)
        window.location.href = "/watchlist";
      } else {
        setError(result.message || "Email atau password salah.");
      }
    } catch {
      setError("Terjadi kesalahan koneksi peladen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] font-sans selection:bg-[#2383E2]/20">
      
      {/* Container Form Utama */}
      <div className="w-full max-w-[400px] p-10 bg-white border border-[#E9E9E7] rounded-sm">
        <h1 className="text-[28px] font-bold mb-6 text-[#37352F] tracking-tight text-center">Sign In</h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Field Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-[#787774] uppercase font-bold tracking-wider">Email</label>
            <input 
              type="email" 
              placeholder="nama@email.com"
              className="w-full p-2.5 bg-[#FAFAFA] border border-[#E9E9E7] rounded-sm text-[#37352F] text-sm focus:outline-none focus:border-[#2383E2] transition-colors placeholder-[#D3D1CB]"
              onChange={(e) => setForm({...form, email: e.target.value})}
              required 
              disabled={isLoading}
            />
          </div>

          {/* Field Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-[#787774] uppercase font-bold tracking-wider">Password</label>
            <input 
              type="password" 
              placeholder="Masukkan password Anda..."
              className="w-full p-2.5 bg-[#FAFAFA] border border-[#E9E9E7] rounded-sm text-[#37352F] text-sm focus:outline-none focus:border-[#2383E2] transition-colors placeholder-[#D3D1CB]"
              onChange={(e) => setForm({...form, password: e.target.value})}
              required 
              disabled={isLoading}
            />
          </div>

          {/* Umpan Balik Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-sm">
              <p className="text-red-500 text-xs text-center">{error}</p>
            </div>
          )}

          {/* Tombol Aksi */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2383E2] text-white py-2.5 font-bold text-sm hover:bg-[#1a6ab3] active:bg-[#155a9b] transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#F1F1F0] text-center">
          <p className="text-sm text-[#787774]">
            Belum punya akun?{" "}
            <a href="/register" className="text-[#2383E2] hover:underline font-medium decoration-2 underline-offset-4">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Footer Logo Notion-style */}
      <div className="fixed bottom-8 left-8 flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity">
        <div className="px-1.5 h-8 bg-white border-2 border-[#37352F] rounded-full flex items-center justify-center shadow-sm">
          <span className="text-[#37352F] font-black text-sm select-none tracking-tighter">YG</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-[#787774] font-bold uppercase tracking-[0.2em] leading-none">Powered by</span>
          <span className="text-sm text-[#37352F] font-bold tracking-tight">Notion OS</span>
        </div>
      </div>

    </div>
  );
}
