import { useState } from "react";
import { loginUser } from "../api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });
      navigate("/resources");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Log in to continue sharing resources</p>

        <form onSubmit={handleLogin}>
          <label className="field-label">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />

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

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
