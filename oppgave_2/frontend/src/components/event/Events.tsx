'use client'
import React, { useState } from "react";
import EventCard from "./EventCard";
import { events } from "@/data/data";
import {format} from "date-fns"
import FilterAside from "./FilterAside";
import Header from "../layout/Header";
import useEventFilter from "@/hooks/useEventFilter";
export default function Events() {

      const [month, setMonth] = useState<string | null>(null);
      const [year, setYear] = useState<string | null>(null);
      const [type, setType] = useState<string | null>(null);
      const [status, setStatus] = useState<string | null>(null);
  const { filteredEvents } = useEventFilter({
      events,
      month,
      year,
      type,
      status
      })
return (
    <>
      <Header>
        <ul>
          <li>(Kundeside)</li>
        </ul>
      </Header>
    <section className="p-10 flex gap-40 ">
      <FilterAside
        setMonth={setMonth}
        setYear={setYear}
        setType={setType}
        setStatus={setStatus}
        />
        <section className="grow">
          <h2 className="text-3xl mb-10 font-bold">Arrangementer</h2>
          <section className="flex flex-wrap justify-items-stretch gap-3 ">
            {filteredEvents?.map((event) => {
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
        </section>
      </section>
    </>
  );
}
