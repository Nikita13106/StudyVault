// Centralised API helpers so components never hardcode URLs.
// Uses VITE_API_URL in production, or the Vite dev proxy (empty base) locally.
const BASE = import.meta.env.VITE_API_URL || "";

/**
 * Fetch all resources (newest first).
 */
export const fetchResources = async () => {
  const res = await fetch(`${BASE}/api/resources`);
  if (!res.ok) throw new Error("Failed to load resources.");
  return res.json();
};

/**
 * Upload a file + description. Resolves to the saved resource object.
 */
export const uploadResource = async (file, description) => {
  const token = localStorage.getItem("token"); // 👈 get token

  const formData = new FormData();
  formData.append("file", file);
  formData.append("description", description);

  const res = await fetch(`/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // 👈 SEND TOKEN
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed.");
  return data;
};

// REGISTER
export const registerUser = async (data) => {
  const res = await fetch(`${BASE}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result;
};

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  // store token
  localStorage.setItem("token", result.token);
  localStorage.setItem("userId", result.user._id);

  return result;
};
