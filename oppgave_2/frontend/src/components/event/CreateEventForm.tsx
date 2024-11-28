"use client";
import { useEffect, useState } from "react";
import { API_BASE } from "@/config/urls";

type CreateEventFormProps = {
  template?: {
    title: string;
    description?: string;
    capacity?: number;
    price: number;
    is_private: boolean;
    type: string;
    location: string;
  };
};

export default function CreateEventForm({ template }: CreateEventFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [waitlistAvailable, setWaitlistAvailable] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Ledig");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (template) {
      setTitle(template.title || "");
      setDescription(template.description || "");
      setLocation(template.location || "");
      setEventType(template.type || "");
      setCapacity(template.capacity || "");
      setPrice(template.price || "");
       setIsPrivate(template.is_private || false);
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
    if (!date) {
      setError("Dato er påkrevd!");
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

    const formData = {
      id: crypto.randomUUID(),
      title,
      description,
      date,
      location,
      type: eventType,
      capacity: capacity ? Number(capacity) : 0,
      price: price ? Number(price) : 0,
      is_private: isPrivate,
      waitlist_available: waitlistAvailable,
      available_spots: capacity ? Number(capacity) : 0,
      status,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError("Feil ved opprettelse av arrangement!");
        return;
      }

      setSuccess("Arrangement opprettet 🎉");

      // Resett feltene etter vellykket opprettelse
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setEventType("");
      setCapacity("");
      setPrice("");
      setIsPrivate(false);
      setWaitlistAvailable(false);
      setStatus("Ledig");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {template ? `Opprett arrangement fra mal: ${template.title}` : "Opprett nytt arrangement"}
      </h2>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
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
            value={price}
            onChange={(e) =>
              setPrice(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full p-2 border rounded"
          />
        </section>

        <section>
          <label htmlFor="date" className="block font-semibold mb-2">
            Dato
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </section>

        <section>
          <label htmlFor="location" className="block font-semibold mb-2">
            Sted
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </section>

        <section>
          <label htmlFor="type" className="block font-semibold mb-2">
            Type arrangement
          </label>
          <input
            id="type"
            type="text"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </section>
      </section>

      <section className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-2">
          Beskrivelse
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </section>

      <section className="flex items-center gap-10 mb-4">
        <label className="block font-semibold">Privat arrangement</label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        <label className="block font-semibold">Venteliste tilgjengelig</label>
        <input
          type="checkbox"
          checked={waitlistAvailable}
          onChange={(e) => setWaitlistAvailable(e.target.checked)}
        />
      </section>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white font-semibold rounded"
      >
        Opprett Arrangement
      </button>
    </form>
  );
}
