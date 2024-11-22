import { z } from "zod";

export const eventSchema = z.object({
   id: z.string().uuid(),
   title: z.string(),
   slug: z.string(),
   description: z.string().optional(),
   date: z.string(),
   location: z.string().optional(),
   type: z.string(),
   capacity: z.number(),
   price: z.number(),
   is_private: z.boolean(),
   waitlist_available: z.boolean(),
   available_spots: z.number(),
   status: z.string(),
})

export type Event = z.infer<typeof eventSchema>
export type EventDB = z.infer<typeof eventSchemaDB>

// Converting boolean values to numbers, SQL does not support boolean values
const eventSchemaDB = eventSchema.extend({
   is_private: z.number(),
   waitlist_available: z.number()
})

// Converting the data type to its original type, number -> boolean
export const eventFromDB = (event: z.infer<typeof eventSchemaDB>): z.infer<typeof eventSchema> => {
   return {
      ...event,
      is_private: event.is_private === 1 ? true : false,
      waitlist_available:  event.waitlist_available === 1 ? true : false,
   }
}

// Converting the data type to its database supported type, boolean -> number
export const eventToDB = (event: z.infer<typeof eventSchema>): z.infer<typeof eventSchemaDB> => {
   return {
      ...event,
      is_private: event.is_private === true ? 1 : 0,
      waitlist_available: event.waitlist_available === true ? 1 : 0,
   }
}

export const eventUpdateSchema = eventSchema.omit({ id: true })



export const validateEvent = (data: unknown) => {
   const result = eventSchema.safeParse(data)
   return result.success
   ? { success: true, data: result.data }
   : {success: false, error: result.error}
}

export const validateEventDB = (data: unknown) => {
   const result = eventSchemaDB.safeParse(data)
   return result.success
   ? { success: true, data: result.data }
   : {success: false, error: result.error}
}