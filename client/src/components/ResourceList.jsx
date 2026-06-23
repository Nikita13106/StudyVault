import ResourceCard from "./ResourceCard.jsx";

/**
 * Renders the global feed of resources.
 */
export default function ResourceList({ resources, onDelete }) {
  if (resources.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500 mt-10">
        No resources yet. Be the first to upload!
      </p>
    );
  }

  return (
    <ul className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 gap-4 sm:gap-5">
      {resources.map((r) => (
        <ResourceCard key={r._id} resource={r} onDelete={onDelete} />
      ))}
    </ul>
  );
}
