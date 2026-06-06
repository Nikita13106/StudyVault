import { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm.jsx";
import ResourceList from "./components/ResourceList.jsx";
import { fetchResources } from "./api.js";

export default function App() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load resources once when the app mounts.
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchResources();
        setResources(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Called by UploadForm after a successful upload.
  // Prepends the new resource so it shows instantly without a re-fetch.
  const handleNewResource = (resource) => {
    setResources((prev) => [resource, ...prev]);
  };

  return (
    <div className="app">
      <header className="header">
        <p className="eyebrow">Student Resource Sharing Hub</p>
        <h1>StudyVault</h1>
        <p className="tagline">Share and discover academic resources — instantly.</p>
      </header>

      <main>
        <UploadForm onUpload={handleNewResource} />

        <section className="feed" aria-label="Uploaded resources">
          <div className="feed-head">
            <h2>Resources</h2>
            {!loading && !error && (
              <span className="count">{resources.length}</span>
            )}
          </div>

          {loading && <p className="muted">Loading resources…</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && <ResourceList resources={resources} />}
        </section>
      </main>

      <footer className="footer">
        <p>Built with React · Node · MongoDB · Cloudinary</p>
      </footer>
    </div>
  );
}
