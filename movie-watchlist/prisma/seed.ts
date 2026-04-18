/**
 * @module PrismaSeeder
 * @desc Menambahkan pengguna dummy (2 akun) ke dalam database untuk kebutuhan test.
 * @author Antigravity
 * @date 2026-03-31
 * @version 1.0.0
 */
import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcrypt';

// @ts-expect-error Client location might vary in different environments
const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  const users = [
    { 
      email: 'user1@dummydaily.com', 
      name: 'User One', 
      password_hash: passwordHash,
      watchlists: {
        create: [
          {
            title: "Inception",
            external_api_id: "tt1375666",
            year: "2010",
            poster_url: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
            status: "PLAN_TO_WATCH",
            rating: 5,
            notes: "Keliatannya bagus, harus tonton akhir pekan ini."
          }
        ]
      }
    },
    { email: 'user2@dummydaily.com', name: 'User Two', password_hash: passwordHash },
  ];

  for (const user of users) {
    const existingUser = await prisma.user.findUnique({ where: { email: user.email } });
    if (!existingUser) {
      await prisma.user.create({ data: user });
      console.log(`Berhasil membuat dummy user: ${user.email}`);
    } else {
      console.log(`Dummy user ${user.email} sudah ada.`);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
