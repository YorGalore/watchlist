import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/**
 * Singleton Prisma Client (v7.6.0 Compatible)
 * Menggunakan Adapter PG untuk koneksi langsung ke pangkalan data lokal PostgreSQL.
 * Solusi paling stabil dan simpel untuk lingkungan Pengembangan Lokal.
 */
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
