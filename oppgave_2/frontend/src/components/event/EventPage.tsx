'use client'
import { events } from '@/data/data'
import { useParams } from 'next/navigation'
import React from 'react'

export default function EventPage() {
  const params = useParams() as Record<string, string>
  const { eventSlug } = params
  
  const event = events.find((event) => event.slug === eventSlug)
  return (
    <>
      <p>{ event?.title}</p>
    <div>EventPage for {eventSlug}</div>
    </>
  )
}
