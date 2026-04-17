import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  user_id: number;
  role: string;
};

export function getUserFromToken(token: string): TokenPayload | null {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
