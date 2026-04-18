import { getUserWatchlist } from "@/lib/services/watchlist.service";
import { prismaMock } from "./singleton";

describe("Modul 4: Dashboard & Fitur Pemilahan (Filtering)", () => {
  const userId = "user_filtering";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Skenario 1: Sorting by Alphabet (A-Z)", () => {
    it("harus mendelegasikan kueri pengurutan Abjad ke Prisma secara efisien", async () => {
      // ARRANGE
      const mockMovies = [
        { id: "1", userId, title: "Apple", status: "WATCHING", createdAt: new Date() },
        { id: "2", userId, title: "Banana", status: "WATCHING", createdAt: new Date() },
        { id: "3", userId, title: "Zebra", status: "FINISHED", createdAt: new Date() }
      ];
      prismaMock.watchlist.findMany.mockResolvedValue(mockMovies as unknown as Movie[]);

      // ACT
      const result = await getUserWatchlist(userId, { sort: "title-asc" });

      // ASSERT
      expect(prismaMock.watchlist.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { title: "asc" }
      });
      expect(result).toHaveLength(3);
    });
  });

  describe("Skenario 2: Sorting by Rating (High to Low)", () => {
    it("harus menyortir koleksi berdasarkan rating pengguna paling tinggi", async () => {
      // ARRANGE
      prismaMock.watchlist.findMany.mockResolvedValue([
        { title: "Keren", rating: 9.0 },
        { title: "Bagus", rating: 7.5 },
        { title: "Biasa", rating: 5.0 }
      ] as unknown as Movie[]);

      // ACT
      await getUserWatchlist(userId, { sort: "rating-desc" });

      // ASSERT
      expect(prismaMock.watchlist.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { rating: "desc" }
      });
    });
  });

  describe("Skenario 3: Filtering by Genre", () => {
    it("harus mengintegrasikan filter berjenis string pada pangkalan data", async () => {
      // ARRANGE
      prismaMock.watchlist.findMany.mockResolvedValue([
        { id: "action_1", title: "Die Hard", genre: "Action, Thriller" }
      ] as unknown as Movie[]);

      // ACT
      const result = await getUserWatchlist(userId, { genre: "Action" });

      // ASSERT
      expect(prismaMock.watchlist.findMany).toHaveBeenCalledWith({
        where: { 
          userId, 
          genre: { contains: "Action", mode: "insensitive" } 
        },
        orderBy: expect.any(Object)
      });
      expect(result[0].genre).toContain("Action");
    });
  });

  describe("Skenario 4: Combined Filter & Sort", () => {
    it("harus sanggup menggabungkan kueri Abjad dan Filter Genre sekaligus (Complex Query)", async () => {
      // ARRANGE
      prismaMock.watchlist.findMany.mockResolvedValue([] as unknown as Movie[]);

      // ACT
      await getUserWatchlist(userId, { sort: "title-asc", genre: "Sci-Fi", status: "PLAN_TO_WATCH" });

      // ASSERT
      expect(prismaMock.watchlist.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          genre: { contains: "Sci-Fi", mode: "insensitive" },
          status: "PLAN_TO_WATCH" // Juga mengetes limitasi enum status
        },
        orderBy: { title: "asc" }
      });
    });
  });

  describe("Skenario 5: Empty Filter Result", () => {
    it("harus mengamankan kegagalan data dengan meretur list kosong tanpa melempar fatal exception", async () => {
      // ARRANGE (Database tidak memiliki hasil untuk Genre 'Romance')
      prismaMock.watchlist.findMany.mockResolvedValue([]);

      // ACT
      const result = await getUserWatchlist(userId, { genre: "Romance" });

      // ASSERT
      expect(prismaMock.watchlist.findMany).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
      expect(result).toEqual([]); // Aman bagi penampil antarmuka (UI map takkan hancur)
    });
  });
});
