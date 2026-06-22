import ResourceCard from "./ResourceCard.jsx";

/**
 * Renders the global feed of resources.
 */
export default function ResourceList({ resources, onDelete }) {
  if (resources.length === 0) {
    return <p className="muted">No resources yet. Be the first to upload!</p>;
  }

  return (
    <ul className="resource-list">
      {resources.map((r) => (
        <ResourceCard key={r._id} resource={r} onDelete={onDelete} />
      ))}
    </ul>
  );
}
