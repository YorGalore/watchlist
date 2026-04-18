import { NextResponse } from "next/server";
import { searchMoviesFromOMDb } from "@/lib/services/omdb.service";

/**
 * @module Integrasi API Eksternal
 * @desc Endpoint Proxy untuk pencarian film agar API Key tidak terekspos di Frontend
 *       dan dilindungi oleh JWT Middleware.
 * @author Freta Yordinia Laura
 * @version 1.0.0
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.length < 3) {
      return NextResponse.json(
        { message: "Kueri pencarian minimal 3 karakter" }, 
        { status: 400 }
      );
    }

    const results = await searchMoviesFromOMDb(query);
    return NextResponse.json({ status: "success", data: results });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
