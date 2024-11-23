import { Result } from "@/types"
import { Booking, bookingFromDB, bookingToDB } from "./booking.schema"
import db from "@/db/db"

type BookingRepository = {
   listBookings: () => Promise<Result<Booking[]>>
   getBookingById: (id: string) => Promise<Result<Booking>>,
   createBooking: (data: Booking) => Promise<Result<Booking>>,
   updateBooking: (id: string, data: Booking) => Promise<Result<Booking>>,
   deleteBooking: (id: string) => Promise<Result<null>>,
}

export const createBookingRepository = (db: any): BookingRepository => {
   return {
      listBookings: async (): Promise<Result<Booking[]>> => {
         try {
            const stmt = db.prepare(`
               SELECT * FROM bookings
               `)
            const rows = stmt.all()
            const bookings = rows.map(bookingFromDB)

            return {success: true, data: bookings}
         } catch (error: any) {
            console.error("Error listing bookings from database:", error)
            return {
               success: false, error:  error.message
            }
         }
      },

      getBookingById: async (id: string): Promise<Result<Booking>> => {
         try {
            const stmt = db.prepare(`
               SELECT * FROM bookings WHERE id = ?
               `)
            const row = stmt.all(id)
            if (!row) {
               return {
                  success: false,
                  error: {
                     code: "404",
                     message: "Booking not found"
                  }
               }
            }

            const booking = bookingFromDB(row)
            return { success: true, data: booking }
            
         } catch (error: any) {
            console.error("Error fetching booking by id from database:", error)
            return {success: false, error: error.message}
         }
      },

      createBooking: async (data: Booking): Promise<Result<Booking>> => {
         try {
            const bookingData = bookingToDB(data)

            const stmt = db.prepare(`
               INSERT INTO bookings(
               id, event_id, customer_name, customer_email, total_price, status, created_at, updated_at
               )
               VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
               `)
            
            stmt.run(
               bookingData.id,
               bookingData.event_id,
               bookingData.customer_name,
               bookingData.customer_email,
               bookingData.total_price,
               bookingData.status,
            )

            return {success: true, data}
         } catch (error: any) {
            console.error("Error creating booking:", error)
            return {
               success: false, error: error.message
            }
         }
      },

      updateBooking: async (id: string, data: Booking): Promise<Result<Booking>> => {
         try {
            const bookingData = bookingToDB(data)
            const stmt = db.prepare(`
               UPDATE bookings
               SET event_id = ?, customer_name = ?, customer_email = ?, total_price = ?, status = ?,
               updated_at = CURRENT_TIMESTAMP
               WHERE id = ?
               `)
            
            stmt.run(
               bookingData.event_id,
               bookingData.customer_name,
               bookingData.customer_email,
               bookingData.total_price,
               bookingData.status,
               id
            )

            return { success: true, data }
         } catch (error: any) {
            console.error("Error updating booking:", error)
            return {success: false, error: error.message}
         }
      },

      deleteBooking: async (id: string): Promise<Result<null>> => {
         try {
            const stmt = db.prepare(`
               DELETE FROM bookings WHERE id = ?
               `)
            const result = stmt.run(id)

            if (result.catch === 0) {
               return {
                  success: false,
                  error: {
                     code: "404",
                     message: "Booking not found"
                  }
               }
            }
            return {success: true, data: null}
         } catch (error: any) {
            console.error("Error deleting booking:", error)
            return { success: false, error: error.message }
         }
      }
   }
}

export const BookingRepository = createBookingRepository(db)
