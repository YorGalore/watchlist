import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Gagal menginisialisasi JWT: JWT_SECRET tidak ditemukan pada berkas .env.");
}
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

/**
 * Menandatangani dan menerbitkan JWT (JSON Web Token).
 * @param {object} payload - Identitas data pengguna yang akan disimpan di Payload.
 * @returns {Promise<string>} String JWT terenkripsi.
 */
export async function signToken(payload: { id: string; email: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(encodedSecret);
}

interface JwtPayload {
  id: string;
  email: string;
  [key: string]: unknown;
}

/**
 * Memverifikasi integritas JWT dan mengembalikan isinya (Edge Runtime Compatible).
 * @param {string} token - String token JWT
 * @returns {Promise<JwtPayload>} Objek payload jika valid.
 */
export async function verifyToken(token: string): Promise<JwtPayload> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload as unknown as JwtPayload;
  } catch {
    throw new Error('Token tidak valid atau sudah kadaluarsa.');
  }
}
