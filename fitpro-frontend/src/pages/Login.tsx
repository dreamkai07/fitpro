import { useState } from "react";
import { Link } from "react-router-dom";
import { login as loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [role, setRole] = useState<"TRAINEE" | "TRAINER" | "ADMIN">("TRAINEE");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await loginApi({
        username,
        password,
        role,
      });

      // You can store the role in context or localStorage if needed
      localStorage.setItem("userRole", role);
      login(res.data.token, res.data.username, res.data.role);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-2xl w-[400px] shadow-xl"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          FitPro Login
        </h1>

        <div className="flex justify-center gap-2 mb-6">
          {(["TRAINEE", "TRAINER", "ADMIN"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                role === r
                  ? "bg-green-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {r.charAt(0) + r.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          className="w-full p-3 rounded-lg mb-4 bg-slate-700 text-white outline-none"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 rounded-lg mb-6 bg-slate-700 text-white outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 transition rounded-lg py-3 font-semibold text-white mb-4"
        >
          {loading ? "Logging in..." : `Login as ${role.charAt(0) + role.slice(1).toLowerCase()}`}
        </button>

        <p className="text-center text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}