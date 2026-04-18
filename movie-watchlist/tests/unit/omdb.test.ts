import { searchMoviesFromOMDb, getMovieDetails } from "@/lib/services/omdb.service";
import { GET } from "@/app/api/v1/search/route";
import { NextRequest } from "next/server";

// Mock global fetch
global.fetch = jest.fn();

describe("Integrasi API Eksternal & Search Proxy (OMDb)", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, OMDB_API_KEY: "dummy_key", OMDB_BASE_URL: "http://dummy.omdbapi.com" };
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore environment
  });

  describe("Skenario 1: Search Movies (Happy Path)", () => {
    it("should return mapped movie array and handle N/A posters correctly", async () => {
      // ARRANGE
      const mockResponse = {
        Response: "True",
        Search: [
          { imdbID: "tt123", Title: "Inception", Year: "2010", Poster: "http://poster.jpg", Type: "movie" },
          { imdbID: "tt456", Title: "Fake Movie", Year: "2020", Poster: "N/A", Type: "movie" }
        ]
      };
      
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      });

      // ACT
      const result = await searchMoviesFromOMDb("Inception");

      // ASSERT
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        external_api_id: "tt123",
        title: "Inception",
        year: "2010",
        poster_url: "http://poster.jpg"
      });
      // Verifikasi penanganan poster N/A
      expect(result[1].poster_url).toBe("/placeholder-poster.png");
    });
  });

  describe("Skenario 2: Search Movies (Empty/Not Found)", () => {
    it("should return empty array when OMDb returns False Response", async () => {
      // ARRANGE
      const mockResponse = {
        Response: "False",
        Error: "Movie not found!"
      };
      
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      });

      // ACT
      const result = await searchMoviesFromOMDb("UnknownMovie123");

      // ASSERT
      expect(result).toEqual([]);
    });
  });

  describe("Skenario 3: Get Movie Details (Happy Path)", () => {
    it("should return complete movie details", async () => {
      // ARRANGE
      const mockResponse = {
        Response: "True",
        imdbID: "tt123",
        Title: "Inception",
        Year: "2010",
        Type: "movie",
        Genre: "Action, Sci-Fi",
        imdbRating: "8.8",
        Poster: "http://poster.jpg",
        Plot: "A thief who steals corporate secrets..."
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      });

      // ACT
      const result = await getMovieDetails("tt123");

      // ASSERT
      expect(result).toMatchObject({
        external_api_id: "tt123",
        title: "Inception",
        genre: "Action, Sci-Fi",
        rating: "8.8",
        plot: "A thief who steals corporate secrets..."
      });
    });
  });

  describe("Skenario 4: API Proxy Route (Integration Lite)", () => {
    it("should return 400 if query is less than 3 characters", async () => {
      // ARRANGE
      const req = new NextRequest("http://localhost:3000/api/v1/search?q=ab");

      // ACT
      const response = await GET(req);
      const json = await response.json();

      // ASSERT
      expect(response.status).toBe(400);
      expect(json.message).toBe("Kueri pencarian minimal 3 karakter");
    });

    it("should return 200 and search results if query is valid", async () => {
      // ARRANGE
      const req = new NextRequest("http://localhost:3000/api/v1/search?q=batman");
      
      const mockResponse = {
        Response: "True",
        Search: [{ imdbID: "tt0372784", Title: "Batman Begins", Year: "2005", Poster: "N/A", Type: "movie" }]
      };
      
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      });

      // ACT
      const response = await GET(req);
      const json = await response.json();

      // ASSERT
      expect(response.status).toBe(200);
      expect(json.status).toBe("success");
      expect(json.data).toHaveLength(1);
    });
  });

  describe("Skenario 5: Error Handling (Network/Server Fail)", () => {
    it("should catch fetch rejection and return 500 in Route Handler", async () => {
      // ARRANGE
      const req = new NextRequest("http://localhost:3000/api/v1/search?q=inception");
      
      // Simulasi kegagalan jaringan (fetch rejected)
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network connection lost"));

      // ACT
      const response = await GET(req);
      const json = await response.json();

      // ASSERT
      expect(response.status).toBe(500);
      expect(json.message).toBe("Gagal memanggil OMDb: Network connection lost");
    });
  });
});
