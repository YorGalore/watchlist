import { NextResponse } from "next/server";
import { updateWatchlistStatus, removeFromWatchlist } from "@/lib/services/watchlist.service";
import { verifyToken } from "@/lib/services/jwt.service";
import { cookies } from "next/headers";

// Ekstraktor Token Helper (Hanya untuk skope Modul Internal 3)
const extractUserId = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) throw new Error("Akses kedaluwarsa, silakan login kembali.");

  const payload = await verifyToken(token);
  return payload.id;
};

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await extractUserId();
    const body = await req.json();
    const resolvedParams = await params;

    if (!body.status) {
      return NextResponse.json({ message: "Konfigurasi status absen ditolak." }, { status: 400 });
    }

    const data = await updateWatchlistStatus(userId, resolvedParams.id, body.status, body.rating);
    return NextResponse.json({ status: "success", data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Forbidden Access";
    return NextResponse.json({ message }, { status: 403 }); // 403 Forbidden Access
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await extractUserId();
    const { id } = await params;

    // Memulai proses hapus movie
    await removeFromWatchlist(userId, id);

    return NextResponse.json({ status: "success", message: "Catatan film berhasil dihapus." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Forbidden Access";
    console.error(`[DELETE ERROR] ${message}`);
    return NextResponse.json({ message }, { status: 403 });
  }
}
