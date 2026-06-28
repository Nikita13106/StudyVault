import { useEffect, useState } from "react";
import ResourceCard from "../components/ResourceCard";

export default function MyUploads() {
  const [uploads, setUploads] = useState([]);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  useEffect(() => {
    // fetch user's uploads here
    async function fetchUploads() {
      try {
        const res = await fetch("/api/resources/my");
        const data = await res.json();
        setUploads(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUploads();
  }, []);

  // 🔎 FILTER LOGIC
  const filteredUploads = uploads.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase());

    const matchesSubject =
      subjectFilter === "All" || item.subject === subjectFilter;

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      
      <h1 className="text-3xl font-bold mb-6">My Uploads</h1>

      {/* 🔎 SEARCH + FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search uploads..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter */}
        <select
          className="border p-2 rounded"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="All">All Subjects</option>
          <option value="DBMS">DBMS</option>
          <option value="CN">CN</option>
          <option value="BAI">BAI</option>
          <option value="Maths">MATHS</option>
        </select>

      </div>

      {/* 📄 RESULTS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUploads.length > 0 ? (
          filteredUploads.map((item) => (
            <ResourceCard key={item._id} resource={item} />
          ))
        ) : (
          <p>No uploads found.</p>
        )}
      </div>

    </div>
  );
}