import Cookies from "js-cookie";
import { getUserFromToken } from "./auth";

export function getUserRole(): "admin" | "kerani" | null {
  const token = Cookies.get("token");
  if (!token) return null;

  const decoded = getUserFromToken(token);
  return decoded?.role || null;
}
