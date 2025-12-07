import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-left">
        <h1 className="text-xl font-semibold text-slate-800 mb-4 text-center">
          Login
        </h1>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-left text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-left text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Enter password"
            />
          </div>

          <button className="w-full bg-slate-900 text-white py-2 rounded-md text-sm mt-2">
            Login
          </button>

          <p className="text-xs text-center text-slate-600 mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-slate-900 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
