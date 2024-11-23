import { API_BASE } from "@/config/urls"
import { EventType } from "@/types/types"
import { useEffect, useState } from "react"


export const useEventDetails = (eventSlug: string) => {
   const [event, setEvent] = useState<EventType | null>(null)
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      const fetchEventFromServer = async () => {
         try {
            setLoading(true)
            const response = await fetch(`${API_BASE}/events/${eventSlug}`)
            if (!response.ok) {
               console.error("Failed to fetch event details!")
            }
            const eventData = await response.json()
            setEvent(eventData.data)
            console.log(eventData.data)
         } catch (error: any) {
            setError(error)
         } finally {
            setLoading(false)
         }
      }

      if (eventSlug) {
         fetchEventFromServer()
      }
   }, [eventSlug])
   
   return {event, loading, error}
}