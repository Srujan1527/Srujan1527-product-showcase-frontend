import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // Are we on login or signup page?
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-slate-900 text-white px-4 py-3 shadow flex items-center justify-between">
      {/* LEFT: BRAND */}
      <Link to="/" className="text-lg font-bold">
        GVCC Solutions
      </Link>

      {/* RIGHT: USER + BUTTONS */}
      <div className="flex items-center gap-3">
        {/* Show name if logged-in */}
        {user && (
          <span className="text-sm text-slate-200 hidden sm:inline">
            Hello, {user.name}
          </span>
        )}

        {/* Show Admin Dashboard link only for admin users */}
        {user && user.is_admin && (
          <Link
            to="/enquiries/admin"
            className="px-3 py-1 text-xs sm:text-sm border border-white/60 rounded-md hover:bg-white hover:text-slate-900 transition"
          >
            Admin Dashboard
          </Link>
        )}

        {/* Login button - hide on login/signup pages & when logged in */}
        {!user && !isAuthPage && (
          <Link
            to="/login"
            className="px-4 py-2 text-sm bg-white text-slate-900 rounded-md"
          >
            Login
          </Link>
        )}

        {/* Logout button - only when logged in */}
        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
