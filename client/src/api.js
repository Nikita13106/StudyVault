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
export const uploadResource = async (data) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("file", data.file);
  formData.append("description", data.description || "");
  formData.append("year", data.year);
  formData.append("semester", data.semester);
  formData.append("branch", data.branch);
  formData.append("subject", data.subject);
  formData.append("category", data.category);
  formData.append("qbYear", data.qbYear || "");
  formData.append("otherCategory", data.otherCategory || "");

  data.module.forEach((m) => {
    formData.append("module", m);
  });

  const res = await fetch(`${BASE}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await res.json(); // ✅ renamed
  if (!res.ok) throw new Error(result.message || "Upload failed.");

  return result;
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
/**
 * Upvote / remove upvote for a resource
 */
export const upvoteResource = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/api/resources/${id}/upvote`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Upvote failed");

  return result;
};