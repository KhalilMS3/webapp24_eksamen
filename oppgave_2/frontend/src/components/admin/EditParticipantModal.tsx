import { useState } from "react";
import { Participant } from "@/types/types";
import { API_BASE } from "@/config/urls";

interface EditParticipantModalProps {
  participant: Participant;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedParticipant: Participant) => void;
}

export default function EditParticipantModal({
  participant,
  isOpen,
  onClose,
  onUpdate,
}: EditParticipantModalProps) {
  const [status, setStatus] = useState<string>(participant.status);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/participants/${participant.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Feil ved oppdatering av påmeldingsstatus!");
      }

      const updatedParticipant = { ...participant, status };
      onUpdate(updatedParticipant);
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
           <h2 className="text-2xl font-bold mb-4">Rediger påmelding</h2>
           <p><strong>Deltaker: </strong> {participant.name}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="status" className="block font-semibold mb-2">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Approved">Godkjent</option>
              <option value="Rejected">Avslått</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Avbryt
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Lagre endringer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
