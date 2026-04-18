/**
 * @module AuthRegisterController
 * @desc Menangani request API untuk mendaftarkan akun baru (Sign-Up) dan melakukan hashing.
 * @author Antigravity
 * @date 2026-03-31
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { registerUser } from '@/lib/services/auth.service';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Nama minimal 2 karakter.' }).optional(),
  email: z.string().email({ message: 'Format surel tidak valid.' }),
  password: z.string().min(6, { message: 'Kata sandi minimal 6 karakter.' }),
});

/**
 * Handle POST request untuk pendaftaran akun.
 * @param {Request} request - Objek request dari klien berisikan formulir registrasi.
 * @returns {Promise<NextResponse>} Response status pembuatan (201) atau galat validasi.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const parsedData = registerSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { message: 'Validasi input gagal.', errors: parsedData.error.issues },
        { status: 422 }
      );
    }

    const { email, password, name } = parsedData.data;

    const user = await registerUser(email, password, name);

    return NextResponse.json(
      { 
        status: "success",
        message: 'Registrasi berhasil. Silakan Sign-In.',
        data: user 
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    if (message === "Email sudah terdaftar") {
      return NextResponse.json({ message }, { status: 400 });
    }
    return NextResponse.json(
      { message: message || 'Terjadi kesalahan internal peladen.' },
      { status: 422 }
    );
  }
}
