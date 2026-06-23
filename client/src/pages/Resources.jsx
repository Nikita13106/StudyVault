import { useEffect, useState } from "react";
import { fetchResources } from "../api.js";
import ResourceCard from "../components/ResourceCard.jsx";

export default function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchResources();
      setResources(data);
    })();
  }, []);
  const handleDelete = (id) => {
    setResources((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid gap-4">
      {resources.map((r) => (
        <ResourceCard key={r._id} resource={r} onDelete={handleDelete} />
      ))}
    </div>
  );
}
