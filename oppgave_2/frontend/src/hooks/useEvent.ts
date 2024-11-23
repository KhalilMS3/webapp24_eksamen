import { API_BASE } from "@/config/urls"
import { EventType } from "@/types/types"
import { useEffect, useState } from "react"


export const useEvent = () => {
   const [events, setEvents] = useState<EventType[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      const fetchEventsFromServer = async () => {
         try {
            setLoading(true)
            const response = await fetch(`${API_BASE}/events`)
            if (!response.ok) {
               console.error("Failed to fetch events!")
            }
            const data = await response.json()
            setEvents(data)
            console.log(data)
         } catch (error: any) {
            setError(error)
         } finally {
            setLoading(false)
         }
      }

      fetchEventsFromServer()
   }, [])
   
   return {events, loading, error}
}