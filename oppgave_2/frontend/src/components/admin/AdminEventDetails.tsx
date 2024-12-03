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
         <h2 className="text-3xl mb-10 font-semibold">{event.title}</h2>
         <p className="mb-4">
         Dato: {new Date(event.date).toLocaleDateString()}
         </p>
         <p className="mb-4">Sted: {event.location}</p>
         <p className="mb-4">Type: {event.type}</p>
         <p className="mb-4">Beskrivelse: {event.description}</p>

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
            {
               event && (
                  <BookingForm
                     eventId={event.id}
                     eventPrice={event.price}
                     available_spots={event.available_spots}
                     waitlist_available={event.waitlist_available}
                     is_private={event.is_private}
                  />
               )
            }
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
