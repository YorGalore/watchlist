/**
 * @module AuthAPIWrapper
 * @desc API wrapper untuk komunikasi frontend ke backend
 * @author Antigravity
 * @date 2026-03-31
 * @version 1.0.0
 */

export const postRegister = async (data: Record<string, string>) => {
  const res = await fetch("/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const postLogin = async (data: Record<string, string>) => {
  const res = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const postLogout = async () => {
  const res = await fetch("/api/v1/auth/logout", {
    method: "POST",
  });
  return res.json();
};
