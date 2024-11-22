import { Result } from "@/types"
import { Event, eventFromDB, eventToDB } from "./event.schema"
import db from "@/db/db";


type EventRepository = {
   listEvents: () => Promise<Result<Event[]>> 
   getEventBySlug: (slug: string) => Promise<Result<Event>>;
   createEvent: (data: Event) => Promise<Result<Event>>;
   updateEvent: (id: string, data: Event) => Promise<Result<Event>>;
   deleteEvent: (slug: string) => Promise<Result<null>> 
}

export const createEventRepository = (db: any): EventRepository => {
   return {
      listEvents: async (): Promise<Result<Event[]>> => {
         try {
            const stmt = db.prepare(`
               SELECT * FROM events
               `)
            const rows = stmt.all()
            const events = rows.map(eventFromDB)

            return {success: true, data: events}
         }
         catch(error: any) {
            console.log("Error listing events from Database:", error)
            return {success: false, error: error.message}

         }
      },

      getEventBySlug: async (slug: string): Promise<Result<Event>> => {
         try {
            const stmt = db.prepare(`
               SELECT * FROM events WHERE slug = ?
               `)
            const row = stmt.get(slug)
            if (!row) {
               return {
                  success: false, error: {
                     code: "404",
                     message: "Event not found"
                  }
               }
            }

            const event = eventFromDB(row)
            return{success: true, data: event}
         } catch (error: any) {
            console.error("Error fetching event by slug:", error)
            return {success: false, error: error.message}
            
         }
      },
      createEvent: async (data: Event): Promise<Result<Event>> => {
         try {
            const eventData = eventToDB(data)

            const stmt = db.prepare(`
               INSERT INTO events (
               id, title, slug, description, date, location, type, capacity, price,
               is_private, waitlist_available, available_spots, status
               )
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
               `)
            
            stmt.run(
               eventData.id,
               eventData.title,
               eventData.slug,
               eventData.description,
               eventData.date,
               eventData.location,
               eventData.type,
               eventData.capacity,
               eventData.price,
               eventData.is_private,
               eventData.waitlist_available,
               eventData.available_spots,
               eventData.status,
            )
            return {success: true, data}
         } catch (error: any) {
            console.error("Error creating event:", error)
            return {success: false, error: error.message}
         }
      },
      updateEvent: async (id: string, data: Event): Promise<Result<Event>> => {
         try {
            const eventData = eventToDB(data)
            const stmt = db.prepare(`
               
               UPDATE events
               SET title = ?, slug = ?, description = ?, date = ?, location = ?, type = ?,
               capacity = ?, price = ?, is_private = ?, waitlist_available = ?, available_spots = ?,
               status = ?, updated_at = CURRENT_TIMESTAMP
               WHERE id = ?
               `)
            
            stmt.run(
               eventData.title,
               eventData.slug,
               eventData.description,
               eventData.date,
               eventData.location,
               eventData.type,
               eventData.capacity,
               eventData.price,
               eventData.is_private,
               eventData.waitlist_available,
               eventData.available_spots,
               eventData.status,
            )
            return{success: true, data}
         } catch (error: any) {
            console.error("Error updating event:", error)
            return{success: false, error: error.message}

         }
      },

      deleteEvent: async (slug: string): Promise<Result<null>> => {
         try {
            const stmt = db.prepare(`
               DELETE FROM events WHERE slug = ?
               `)
            
            const result = stmt.run(slug)
            if (result.changes === 0) {
               return { success: false, error: {
                  code: "404",
                  message: "Event not found"
               }
               }
            }
            return {success: true, data: null}
         } catch (error: any) {
            console.error("Error deleting event:", error)
            return {success: false, error: error.message}
         }
      }
   }
}

export const EventRepository = createEventRepository(db)