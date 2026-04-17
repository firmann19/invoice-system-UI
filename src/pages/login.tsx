import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { login } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await login(username, password);

      // ✅ simpan token ke cookie
      Cookies.set("token", data.token, {
        expires: 1, // 1 hari
      });

      // redirect ke wizard
      router.push("/invoice/step-1");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[300px] space-y-4 border p-6 rounded">
        <h1 className="text-xl font-bold">Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}
