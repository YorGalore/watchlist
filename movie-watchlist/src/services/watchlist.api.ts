/**
 * @module WatchlistAPIClient
 * @desc Wrapper call fetch API untuk berinteraksi dengan API Watchlist kita
 * @author Freta Yordinia Laura
 * @version 1.0.0
 */

export const getMyWatchlist = async (filters?: Record<string, string>) => {
  const params = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
  }

  const querySuffix = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`/api/v1/watchlist${querySuffix}`);
  return res.json();
};

export const addMovieToWatchlist = async (data: { external_api_id: string; title: string; year: string | null; poster_url: string | null }) => {
  const res = await fetch("/api/v1/watchlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const editWatchlistStatus = async (id: string, status: string, rating?: number) => {
  const res = await fetch(`/api/v1/watchlist/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, rating })
  });
  return res.json();
};

export const removeMovieFromWatchlist = async (id: string) => {
  const res = await fetch(`/api/v1/watchlist/${id}`, { 
    method: "DELETE" 
  });
  return res.json();
};
