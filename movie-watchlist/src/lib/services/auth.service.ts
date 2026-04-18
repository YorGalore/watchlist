/**
 * @module AuthService
 * @desc Logika bisnis autentikasi, mencakup hashing Bcrypt dan manajemen JWT.
 * @author Antigravity (Updated by Gemini)
 * @date 2026-04-01
 * @version 1.1.0
 */

import bcrypt from 'bcrypt'; // Disarankan pakai bcryptjs agar aman di semua environment
import prisma from '@/lib/prisma';
import { signToken, verifyToken as jwtVerify } from './jwt.service';

/**
 * Melakukan hashing kata sandi.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Memverifikasi kecocokan kata sandi mentah dengan hash di database.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}


/**
 * Mendaftarkan pengguna baru ke sistem
 */
export const registerUser = async (email: string, password: string, name?: string) => {
  try {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw new Error("Format email tidak valid");
    if (!password) throw new Error("Password tidak boleh kosong");

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("Email sudah terdaftar");

    const hashedPassword = await hashPassword(password);
    return await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        name: name || null
      },
      select: { id: true, email: true, name: true }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Registration Error";
    throw new Error(message);
  }
};

/**
 * Memvalidasi kredensial dan menerbitkan token JWT
 */
export const loginUser = async (email: string, password: string) => {
  try {
    if (!email || !password) throw new Error("Format input tidak lengkap");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Kredensial salah");

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) throw new Error("Kredensial salah");

    // Menggunakan signToken dari jwt.service yang sudah menggunakan 'jose'
    return signToken({ id: user.id, email: user.email });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login Error";
    throw new Error(message);
  }
};