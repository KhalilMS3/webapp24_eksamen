"use client";
import AdminEventCard from "./AdminEventCard";
import { EventType } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import EditEventModal from "./EditEventModal";
import { API_BASE } from "@/config/urls";

export default function AdminEvents() {
const [events, setEvents] = useState<EventType[]>([])
const [loading, setLoading] = useState<boolean>(false)
const [error, setError] = useState<string | null>(null)
const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

const handleEdit = useCallback((event: EventType) => {
   setSelectedEvent(event);
   setIsEditModalOpen(true);
},[])

const handleDelete = useCallback(async (evenId: string) => {
   // Logic to delete event by ID
   try {
   await fetch(`${API_BASE}/events/${evenId}`, {
      method: "DELETE",
   });
      alert("Arrangement slettet");
      setEvents((prev) =>prev.filter((e) => e.id !== evenId))
   } catch (error) {
   console.error("Feil ved sletting av arrangement:", error);
   }
},[])

const handleUpdate = (updatedEvent: EventType) => {
   setEvents((prev) => prev.map((event) => (
      event.id === updatedEvent.id ? updatedEvent : event
   )))
   setIsEditModalOpen(false);
   };
   


   useEffect(() => {
   const fetchEventsFromServer = async () => {
      try {
         setLoading(true);
         const response = await fetch(`${API_BASE}/events`);

         if (!response.ok) {
         console.error("Failed to fetch events!");
         }
         const data = await response.json();
         setEvents(data);
         console.log(data);
      } catch (error: any) {
         setError(error.message);
      } finally {
         setLoading(false);
      }
   };

   fetchEventsFromServer();
   }, []);

return (
   <section className="admin-events w-full px-4 py-8 bg-gray-100">
   <h2 className="text-3xl mb-6 font-bold text-center">
      Administrer Arrangementer
   </h2>

   {error ? (
      <p>En feil oppstod ved henting av arrangementer: {error}</p>
   ) : loading ? (
      <p>Laster inn arrangementer...</p>
   ) : events.length > 0 ? (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {events.map((event) => (
         <AdminEventCard
            key={event.id}
            event={event}
            onEdit={() => handleEdit(event)}
            onDelete={() => handleDelete(event?.id)}
         />
         ))}
      </section>
   ) : (
      <p>Ingen arrangementer funnet.</p>
   )}

   {selectedEvent && (
         <EditEventModal
         events={events}
         event={selectedEvent}
         isOpen={isEditModalOpen}
         onClose={() => setIsEditModalOpen(false)}
         onUpdate={handleUpdate}
      />
   )}
   </section>
);
}
