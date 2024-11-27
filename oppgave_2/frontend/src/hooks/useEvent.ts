import { API_BASE } from "@/config/urls"
import { EventType } from "@/types/types"
import { useEffect, useState } from "react"

type useEventFilterCriteria = {
   type?: string,
   month?: string,
   year?: string,
   status?: string,
}

export const useEvent = (filters: useEventFilterCriteria = {}) => {
   const [events, setEvents] = useState<EventType[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      const fetchEventsFromServer = async () => {
         try {
            setLoading(true)
            const queryParams = new URLSearchParams(filters as Record<string, string>).toString()
            const serverUrl = queryParams ? `${API_BASE}/events?${queryParams}` : `${API_BASE}/events`
            const response = await fetch(serverUrl)

            if (!response.ok) {
               console.error("Failed to fetch events!")
            }
            const data = await response.json()
            setEvents(data)
            console.log(data)
         } catch (error: any) {
            setError(error.message)
         } finally {
            setLoading(false)
         }
      }

      fetchEventsFromServer()
   }, [filters])
   
   return {events, loading, error}
}