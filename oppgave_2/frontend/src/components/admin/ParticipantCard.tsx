import { Participant } from "@/types/types";

type ParticipantCardProps = {
  participant: Participant;
  onEdit: () => void;
  onSelect: (participantId: string, selected: boolean) => void;
};

export default function ParticipantCard({
  participant,
  onEdit,
  onSelect
}: ParticipantCardProps) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md relative">
      <input type="checkbox"
        className="rounded"
        onChange={(e) => onSelect(participant.id, e.target.checked)}
      />
      <h4 className="text-lg font-semibold mb-2">
        Deltaker: {participant.name}
      </h4>
      <p className="text-gray-700 mb-1">E-post: {participant.email}</p>
      <p className="text-gray-700 mb-3">Status: {participant.status}</p>
      <section className="flex justify-end mt-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Administrer påmelding
        </button>
      </section>
    </div>
  );
}
