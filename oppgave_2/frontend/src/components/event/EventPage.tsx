'use client'
import { useParams } from 'next/navigation'
import { format } from "date-fns";
import React from 'react'
import Header from '../layout/Header'
import { useEventDetails } from '@/hooks/useEventDetails';
import BookingForm from './BookingForm';

export default function EventPage() {
  const params = useParams() as Record<string, string>
  const { eventSlug } = params
  const { event, loading, error } = useEventDetails(eventSlug)
  
  const isFullbooked = event?.status === "Fullbooket";
  const statusStyles = isFullbooked
    ? "border-red-600 bg-red-500/75"
    : "border-green-600 bg-green-500/75";
  const statusText = isFullbooked ? "Fullbooket" : "Ledig";
  return (
    <>
      <Header>
        <ul>
          <li>(Kundeside)</li>
        </ul>
      </Header>
      {loading ? (
        <p>Laster inn arrangement detaljer...</p>
      ) : error ? (
        <p>En feil oppstod ved innlasting av arrangement detaljer: {error}</p>
      ) : !event ? (
        <p>Arrangementet ble ikke funnet 🫤</p>
      ) : (
        <section className=" flex justify-between items-baseline gap-20 p-10 divide-x-2 divide-black">
          <section>
            <h2 className="text-3xl pb-5">
              <b>Arrangement:</b> {event?.title}
            </h2>
            <section className="flex gap-5 pb-10 items-baseline text-center">
              <p className="text-2xl text-white font-medium px-2 py-1 rounded-md border-cyan-600 border-solid border-2 bg-blue-500/75">
                {event?.type}
              </p>
              <p
                className={`text-2xl text-white font-medium px-2 py-1 rounded-md border-solid border-2 ${statusStyles}`}
              >
                {statusText}
              </p>
            </section>
            <section className="flex flex-col gap-6 text-2xl text-wrap pb-6">
              <p>
                <b>Beskrivelse: </b>
                {event?.description}
              </p>
              <p>
                <b>Venteliste? </b>
                {event?.waitlist_available ? "Ja" : "Nei"}
              </p>
              <p>
                <b>Privat? </b>
                {event?.is_private ? "Ja - trenger invitasjonslenke" : "Nei"}
              </p>
            </section>
          </section>

          <aside className="flex flex-col gap-10 pl-5 pb-40">
            <section className="flex gap-10">
              <p className="text-lg">
                📅 <b> Dato:</b> {event?.date}
              </p>
            </section>
            <section className="flex gap-5">
              <p className="text-lg">
                📍<b>Sted: </b> {event?.location}
              </p>
              <p className="text-lg">
                💸<b>Pris: </b> {event?.price},- kr
              </p>
            </section>
            <section className="flex gap-5">
              <p className="text-lg">
                🪑<b>Ledige plasser: </b> {event?.available_spots}
              </p>
              <p className="text-lg">
                🧍🏻<b>Kapasitet: </b> {event?.capacity}
              </p>
            </section>
          </aside>
        </section>
      )}
      <BookingForm
        eventId={event?.id}
        eventSlug={eventSlug}
        eventPrice={event?.price}
        available_spots={event?.available_spots}
        waitlist_available={event?.waitlist_available}
        is_private={event?.is_private}
        isAdmin={false}
      />
    </>
  );
}
