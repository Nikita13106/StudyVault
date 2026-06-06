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

export default function ResourceCard({ resource }) {
  const { description, fileName, fileSize, fileUrl, createdAt } = resource;

  return (
    <li className="resource-card">
      <div className="resource-info">
        <p className="resource-desc">{description}</p>
        <p className="resource-meta">
          {fileName}
          {fileSize ? ` · ${formatSize(fileSize)}` : ""} ·{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      <a
        className="download-btn"
        href={toDownloadUrl(fileUrl)}
        // target="_blank"  --- not needed since we're forcing a download so we don,t need to open a new tab 
        // rel="noopener noreferrer"  ... also not needed without target="_blank"
      >
        Download
      </a>
    </li>
  );
}
