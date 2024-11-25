import { API_BASE } from "@/config/urls";
import { ParticipantType } from "@/types/types";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import { useEventDetails } from "@/hooks/useEventDetails";

type BookingFormProps = {
  eventId?: string;
  eventSlug?: string | undefined;
  eventPrice?: number;
  available_spots?: number;
  waitlist_available?: boolean;
  is_private: boolean | undefined;
};

export default function BookingForm(props: BookingFormProps) {
  const {
    eventId,
    eventSlug,
    eventPrice,
    available_spots,
    waitlist_available,
    is_private,
  } = props;

  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(eventPrice ?? 0);
  const { event } = useEventDetails(eventSlug);
  useEffect(() => {
    setTotalPrice(eventPrice ?? 0);
  }, [eventPrice]);

  const handleAddParticipant = () => {
    setParticipants((prev) => [...prev, { id: uuidv4(), name: "", email: "" }]);
    setTotalPrice((prev) => prev + (eventPrice ?? 0));
  };

  const handleParticipantChange = (
    id: string,
    field: "name" | "email",
    value: string
  ) => {
    setParticipants((prev) =>
      prev.map((participant) =>
        participant.id === id ? { ...participant, [field]: value } : participant
      )
    );
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants((prev) =>
      prev.filter((participant) => participant.id !== id)
    );
    setTotalPrice((prev) => {
      const newTotal = prev - (eventPrice ?? 0);
      return newTotal < (eventPrice ?? 0) ? eventPrice ?? 0 : newTotal;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (available_spots === 0 && !waitlist_available) {
      setError(
        "Dette arrangementet er fullbooket, og det er ikke mulig å bli satt på venteliste 🙁"
      );
      return;
    } else if (is_private) {
      setError(
        "Dette arrangementet er privat, for å kunne delta kontakt admin!"
      );
      return;
    }
    if (!customerName) {
      setError("Vennligst fyll inn navn for bestilleren");
      return;
    }
    if (!customerEmail) {
      setError("Vennligst fyll inn e-post for bestilleren");
      return;
    }

    try {
      // Genererer booking ID på forhånd slik at vi kan bruke den senere
      const bookingId = uuidv4();

      // Sender booking-forespørsel
      const response = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bookingId,
          event_id: eventId,
          customer_name: customerName,
          customer_email: customerEmail,
          total_price: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke sende booking!");
      }

      // Venter på at booking-forespørselen skal fullføres
      const booking = await response.json();

      console.log("Booking ID etter opprettelse:", bookingId);

      if (!bookingId) {
        throw new Error("Booking ID mangler etter opprettelse av booking.");
      }

      // Add
      const mainParticipant = {
        id: uuidv4(),
        booking_id: bookingId,
        name: customerName,
        email: customerEmail,
        waitlist_status: available_spots === 0, //<- participant sets to waitlist if event is fullbooked
      };

      const mainParticipantResponse = await fetch(`${API_BASE}/participants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mainParticipant),
      });

      if (!mainParticipantResponse.ok) {
        throw new Error("Kunne ikke legge til hoveddeltakeren!");
      }

      // Legg til de andre deltakerne etter at hoveddeltakeren er lagt til
      for (const participant of participants) {
        const participantData = {
          id: uuidv4(),
          booking_id: bookingId,
          name: participant.name,
          email: participant.email,
          waitlist_status: available_spots === 0,
        };

        const participantResponse = await fetch(`${API_BASE}/participants`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(participantData),
        });

        if (!participantResponse.ok) {
          throw new Error("Kunne ikke legge til en deltaker!");
        }
      }

      const updatedAvailableSpots =
        available_spots! - (participants.length + 1);
      const updatedEventData = {
        ...event,
        available_spots: updatedAvailableSpots,
      };
      const updateSpotsResponse = await fetch(`${API_BASE}/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEventData),
      });

      if (!updateSpotsResponse.ok) {
        throw new Error("Kunne ikke oppdatere antall ledige plasser");
      }

      setSuccess("Bestilling sendt!");
    } catch (error: any) {
      setError(error.message || "Noe gikk galt under innsendingen.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4 font-bold">Påmeldingsskjema</h2>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <section className="mb-4">
        <label htmlFor="name">Fullt navn (obligatorisk)</label>
        <input
          type="text"
          id="name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <label htmlFor="email">E-post (obligatorisk)</label>
        <input
          type="email"
          id="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </section>
      <h3 className="text-cl font-semibold mt-6 mb-4">Ekstra deltakere?</h3>
      {participants.map((participant) => (
        <section key={participant.id} className="mb-4 p-4 border rounded">
          <section className="mb-2">
            <label htmlFor={`name-${participant.id}`}>Fullt navn</label>
            <input
              type="text"
              id={`name-${participant.id}`}
              value={participant.name}
              onChange={(e) =>
                handleParticipantChange(participant.id, "name", e.target.value)
              }
              className="w-full p-2 border rounded"
              required
            />
          </section>
          <section className="mb-2">
            <label htmlFor={`email-${participant.id}`}>E-post</label>
            <input
              type="email"
              id={`email-${participant.id}`}
              value={participant.email}
              onChange={(e) =>
                handleParticipantChange(participant.id, "email", e.target.value)
              }
              className="w-full p-2 border rounded"
              required
            />
          </section>
          <button
            type="button"
            onClick={() => handleRemoveParticipant(participant.id)}
            className="text-red-500"
          >
            Fjern deltaker
          </button>
        </section>
      ))}
      <button
        type="button"
        onClick={handleAddParticipant}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Legg til deltaker
      </button>
      <section className="mb-4">
        <h3 className="text-xl font-semibold">Total pris: {totalPrice},- kr</h3>
      </section>
      {success && (
        <p className="text-green-400 text-semibold mb-4">{success}</p>
      )}

      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white font-bold rounded"
      >
        Send påmelding
      </button>
    </form>
  );
}
