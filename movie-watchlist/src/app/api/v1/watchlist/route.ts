import { NextResponse } from "next/server";
import { addToWatchlist, getUserWatchlist } from "@/lib/services/watchlist.service";
import { verifyToken } from "@/lib/services/jwt.service";
import { cookies } from "next/headers";

/**
 * @module WatchlistAPI
 * @desc Penanganan endpoint POST/GET Watchlist dengan ketat bersandar ekstraksi JWT payload.
 * @author Freta Yordinia Laura
 * @version 1.0.0
 */

// Ekstraktor Token Helper
const extractUserId = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) throw new Error("Token ekspektasi tidak valid.");
  
  const payload = await verifyToken(token);
  return payload.id;
};

export async function GET(req: Request) {
  try {
    const userId = await extractUserId();
    
    // Mengekstrak URL Search Params yang dikirimkan Client (FR-004)
    const url = new URL(req.url);
    const filters = {
      sort: url.searchParams.get("sort") || undefined,
      genre: url.searchParams.get("genre") || undefined,
      status: url.searchParams.get("status") || undefined,
    };

    const data = await getUserWatchlist(userId, filters);
    return NextResponse.json({ status: "success", data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json({ message }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = await extractUserId();
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json({ message: "Judul Film wajib dicantumkan!" }, { status: 400 });
    }

    const data = await addToWatchlist(userId, body);
    return NextResponse.json({ status: "success", message: "Film dikoleksikan ke Watchlist!", data }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const isDuplicate = message.includes("sudah ada di dalam Watchlist");
    return NextResponse.json({ message }, { status: isDuplicate ? 409 : 400 });
  }
}
