import { useState, useEffect } from "react";
import { EventType } from "@/types/types";
import { API_BASE } from "@/config/urls";
import { slugify } from "@/lib/services/eventService";

interface EditEventModalProps {
  events: EventType[]
  event: EventType | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedEvent: EventType) => void;
}

export default function EditEventModal(props: EditEventModalProps) {
  const { events, event, isOpen, onClose, onUpdate } = props
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [waitlistAvailable, setWaitlistAvailable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [template, setTemplate] = useState<any | null>(null);

  const fetchTemplateUsed = async (templateId: string) => {
    try {
      const response = await fetch(`${API_BASE}/templates/${templateId}`)
      const templateData = await response.json()
      
      if (!response.ok && !templateData.success) {
        console.error("Faild to fetched used template")
      } 
      setTemplate(templateData.data);
      console.log(template);
      
    } catch (error) {
      console.error("Error fetching used template: ", error)
    }

  }
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || "");
      setDate(new Date(event.date).toISOString().split("T")[0]);
      setLocation(event.location);
      setEventType(event.type);
      setCapacity(event.capacity || "");
      setPrice(event.price || "");
      setIsPrivate(event.is_private);
      setWaitlistAvailable(event.waitlist_available);

      if (event.template_id) {
        fetchTemplateUsed(event.template_id)
      }
    }
  }, [event]);
  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setError(null);
    setSuccess(null);

    try {
      const eventDate = new Date(selectedDate);
      if (isNaN(eventDate.getTime())) {
        setError("Ugyldig datoformat, Vennligst velg en gyldig dato");
        return;
      }
      // Rule nr 1
      if (template.no_overlapping_events) {
        const existingEvents: EventType[] = events;
        const hasOverlappingEvents = existingEvents.some(
          (exisitngEvent) =>
            exisitngEvent.id !== event?.id && // Exlude current event to be checked
            new Date(exisitngEvent.date).toDateString() ===
              new Date(date).toDateString()
        );

        if (hasOverlappingEvents) {
          setError(
            "Et arrangement eksisterer allere på denne datoen, prøv en annen dato!"
          );
          return;
        }
      }

      // Rule nr 2: allowness on specific days
      if (template.date_locked && template.date_locked.length > 0) {
        const eventAllowedDays = template.date_locked.map((day: string) =>
        day.toLowerCase()
        )
        const eventDay = eventDate.toLocaleString("no-NO", {
          weekday: "long",
        });
        console.log(eventDay)
        if (!eventAllowedDays.includes(eventDay)) {
          setError(
            `Arrangementet er opprettet via en mal som tillatter opprettelse på følgende dater: ${eventAllowedDays.join(
              ", "
            )}`
          );
          return;
        }
      }
    } catch (error) {
      console.error("En feil oppstod ved parsing av dato: ", error)
      setError("En feil oppstod ved parsing av dato, vennligst velg en gyldig dato.")
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null)
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

    if (template) {
      // Rule nr 1:  No overlapping events if template has it as a rule
      if (template.no_overlapping_events) {
        const existingEvents: EventType[] = events
        const hasOverlappingEvents = existingEvents.some(
          (exisitngEvent) =>
            exisitngEvent.id !== event?.id && // Exlude current event to be checked
            new Date(exisitngEvent.date).toDateString() === new Date(date).toDateString()
        )

        if (hasOverlappingEvents) {
          setError("Et arrangement eksisterer allere på denne datoen, prøv en annen dato!")
          return
        }
      }
      // Rule nr 2: allowness on specific days
      if (template.date_locked && template.date_locked.length > 0) {
        const eventAllowedDays = template.date_locked.map((day: string) =>
          day.toLowerCase()
        );
        const eventDay = new Date(date).toLocaleString("no-NO", { weekday: "long" })
        if (!eventAllowedDays.includes(eventDay)) {
          setError(`Arrangementet kan kun opprettes på følgende dater: ${eventAllowedDays.join(", ")}`)
          return
        }
      }

      // Rule nr 3: event must remain private if specified in template
      if (template.is_private) {
        setIsPrivate(true)
      }
    }

    
    const updatedEvent = {
      id: event?.id as string,
      title,
      slug: slugify(title),
      description,
      date,
      location,
      type: eventType,
      capacity: capacity ? Number(capacity) : 0,
      price: price ? Number(price) : 0,
      is_private: isPrivate,
      waitlist_available: waitlistAvailable,
      available_spots: capacity ? Number(capacity) : Number(event?.available_spots),
      status: event?.status || "Ledig",
      created_at: event?.created_at || new Date().toISOString(),
      updated_at: event?.updated_at || new Date().toISOString(),
      template_id: event?.template_id
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/events/${event?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        let errorMessage = "Feil ved oppdatering av arrangement";

        responseData.error?.message
          ? (errorMessage = responseData.error.message)
          : (errorMessage = responseData.error);

        setError(errorMessage);
        return;
      }

      onUpdate(updatedEvent);
      setSuccess("Arrangement er oppdater 🎉")
      setError(null)
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
        <h2 className="text-2xl font-bold mb-4">Rediger arrangement</h2>
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

            <section>
              <label htmlFor="date" className="block font-semibold mb-2">
                Dato
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={handleDateChange}
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

            <section className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                disabled={template?.is_private}
              />
              <label className="block font-semibold">Privat arrangement</label>
              <input
                type="checkbox"
                checked={waitlistAvailable}
                onChange={(e) => setWaitlistAvailable(e.target.checked)}
              />
              <label className="block font-semibold">
                Venteliste tilgjengelig
              </label>
            </section>
          </section>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}

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
