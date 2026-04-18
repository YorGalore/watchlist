/**
 * @module Integrasi API Eksternal
 * @desc API wrapper untuk komunikasi komponen mencari film di Frontend menuju Backend Proxy.
 * @author Freta Yordinia Laura
 * @date 2026-04-01
 * @version 1.0.0
 */

export const searchMoviesApi = async (query: string) => {
  const res = await fetch(`/api/v1/search?q=${encodeURIComponent(query)}`);
  return res.json();
};
