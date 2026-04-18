import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/services/jwt.service";

/**
 * @module DashboardGuard (Node.js)
 * @desc Pelindung rute Dashboard yang berjalan di Node.js (Bebas Edge Runtime).
 *       Mengecek kuki auth_token dan memverifikasi identitas pengguna.
 */
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    await verifyToken(token);
  } catch {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      <DashboardHeader />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
