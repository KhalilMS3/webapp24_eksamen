import React from "react";
import EventCard from "./EventCard";
import { events } from "@/data/data";
import {format} from "date-fns"
import FilterAside from "./FilterAside";
export default function Events() {
  return (
    <>
      <section className="p-10 flex gap-40">
        <section>
          <h2 className="text-3xl mb-10 font-bold">Arrangements</h2>
          <section className="flex flex-wrap justify-items-stretch gap-3 ">
            {events?.map((event) => {
              const date = format(new Date(event.date), "dd/MM/yyyy hh:mm");
              return (
                <EventCard
                  key={event.id}
                  title={event.title}
                  slug={event.slug}
                  description={event.description}
                  date={date}
                  location={event.location}
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
