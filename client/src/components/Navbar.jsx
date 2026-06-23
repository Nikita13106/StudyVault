import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-gradient-to-br from-white via-gray-50 to-teal-50 border-b border-gray-200 shadow-sm font-body">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={() => {
            navigate("/resources");
            setMenuOpen(false);
          }}
          className="text-xl sm:text-2xl font-heading text-gray-800 cursor-pointer hover:text-teal-600 transition"
        >
          StudyVault
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link
            to="/resources"
            className="text-gray-700 hover:text-teal-600 font-medium"
          >
            Resources
          </Link>

          <Link
            to="/upload"
            className="text-gray-700 hover:text-teal-600 font-medium"
          >
            Upload
          </Link>

          {!isLoggedIn ? (
            <>
              {isLoginPage ? (
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-md"
                >
                  Register
                </Link>
              ) : (
                <Link
                  to="/"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-md"
                >
                  Login
                </Link>
              )}
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* HAMBURGER BUTTON (MOBILE) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="w-6 h-0.5 bg-gray-700"></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          <Link
            to="/resources"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-teal-600"
          >
            Resources
          </Link>

          <Link
            to="/upload"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-teal-600"
          >
            Upload
          </Link>

          {!isLoggedIn ? (
            <>
              {isLoginPage ? (
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-center"
                >
                  Register
                </Link>
              ) : (
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-center"
                >
                  Login
                </Link>
              )}
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
