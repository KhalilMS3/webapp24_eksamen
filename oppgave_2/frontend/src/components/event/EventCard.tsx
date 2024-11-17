'use client'

import Link from 'next/link';
import React from 'react'
type EventCardProps = {
  title: string,
  slug: string,
  description: string,
  date: string,
  location: string,
  type: string,
  price: number,
  status: string,
}

export default function EventCard(props: EventCardProps) {
  const {
    title, slug, description, date, location, type, price, status
  } = props
  return (
    <article className="flex flex-col p-5 gap-3 w-3/12 border-black border rounded-md shadow-md hover:shadow-lg cursor-pointer	">
      <section className="flex justify-between mb-10">
        <h3 className="font-semibold">{title}</h3>
        {status === "Fullbooket" ? (
          <p>
            <span className=" text-white font-medium px-2 py-1 rounded-md border-red-600 border-solid border-2 bg-red-500/75">
              Fullbooket
            </span>
          </p>
        ) : (
          <p>
            <span className=" text-white font-medium px-2 py-1 rounded-md border-green-600 border-solid border-2 bg-green-500/75">
              Ledig
            </span>
          </p>
        )}
      </section>
      <p>{description}</p>
      <ul className="flex gap-10">
        <li>
          <b>Dato: </b> {date}
        </li>
        <li>
          <b>Type:</b> {type}
        </li>
      </ul>
      <ul className="flex gap-20">
        <li>
          <b>pris:</b> {price},- kr
        </li>
        <li></li>
      </ul>
      <Link
        href={`/kunde/arrangementer/${slug}`}
        className="bg-gradient-to-l from-blue-400 to-blue-500 text-white font-medium  text-center p-2 mt-5 rounded-md"
      >
        Til arrangement
      </Link>
    </article>
  );
}
