"use client";
import React, { useMemo, useState } from "react";
import EventCard from "./EventCard";
import { format } from "date-fns";
import FilterAside from "./FilterAside";
import Header from "../layout/Header";
import { useEvent } from "@/hooks/useEvent";


export default function Events() {
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const filterCriteria = useMemo(() => {
    return {type, year, month, status}
  }, [type, year, month, status])
  const { events, loading, error } = useEvent(filterCriteria);

  return (
    <>
      <Header>
        <ul>
          <li>(Kundeside)</li>
        </ul>
      </Header>
      <section className="p-10 flex gap-20">
        <section className="w-1/6">
          <FilterAside
            month={month}
            year={year}
            type={type}
            status={status}
            setMonth={setMonth}
            setYear={setYear}
            setType={setType}
            setStatus={setStatus}
          />
        </section>
        <section className="w-4/5">
          <h2 className="text-3xl mb-10 font-bold">Arrangementer</h2>
          {
            error ? (
            <p>En feil oppsted ved opplasting av arrangenemter: {error}</p>
          ) : events.length > 0 ? (
            <section className="flex flex-wrap justify-items-stretch gap-3">
              {events?.map((event) => {
                const date = format(new Date(event.date), "dd/MM/yyyy");
                return (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    slug={event.slug}
                    description={event.description}
                    date={date}
                    type={event.type}
                    price={event.price}
                    status={event.status}
                  />
                );
              })}
            </section>
          ) : events.length === 0 ? (
            <p>Ingen resultater for valgte filtrene 🫤</p>
          ) : loading ? (
            <p>Laster inn arrangenemter...</p>
          ): null}
        </section>
      </section>
    </>
  );
}
