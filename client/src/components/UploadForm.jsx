import { useState } from "react";
import { uploadResource } from "../api.js";

/**
 * Upload section: file input + description + submit button.
 * Manages its own loading and error states.
 */
export default function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [qbYear, setQbYear] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [branch, setBranch] = useState("");
  const [customBranch, setCustomBranch] = useState("");
  const [module, setModule] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const toggleModule = (num) => {
    setModule((prev) =>
      prev.includes(num) ? prev.filter((m) => m !== num) : [...prev, num],
    );
  };

  const handleSubmit = async () => {
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first");
      return;
    }

    // Basic client-side validation (server validates too).
    if (!file) return setError("Please choose a file.");
    if (!year || !semester || !branch || !subject || !category)
      return setError("Please fill all fields.");
    if (category === "qb" && !qbYear) return setError("Please enter QB year.");
    if (category === "other" && !otherCategory.trim())
      return setError("Please specify category.");

    setLoading(true);
    try {
      const saved = await uploadResource({
        file,
        description: description.trim(),
        year,
        semester,
        branch,
        subject,
        module,
        category,
        qbYear,
        otherCategory,
      });
      localStorage.setItem("hasUploads", "true");
      onUpload(saved); // push to the global feed in App

      // Reset the form
      setFile(null);
      setDescription("");
      setYear("");
      setSemester("");
      setBranch("");
      setSubject("");
      setModule([]);
      setCategory("");
      setQbYear("");
      setOtherCategory("");

      const input = document.getElementById("file-input");
      if (input) input.value = "";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="font-body max-w-4xl mx-auto bg-gradient-to-br from-white via-gray-50 to-teal-50 border border-gray-200 rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-3xl font-heading mb-6 text-gray-800">
        Upload a Resource
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Year
          </label>
          <select
            className="w-full border border-gray-300 font-body rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="FE">FE</option>
            <option value="SE">SE</option>
            <option value="TE">TE</option>
            <option value="BE">BE</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Semester
          </label>
          <select
            className="w-full border border-gray-300 font-body rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <option key={s} value={s}>
                Sem {s}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Branch
          </label>

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full border border-gray-300 font-body rounded-lg px-3 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Select Branch</option>
            <option value="AI & DS">AI & DS</option>
            <option value="AI & ML">AI & ML</option>
            <option value="Civil">Civil</option>
            <option value="Computer">Computer</option>
            <option value="CSE">CSE</option>
            <option value="E&CS">E&CS</option>
            <option value="E&TC">E&TC</option>
            <option value="IT">IT</option>
            <option value="IoT">IoT</option>
            <option value="Mechanical">Mechanical</option>
            <option value="M&ME">M&ME</option>
            <option value="others">Others</option>
          </select>

          {branch === "others" && (
            <input
              type="text"
              placeholder="Please specify"
              value={customBranch}
              onChange={(e) => setCustomBranch(e.target.value)}
              className="mt-3 w-full border border-gray-300 font-body rounded-lg px-3 py-2 bg-white text-gray-700 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Subject
          </label>
          <input
            type="text"
            placeholder="DBMS"
            className="w-full border border-gray-300 font-body rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Modules (Select 1–6)
          </label>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => toggleModule(num)}
                className={`px-3 py-2 rounded-lg border text-sm transition ${
                  module.includes(num)
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-teal-400"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Type
          </label>
          <select
            className="w-full border border-gray-300 font-body rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="notes">Notes</option>
            <option value="ppt">PPT</option>
            <option value="qb">Question Bank</option>
            <option value="other">Other</option>
          </select>
        </div>
        {category === "qb" && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              QB Year
            </label>
            <input
              type="text"
              placeholder="2023"
              className="w-full border border-gray-300 font-body rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
              value={qbYear}
              onChange={(e) => setQbYear(e.target.value)}
            />
          </div>
        )}
        {category === "other" && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Specify Type
            </label>
            <input
              type="text"
              placeholder="Lab Manual"
              className="w-full border border-gray-300 font-body rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
            />
          </div>
        )}
      </div>

      <div
        className={`mt-6 border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive
            ? "border-teal-500 bg-teal-100"
            : "border-gray-300 bg-white hover:bg-gray-50"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Please upload a file
        </p>

        {file ? (
          <p className="font-medium text-gray-700 text-lg">📄 {file.name}</p>
        ) : (
          <p className="hidden lg:block text-gray-500">
            Drag & drop your file here
          </p>
        )}

        <input
          type="file"
          hidden
          id="fileUpload"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label
          htmlFor="fileUpload"
          className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg text-sm font-medium cursor-pointer hover:opacity-90 transition"
        >
          Browse file
        </label>
      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Description (optional)
        </label>
        <textarea
          rows={3}
          className="w-full border border-gray-300 font-body rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description..."
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-3 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Resource"}
      </button>
    </section>
  );
}
