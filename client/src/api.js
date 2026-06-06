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
  const formData = new FormData();
  formData.append("file", file); // must match upload.single("file") on the server
  formData.append("description", description);

  const res = await fetch(`${BASE}/api/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed.");
  return data;
};
