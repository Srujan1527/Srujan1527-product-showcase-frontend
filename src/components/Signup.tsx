import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const BASEURL = import.meta.env.VITE_BACKEND_URL;

  const handleSignup = async () => {
    setError("");
    setSuccess("");
    if (!name || !email || !phoneNumber || !password || !confirm) {
      setError("All fields are required");
    }

    if (password !== confirm) {
      setError("Passwords do not match");
    }

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phoneNumber, password }),
      };
      const res = await fetch(`${BASEURL}/auth/signup`, options);

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "signup failed");
        return;
      }

      setSuccess("Account created! Redirecting to login ...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-left">
        <h1 className="text-xl font-semibold text-slate-800 mb-4 text-center">
          Create an Account
        </h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-left text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-left text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <label className="block text-left text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                type="text"
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Enter your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-left text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-left text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Re-enter password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-slate-900 text-white py-2 rounded-md text-sm mt-2"
            onClick={handleSignup}
          >
            Sign Up
          </button>

          <p className="text-xs text-center text-slate-600 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-900 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
