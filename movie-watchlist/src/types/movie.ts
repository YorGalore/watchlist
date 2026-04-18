/**
 * @module Types
 * @desc Definisi tipe data global untuk entitas Film/Movie
 */

export interface Movie {
  id: string;
  userId: string;
  title: string;
  external_api_id: string | null;
  year: string | null;
  poster_url: string | null;
  genre: string | null;
  status: string;
  rating: number | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OMDbSearchResult {
  external_api_id: string;
  title: string;
  year: string;
  poster_url: string | null;
}
