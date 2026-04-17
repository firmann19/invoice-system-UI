import { jwtDecode } from "jwt-decode";

export type TokenPayload = {
  user_id: number;
  role: "admin" | "kerani";
};

export function getUserFromToken(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}
