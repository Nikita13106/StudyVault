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
      await registerUser({ name, email, password });
      navigate("/"); // ✅ better than window.location
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">
          Join StudyVault and start sharing resources
        </p>

        <form onSubmit={handleRegister}>
          {/* Name */}
          <label className="field-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="auth-input"
          />

          {/* Email */}
          <label className="field-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />

          {/* Password */}
          <label className="field-label">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />

            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Error */}
          {error && <p className="error">{error}</p>}

          {/* Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}
