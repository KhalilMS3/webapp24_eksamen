import { EventType } from "@/types/types";
import { useRouter } from "next/navigation";
type AdminEventCardProps = {
  event: EventType;
  onEdit: (event: EventType) => void;
  onDelete: (eventId: string) => void;
}

export default function AdminEventCard({
  event,
  onEdit,
  onDelete,
}: AdminEventCardProps) {
  const router = useRouter()

  const handleInspect = () => {
    router.push(`/admin/arrangementer/${event.slug}`)
  }
  return (
    <div className="admin-event-card bg-white p-4 rounded-md shadow-md relative">
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-700 mb-1">
        Dato: {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-1">Sted: {event.location}</p>
      <p className="text-gray-700 mb-3">Type: {event.type}</p>
      <section className="flex justify-between mt-4">
        <button
          onClick={handleInspect}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-700 transition"
        >
          Inspiser
        </button>
        <button
          onClick={() => onEdit(event)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
        >
          Rediger
        </button>
        <button
          onClick={() => onDelete(event.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
        >
          Slett
        </button>
      </section>
    </div>
  );
}
