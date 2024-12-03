import React, { useState, useEffect } from "react";
import { Template } from "@/types/types";
import { API_BASE } from "@/config/urls";

interface EditTemplateModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedTemplate: Template) => void;
}

export default function EditTemplateModal({
  template,
  isOpen,
  onClose,
  onUpdate,
}: EditTemplateModalProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [noOverlappingEvents, setNoOverlappingEvents] =
    useState<boolean>(false);
  const [hasWaitlist, setHasWaitlist] = useState<boolean>(false);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [dateLocked, setDateLocked] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (template) {
      setTitle(template.title);
      setDescription(template.description || "");
      setCapacity(template.capacity || "");
      setPrice(template.price || "");
      setIsPrivate(template.is_private);
      setNoOverlappingEvents(template.no_overlapping_events);
      setDateLocked(template.date_locked || []);
      setHasWaitlist(template.has_waitlist || false);
      setCreatedAt(template.created_at);
    }
  }, [template]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title) {
      setError("Tittel er påkrevd!");
      return;
    }
    if (capacity !== "" && capacity <= 0) {
      setError("Kapasitet må være et positivt tall!");
      return;
    }
    if (price !== "" && price < 0) {
      setError("Pris må være 0 eller et positivt tall!");
      return;
    }

    const updatedTemplate: Template = {
      id: template?.id as string,
      title,
      description,
      capacity: capacity ? Number(capacity) : 0,
      price: price ? Number(price) : 0,
      is_private: isPrivate,
      no_overlapping_events: noOverlappingEvents,
      date_locked: dateLocked,
      has_waitlist: hasWaitlist,
      created_at: createdAt,
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/templates/${template?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTemplate),
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        let errorMessage = "Feil ved oppdatering av mal";

        responseData.error?.message
          ? (errorMessage = responseData.error.message)
          : (errorMessage = responseData.error);

        setError(errorMessage);
        return;
      }

      onUpdate(updatedTemplate);
      setSuccess("Mal oppdatert 🎉");
      onClose();
    } catch (error: any) {
      setError(`En feil oppstod: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <section className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Rediger mal</h2>
        <form onSubmit={handleSubmit}>
          <section className="grid grid-cols-1 gap-6 mb-4">
            <section>
              <label htmlFor="title" className="block font-semibold mb-2">
                Tittel
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </section>

            <section>
              <label htmlFor="capacity" className="block font-semibold mb-2">
                Kapasitet
              </label>
              <input
                id="capacity"
                type="number"
                value={capacity}
                onChange={(e) =>
                  setCapacity(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full p-2 border rounded"
              />
            </section>

            <section>
              <label htmlFor="price" className="block font-semibold mb-2">
                Pris
              </label>
              <input
                id="price"
                type="number"
                value={price || 0}
                onChange={(e) =>
                  setPrice(e.target.value ? Number(e.target.value) : 0)
                }
                className="w-full p-2 border rounded"
              />
            </section>

            <section className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <label className="block font-semibold">Privat mal</label>
              <input
                type="checkbox"
                checked={noOverlappingEvents}
                onChange={(e) => setNoOverlappingEvents(e.target.checked)}
              />
              <label className="block font-semibold">
                Ingen overlappende arrangementer
              </label>
              <input
                type="checkbox"
                checked={hasWaitlist}
                onChange={(e) => setHasWaitlist(e.target.checked)}
              />
              <label className="block font-semibold">
                Venteliste tilgjengelig
              </label>
            </section>

            <section>
              <label htmlFor="dateLocked" className="block font-semibold mb-2">
                Lås til spesifikke dager (f.eks., "Mandag", "Fredag")
              </label>
              <input
                id="dateLocked"
                type="text"
                value={dateLocked.join(", ")}
                onChange={(e) =>
                  setDateLocked(
                    e.target.value.split(",").map((day) => day.trim())
                  )
                }
                className="w-full p-2 border rounded"
              />
            </section>
          </section>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <section className="flex justify-end gap-4">
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
          </section>
        </form>
      </section>
    </section>
  );
}
