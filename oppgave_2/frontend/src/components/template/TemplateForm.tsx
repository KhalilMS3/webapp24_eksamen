'use client'
import { API_BASE } from '@/config/urls'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { weekDays } from '@/data/data'

export default function TemplateForm() {
const [title, setTitle] = useState<string>("")
const [description, setDescription] = useState<string>("")
const [dateLocked, setDateLocked] = useState<string[]>([])
const [noOverlappingEvents, setNoOverlappingEvents] = useState<boolean>(false)
const [isPrivate, setIsPrivate] = useState<boolean>(false)
const [capacity, setCapacity] = useState<number | "">("")
const [price, setPrice] = useState<number | "">("")
const [hasWaitlist, setHasWaitlist] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null)
const [success, setSuccess] = useState<string | null>(null)

const handleDaySelect = (day: string) => {
   setDateLocked((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
   )
}
const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
   setError(null)
   setSuccess(null)

   if (!title) {
      setError("Title er påkrevd!")
      return;
   }

   if (capacity !== "" && capacity <= 0){
      setError("Kapasitet må være et positivt tall!");
      return;
   }
   if (price !== "" && price < 0) {
      setError("Pris må være 0 eller et positivt tall!");
      return;
   }

   const formData = {
      id: uuidv4(),
      title,
      description,
      date_locked: dateLocked,
      no_overlapping_events: noOverlappingEvents,
      is_private: isPrivate,
      capacity: capacity ? Number(capacity) : 0,
      price: price ? Number(price) : 0,
      has_waitlist: hasWaitlist,
      created_at: new Date().toISOString()
   }

   try {
      const response = await fetch(`${API_BASE}/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
         setError("Feil ved opprettelse av mal!")
         return
      }
      
      setSuccess("Mal opprettet 🎉")

      setTitle("")
      setDescription("")
      setDateLocked([])
      setNoOverlappingEvents(false)
      setIsPrivate(false)
      setCapacity("")
      setPrice("")
      setHasWaitlist(false)

   } catch (error: any) {
      setError(error.message)
   }

}
   return (
     <>
       <h2 className="text-2xl font-bold mx-8 mt-10">Opprett et Mal</h2>
       <p className="text-xl font-semibold ml-8 mt-5  ">
         Opprett et Mal for dine arrangementer, og gjenbruk dem for raskere
         opprettelse av arrangementer 😉
       </p>
       <form
         onSubmit={handleSubmit}
         className="p-6 bg-white rounded-md shadow-md m-8 w-1/2"
       >
         <section className="mb-4">
           <label htmlFor="title" className="block font-semibold mb-2">
             Tittel
           </label>
           <input
             id="title"
             type="text"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             className="w-full p-2 border rounded"
             required
           />
         </section>

         <section className="mb-4">
           <label htmlFor="description" className="block font-semibold mb-2">
             Beskrivelse
           </label>
           <textarea
             id="description"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             className="w-full p-2 border rounded"
           />
         </section>

         <section className="mb-4">
           <label className="block font-semibold mb-2">Låste dager</label>
           <small>Dager arrangementet kan opprettes i</small>
           <section className="flex gap-2">
             {weekDays.map((day) => (
               <section key={day} className="flex gap-0 items-baseline mb-2">
                 <input
                   type="checkbox"
                   id={`day-${day}`}
                   value={day}
                   checked={dateLocked.includes(day)}
                   onChange={() => handleDaySelect(day)}
                   className="mr-2 mt-2 rounded"
                 />
                 <label htmlFor={`day-${day}`}>{day}</label>
               </section>
             ))}
           </section>
         </section>

         <section className="flex items-baseline gap-5 mb-4">
           <input
             type="checkbox"
             checked={noOverlappingEvents}
             className="mt-2 rounded"
             onChange={(e) => setNoOverlappingEvents(e.target.checked)}
           />
           <label className="block font-semibold mb-2">
             Ingen overlappende arrangementer
           </label>
         </section>
         <section className="flex gap-5">
           <section className="mb-4 flex items-baseline gap-2">
             <input
               type="checkbox"
               checked={hasWaitlist}
               onChange={(e) => setHasWaitlist(e.target.checked)}
               className="rounded mt-2"
             />
             <label className="block font-semibold mb-2">
               Venteliste tilgjengelig
             </label>
           </section>
           <section className="mb-4 flex items-baseline gap-2">
             <input
               type="checkbox"
               checked={isPrivate}
               className="mt-2 rounded"
               onChange={(e) => setIsPrivate(e.target.checked)}
             />
             <label className="block font-semibold mb-2">
               Privat arrangement
             </label>
           </section>
         </section>
         <section className="mb-4">
           <label htmlFor="capacity" className="block font-semibold mb-2">
             Kapasitet
           </label>
           <input
             id="capacity"
             type="number"
             value={capacity}
             onChange={(e) =>
               setCapacity(e.target.value ? Number(e.target.value) : "")
             }
             className="w-full p-2 border rounded"
           />
         </section>

         <section className="mb-4">
           <label htmlFor="price" className="block font-semibold mb-2">
             Pris
           </label>
           <small>
             Hvis arrangementet er gratis, sett 0 som pris eller hold feltet tom{" "}
           </small>
           <input
             id="price"
             type="number"
             value={price}
             onChange={(e) =>
               setPrice(e.target.value ? Number(e.target.value) : "")
             }
             className="w-full p-2 border rounded"
           />
         </section>
         {error && <p className="text-red-500 mb-4">{error}</p>}
         {success && <p className="text-green-500 mb-4">{success}</p>}
         <button
           type="submit"
           className="px-4 py-2 bg-green-600 text-white font-semibold rounded"
         >
           Opprett Mal
         </button>
       </form>
     </>
   );
}
