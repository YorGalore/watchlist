import { addToWatchlist, getUserWatchlist, updateWatchlistStatus, removeFromWatchlist, WatchlistPayload } from "@/lib/services/watchlist.service";
import { prismaMock } from "./singleton";
import { GET } from "@/app/api/v1/watchlist/route";
import { verifyToken } from "@/lib/services/jwt.service";
import { cookies } from "next/headers";
import { Movie } from "@/types/movie";

// MOCK DEPENDENCIES - Top level to avoid ESM/jose issues
jest.mock("@/lib/services/jwt.service", () => ({ 
  verifyToken: jest.fn().mockResolvedValue({ id: "user_123" }) 
}));

jest.mock("next/headers", () => ({ 
  cookies: jest.fn().mockResolvedValue({
    get: jest.fn().mockReturnValue({ value: "phony_token" })
  })
}));

describe("Modul 3: Manajemen Daftar Tontonan (CRUD Watchlist)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Skenario 1: Create (Happy Path)", () => {
    it("should save movie data successfully when valid input is given", async () => {
      // ARRANGE
      const userId = "user_123";
      const movieData = {
        title: "Interstellar",
        external_api_id: "tt0816692",
        year: "2014",
        poster_url: "https://poster.com/img.jpg",
      };

      const mockCreated = {
        id: "watch_123",
        userId,
        ...movieData,
        genre: "Sci-Fi",
        status: "PLAN_TO_WATCH",
        rating: null,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prismaMock.watchlist.findUnique.mockResolvedValue(null);
      prismaMock.watchlist.create.mockResolvedValue(mockCreated as unknown as Movie);

      // ACT
      const result = await addToWatchlist(userId, movieData);

      // ASSERT
      expect(prismaMock.watchlist.findUnique).toHaveBeenCalledWith({
        where: { userId_external_api_id: { userId, external_api_id: "tt0816692" } }
      });
      expect(prismaMock.watchlist.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId,
          title: "Interstellar",
          status: "PLAN_TO_WATCH"
        })
      });
      expect(result).toMatchObject({ title: "Interstellar" });
    });
    
    it("should prevent duplication of the exact same movie", async () => {
      // ARRANGE
      const movieData = { title: "Dupe", external_api_id: "tt001" };
      prismaMock.watchlist.findUnique.mockResolvedValue({ id: "watch_999", userId: "user_123", title: "Dupe" } as unknown as Movie);
      
      // ACT & ASSERT
      await expect(addToWatchlist("user_123", movieData)).rejects.toThrow("Film sudah ada di dalam Watchlist Anda.");
    });
  });

  describe("Skenario 2: Read (Filtering by User ID)", () => {
    it("should retrieve movies properly filtered by userId", async () => {
      // ARRANGE
      const userId = "user_abc";
      const mockList: Movie[] = [
        { id: "1", userId, title: "A", status: "WATCHING", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), external_api_id: null, year: null, poster_url: null, genre: null, rating: null, notes: null } as unknown as Movie,
        { id: "2", userId, title: "B", status: "FINISHED", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), external_api_id: null, year: null, poster_url: null, genre: null, rating: null, notes: null } as unknown as Movie
      ];

      prismaMock.watchlist.findMany.mockResolvedValue(mockList as unknown as Movie[]);

      // ACT
      const result = await getUserWatchlist(userId);

      // ASSERT
      expect(prismaMock.watchlist.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { createdAt: "desc" }
      });
      expect(result).toHaveLength(2);
      expect((result[0] as Movie).userId).toBe(userId);
    });
  });

  describe("Skenario 3: Update (Status Change)", () => {
    it("should process valid status updates ensuring userId matches (Row Isolation)", async () => {
      // ARRANGE
      const userId = "user_xyz";
      const watchlistId = "watch_777";
      const existingData = { id: watchlistId, userId, title: "Batman", status: "PLAN_TO_WATCH" };

      prismaMock.watchlist.findFirst.mockResolvedValue(existingData as unknown as Movie);
      prismaMock.watchlist.update.mockResolvedValue({ ...existingData, status: "FINISHED" } as unknown as Movie);

      // ACT
      const result = await updateWatchlistStatus(userId, watchlistId, "FINISHED") as unknown as Movie;

      // ASSERT
      expect(prismaMock.watchlist.findFirst).toHaveBeenCalledWith({ where: { id: watchlistId, userId } });
      expect(prismaMock.watchlist.update).toHaveBeenCalledWith({
        where: { id: watchlistId },
        data: { status: "FINISHED", rating: undefined }
      });
      expect(result.status).toBe("FINISHED");
    });
  });

  describe("Skenario 4: PENTING Delete (Unauthorized Attempt FR-006)", () => {
    it("should prevent User A from deleting User B's watchlist data", async () => {
      // ARRANGE
      const hackerUserId = "user_BAD_ACTOR";
      const targetWatchlistId = "watch_victim";
      
      // Record di DB sebenarnya milik orang lain
      const existingRecordOfUserB = {
        id: targetWatchlistId,
        userId: "user_INNOCENT", // User owner is different!
        title: "Secret Movie"
      };

      prismaMock.watchlist.findFirst.mockResolvedValue(null);

      // ACT & ASSERT
      await expect(removeFromWatchlist(hackerUserId, targetWatchlistId))
        .rejects.toThrow("Akses penghapusan ditolak atau data tak eksis.");
      
      // Menguji secara ekstrem prisma.delete TIDAK BOLEH terbaca sekalipun
      expect(prismaMock.watchlist.delete).not.toHaveBeenCalled();
    });

    it("should securely delete the record if User is authenticated and is the rightful owner", async () => {
      // ARRANGE
      const ownerId = "user_OWNER";
      const watchlistId = "watch_mine";
      
      prismaMock.watchlist.findFirst.mockResolvedValue({ id: watchlistId, userId: ownerId, title: "" } as unknown as Movie);
      prismaMock.watchlist.delete.mockResolvedValue({} as unknown as Movie);

      // ACT
      await removeFromWatchlist(ownerId, watchlistId);

      // ASSERT
      expect(prismaMock.watchlist.delete).toHaveBeenCalledWith({ where: { id: watchlistId } });
    });
  });

  describe("Skenario 5: Error (DB Down)", () => {
    it("should crash gracefully and throw Database Failure when server is down", async () => {
      // ARRANGE
      prismaMock.watchlist.create.mockRejectedValue(new Error("Connection Timeout"));

      // ACT & ASSERT
      await expect(addToWatchlist("user_x", { title: "Panic" } as unknown as WatchlistPayload))
        .rejects.toThrow("Connection Timeout");
    });
  });

  describe("Skenario 6: Integrasi Route Handler (JSON Response)", () => {
    it("should handle DB failure and return formatted JSON error response in Route", async () => {
      // ARRANGE
      (cookies as jest.Mock).mockResolvedValue({ 
        get: jest.fn().mockReturnValue({ value: "phony_token" }) 
      });
      (verifyToken as jest.Mock).mockResolvedValue({ id: "user_123" });
      
      // Force DB down for actual get request
      prismaMock.watchlist.findMany.mockRejectedValue(new Error("Database disconnected"));

      // ACT
      const mockRequest = { url: "http://localhost/api/v1/watchlist?sort=title-asc" };
      const response = await GET(mockRequest as Request);
      const json = await response.json();

      // ASSERT
      expect(response.status).toBe(401);
      expect(json).toMatchObject({ message: "Database disconnected" });
    });
  });
});
