import api from "@/lib/axios";

export const login = async (username: string, password: string) => {
  const res = await api.post("/login", {
    username,
    password,
  });

  return res.data;
};
