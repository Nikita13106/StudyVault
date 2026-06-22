/**
 * A single resource: description, metadata, and a download button.
 */

// Convert bytes to a human-readable size.
const formatSize = (bytes) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  return kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(1)} MB`;
};

/**
 * Insert Cloudinary's `fl_attachment` flag so the link forces a download
 * (with the original filename) instead of opening in the browser.
 * Falls back to the plain URL if the pattern isn't found.
 */
const toDownloadUrl = (url) =>
  url.includes("/upload/")
    ? url.replace("/upload/", "/upload/fl_attachment/")
    : url;

export default function ResourceCard({ resource, onDelete }) {
  const { _id, description, fileName, fileSize, fileUrl, createdAt, user } =
    resource;

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch(`/api/resource/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onDelete(_id); // 🔥 remove from UI
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <li className="resource-card">
      <div className="resource-info">
        <p className="resource-desc">{description}</p>
        <p className="resource-meta">
          {fileName}
          {fileSize ? ` · ${formatSize(fileSize)}` : ""}

          {" · "}
          {resource.user?.name || "Unknown"}
          {" · "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <a
          className="download-btn"
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>

        {/* 🔥 Delete only if owner */}
        {user?._id === localStorage.getItem("userId") && (
          <button
            onClick={handleDelete}
            style={{
              background: "#b3261e",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}
