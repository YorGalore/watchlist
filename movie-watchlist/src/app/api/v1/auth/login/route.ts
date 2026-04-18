/**
 * @module AuthLoginController
 * @desc Menangani lalu lintas API untuk autentikasi pengguna (Sign-In) dan penerbitan JWT.
 * @author Antigravity
 * @date 2026-03-31
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { loginUser } from '@/lib/services/auth.service';

const loginSchema = z.object({
  email: z.string().email({ message: 'Format surel tidak valid.' }),
  password: z.string().min(6, { message: 'Kata sandi minimal 6 karakter.' }),
});

/**
 * Handle POST request untuk login.
 * @param {Request} request - Objek request dari klien.
 * @returns {Promise<NextResponse>} Response JSON dengan token atau error.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const parsedData = loginSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { message: 'Validasi input gagal', errors: parsedData.error.issues },
        { status: 422 }
      );
    }

    const { email, password } = parsedData.data;

    const token = await loginUser(email, password);

    const response = NextResponse.json(
      { status: "success", token, message: 'Berhasil masuk' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 jam untuk menyesuaikan FR
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "";
    if (message === "Kredensial salah") {
      return NextResponse.json(
        { message: 'Kredensial tidak valid (Email/Kata sandi salah).' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada peladen lokal.' },
      { status: 500 }
    );
  }
}
