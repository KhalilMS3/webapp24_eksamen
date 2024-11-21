import { events } from "@/data/data"
import db from "./db"
import { randomUUID } from "crypto"


export async function seed () {
   try {
      const eventStmt = db.prepare(`
         INSERT INTO events (
         id, title, slug, description, date, location, type, capacity, price,
         is_private, waitlist_available, available_spots, status)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         `)
      
      events.forEach((event) => {

         eventStmt.run(
            event.id || randomUUID(),
            event.title,
            event.slug,
            event.description,
            event.date,
            event.location,
            event.type,
            event.capacity,
            event.price,
            event.isPrivate ? 1 : 0,
            event.waitlistAvailable ? 1 : 0,
            event.availableSpots,
            event.status
         )
      })
      console.log("Seeded database with event data successfully")
   } catch (error) {
      console.error("Error seeding database with event data:", error)
   }
}