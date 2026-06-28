import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { fetchResources } from "./api.js";

import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Resources from "./pages/Resources.jsx";
import Upload from "./pages/Upload.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch resources
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

  // After upload
  const handleNewResource = (resource) => {
    setResources((prev) => [resource, ...prev]);
  };

  // After delete
  const handleDelete = (id) => {
    setResources((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="app">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Pages */}
          <Route
            path="/resources"
            element={
              <Resources
                resources={resources}
                loading={loading}
                error={error}
                onDelete={handleDelete}
              />
            }
          />

          <Route
            path="/upload"
            element={<Upload onUpload={handleNewResource} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
