import { z } from "zod";

export const bookingSchema = z.object({
   id: z.string().uuid(),
   event_id: z.string().uuid(),
   customer_name: z.string(),
   customer_email: z.string(),
   total_price: z.number().nonnegative(),
   status: z.string().default("Pending"),
   created_at: z.string().optional(),
   updated_at: z.string().optional()
})

export type Booking = z.infer<typeof bookingSchema>
export type BookingDB = z.infer<typeof bookingSchemaDB>

export const bookingSchemaDB = bookingSchema.extend({
   event_id: z.string()
})

export const bookingFromDB = (booking: z.infer<typeof bookingSchemaDB>): z.infer<typeof bookingSchema> => {
   return {
      ...booking
   }
}
export const bookingToDB = (booking: z.infer<typeof bookingSchema>): z.infer<typeof bookingSchemaDB> => {
   return {
      ...booking
   }
}

export const validateBooking = (data: unknown) => {
   const result = bookingSchema.safeParse(data)
   return result.success
   ? { success: true, data: result.data }
   : {success: false, error: result.error}
}

export const validateBookingDB = (data: unknown) => {
   const result = bookingSchemaDB.safeParse(data)
   return result.success
   ? { success: true, data: result.data }
   : {success: false, error: result.error}
}
