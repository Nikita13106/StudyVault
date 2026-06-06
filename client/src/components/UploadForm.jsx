import { useState } from "react";
import { uploadResource } from "../api.js";

/**
 * Upload section: file input + description + submit button.
 * Manages its own loading and error states.
 */
export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    // Basic client-side validation (server validates too).
    if (!file) return setError("Please choose a file.");
    if (!description.trim()) return setError("Please add a description.");

    setLoading(true);
    try {
      const saved = await uploadResource(file, description.trim());
      onUpload(saved); // push to the global feed in App

      // Reset the form
      setFile(null);
      setDescription("");
      const input = document.getElementById("file-input");
      if (input) input.value = "";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="upload-card" aria-label="Upload a resource">
      <h2>Upload a resource</h2>

      <label className="field-label" htmlFor="file-input">
        File
      </label>
      <input
        id="file-input"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={loading}
      />

      <label className="field-label" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        placeholder="e.g. DBMS Unit 3 notes — normalization &amp; functional dependencies"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        rows={3}
      />

      {error && <p className="error">{error}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Uploading…" : "Upload"}
      </button>
    </section>
  );
}
