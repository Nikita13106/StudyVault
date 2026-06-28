import { formatModules } from "../utils/formatModule";
import { Eye, Download, Trash2, MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { upvoteResource } from "../api";

// Convert bytes to readable size
const formatSize = (bytes) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  return kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(1)} MB`;
};

// Cloudinary download helper
const toDownloadUrl = (url) =>
  url.includes("/upload/")
    ? url.replace("/upload/", "/upload/fl_attachment/")
    : url;

export default function ResourceCard({ resource, onDelete }) {
  const { _id, description, fileName, fileSize, fileUrl, createdAt, user } =
    resource;

  const [menuOpen, setMenuOpen] = useState(false);
  const [upvotes, setUpvotes] = useState(resource.upvotes?.length || 0);

  const menuRef = useRef(null);

  // UPVOTE HANDLER
  const handleUpvote = async () => {
    try {
      const updated = await upvoteResource(_id);
      setUpvotes(updated.upvotes.length);
    } catch (err) {
      alert(err.message);
    }
  };

  // DELETE
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) return alert("Please login first");

    try {
      const res = await fetch(`/api/resource/${_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onDelete(_id);
    } catch (err) {
      alert(err.message);
    }
  };

  // close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li className="group w-full bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-5 sm:p-6 flex flex-col gap-4">
      
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          {description && (
            <p className="text-base sm:text-lg font-medium text-gray-800 leading-snug">
              {description}
            </p>
          )}

          <p className="text-xs sm:text-sm text-gray-500">
            {fileName}
            {fileSize ? ` · ${formatSize(fileSize)}` : ""}
          </p>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
          <a
            href={fileUrl}
            target="_blank"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-white bg-emerald-500 hover:bg-emerald-600"
          >
            <Eye size={14} /> Open
          </a>

          <a
            href={toDownloadUrl(fileUrl)}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-white bg-blue-500 hover:bg-blue-600"
          >
            <Download size={14} /> Download
          </a>

          {user?._id === localStorage.getItem("userId") && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-white bg-red-500 hover:bg-red-600"
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>

        {/* MOBILE MENU */}
        <div className="sm:hidden relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
              >
                <Eye size={16} />
                Open
              </a>

              <a
                href={toDownloadUrl(fileUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
              >
                <Download size={16} />
                Download
              </a>

              {user?._id === localStorage.getItem("userId") && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2">
        {resource.year && (
          <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700">
            {resource.year}
          </span>
        )}

        {resource.semester && (
          <span className="px-2.5 py-1 text-xs rounded-full bg-teal-50 text-teal-700">
            Sem {resource.semester}
          </span>
        )}

        {resource.subject && (
          <span className="px-2.5 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
            {resource.subject}
          </span>
        )}

        {resource.module?.length > 0 && (
          <span className="px-2.5 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700">
            {formatModules(resource.module)}
          </span>
        )}
      </div>

      {/* FOOTER (UPVOTE ADDED HERE) */}
      <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-3">
        
        <span>Uploaded by : {user?.name || "Unknown"}</span>

        <div className="flex items-center gap-3">
          
          {/* UPVOTE BUTTON */}
          <button
            onClick={handleUpvote}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            👍 {upvotes}
          </button>

          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </li>
  );
}