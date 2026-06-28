import { useState } from "react";
import { registerUser } from "../api.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to resources page
      navigate("/resources");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center font-body px-4 py-10">
      <div className="w-full max-w-[92%] sm:max-w-md md:max-w-lg bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl sm:text-3xl font-heading text-gray-800 text-center mb-2">
          Create account
        </h2>

        <p className="text-xs sm:text-sm text-gray-500 text-center mb-6">
          Join StudyVault and start sharing resources
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full text-sm sm:text-base border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-sm sm:text-base border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-sm sm:text-base border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-xs sm:text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-[1.01] transition disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-xs sm:text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-teal-600 font-medium cursor-pointer hover:text-teal-700"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}