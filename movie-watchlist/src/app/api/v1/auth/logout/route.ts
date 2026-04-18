import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @module AuthAPI
 * @desc Endpoint untuk menghapus sesi kuki pengguna (Logout)
 */
export async function POST() {
  const cookieStore = await cookies();
  
  // Menghapus kuki dengan menyetel masa berlaku yang sudah lewat
  cookieStore.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return NextResponse.json({ 
    status: "success", 
    message: "Logout berhasil, sesi telah dihapus." 
  });
}
