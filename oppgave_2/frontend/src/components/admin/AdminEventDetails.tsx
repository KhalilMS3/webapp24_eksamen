"use client";
import { useParams } from "next/navigation";
import { useEventDetails } from "@/hooks/useEventDetails";
import { useParticipant } from "@/hooks/useParticipant";
import EditParticipantModal from "./EditParticipantModal";
import { useState } from "react";
import { Participant } from "@/types/types";
import ParticipantCard from "./ParticipantCard";
import BookingForm from "../event/BookingForm";

export default function AdminEventDetails() {
const params = useParams() as Record<string, string>;
const { eventSlug } = params;
const {
event,
loading: eventLoading,
error: eventError,
} = useEventDetails(eventSlug);
const {
participants,
loading: participantsLoading,
error: participantsError,
} = useParticipant(event?.id || "");

const [selectedParticipant, setSelectedParticipant] =useState<Participant | null>(null);
const [localParticipants, setLocalParticipants] =useState<Participant[]>([]);
const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

const handleEditParticipant = (participant: Participant) => {
setSelectedParticipant(participant);
setIsEditModalOpen(true);
};
const handleDeleteParticipant = (participantId: string) => {
setLocalParticipants((prev) => prev.filter((participant) => participant.id !== participantId));
};

const handleModalClose = () => {
setIsEditModalOpen(false);
setSelectedParticipant(null);
};

return (
<section className="flex gap-5">
   <section className="p-10">
   {eventLoading ? (
      <p>Laster inn arrangement detaljer...</p>
   ) : eventError ? (
      <p>En feil oppstod: {eventError}</p>
   ) : event ? (
      <>
         <h2 className="text-3xl mb-5 font-semibold">
         Arrangement: {event.title}
         </h2>
         <h3 className="text-2xl mb-2 font-semibold">Statistikk</h3>
         <p className="mb-4">
         <strong>💠Antall påmeldinger:</strong> {participants.length} påmelding(er)
         </p>
         <h3 className="text-2xl mb-2 font-semibold">Detaljer</h3>
         <section className="flex gap-10">
         <section>
            <p className="mb-4">
               <strong>📅Dato:</strong>{" "}
               {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="mb-4">
               <strong>📍Sted:</strong> {event.location}
            </p>
            <p className="mb-4">
               <strong>🎉Type:</strong> {event.type}
            </p>
            <p className="mb-4 ">
               <strong>📄Beskrivelse:</strong> {event.description}
            </p>
            <p className="mb-4">
               <strong>🔒Privat:</strong> {event.is_private ? "Ja" : "Nei"}
            </p>
         </section>
         <section>
            <p className="mb-4">
               <strong>⚙️Status:</strong> {event.status}
            </p>
            <p className="mb-4">
               <strong>🧍🏻Kapasitet:</strong> {event.capacity}
            </p>
            <p className="mb-4">
               <strong>🪑Ledige plasser:</strong> {event.available_spots}
            </p>
            <p className="mb-4">
               <strong>💸Pris:</strong> {event.price},-kr
            </p>
            <p className="mb-4">
               <strong>🕑Venteliste:</strong>{" "}
               {event.waitlist_available ? "Ja" : "Nei"}
            </p>
         </section>
         </section>
         <h3 className="text-2xl mb-6 mt-10 font-semibold">Påmeldinger</h3>
         {participantsLoading ? (
         <p>Laster inn påmeldinger...</p>
         ) : participantsError ? (
         <p>
            En feil oppstod ved henting av påmeldinger: {participantsError}
         </p>
         ) : participants.length > 0 ? (
         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {participants.map((participant: any) => (
               <ParticipantCard
               key={participant.id}
               participant={participant}
               onEdit={() => handleEditParticipant(participant)}
               />
            ))}
         </section>
         ) : (
         <p>Ingen påmeldinger funnet.</p>
         )}
      </>
   ) : (
      <p>Ingen data funnet.</p>
   )}
   </section>
   {event && (
   <BookingForm
      eventId={event.id}
      eventSlug={event.slug}
      eventPrice={event.price}
      available_spots={event.available_spots}
      waitlist_available={event.waitlist_available}
      is_private={event.is_private}
      isAdmin={true}
   />
   )}
   {selectedParticipant && (
   <EditParticipantModal
      participant={selectedParticipant}
      isOpen={isEditModalOpen}
      onClose={handleModalClose}
      onUpdate={(updatedParticipant) => {
         // Oppdater lokal liste med påmeldinger
         setLocalParticipants((prev) =>
         prev?.map((participant: any) =>
            participant.id === updatedParticipant.id
               ? updatedParticipant
               : participant
         )
         );
      }}
      onDelete={handleDeleteParticipant}
   />
   )}
</section>
);
}