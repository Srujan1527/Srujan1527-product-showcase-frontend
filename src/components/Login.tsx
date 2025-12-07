import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveAuth } from "../utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      saveAuth(data.token, data.user);

      // Redirect based on role
      if (data.user.is_admin) navigate("/enquiries/admin");
      else navigate("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-left">
        <h1 className="text-xl font-semibold text-slate-800 mb-4 text-center">
          Login
        </h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-slate-900 text-white py-2 rounded-md text-sm mt-2"
          >
            Login
          </button>

          <p className="text-xs text-center text-slate-600 mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-slate-900">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
