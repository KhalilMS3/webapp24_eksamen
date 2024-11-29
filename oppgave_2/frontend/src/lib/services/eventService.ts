import { API_BASE } from "@/config/urls"

export const checkDateAvailability = async (date: string): Promise<boolean> => {
   try {
      const response = await fetch(`${API_BASE}/events`)
      const data = await response.json()
      console.log(data)
      if (data.success && data.data.length > 0) {
         console.log("Date not available")
         return false; // date not available
      }
      console.log("Date available")
      return true // date available
   } catch (error) {
      console.error("Feil ved sjekk av datoens tilgjengelighet:", error)
      return false // if error is catched, indicate date is not available
   }
}