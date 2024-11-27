import { z } from "zod";

export const templateSchema = z.object({
   id: z.string().uuid(),
   title: z.string(),
   description: z.string().optional(),
   date_locked: z.string().optional(), // Will be a json formatted array of days locked
   no_overlapping_events: z.boolean().default(false),
   is_private: z.boolean().default(false),
   capacity: z.number().optional(),
   price: z.number().default(0), // if event is free -> price is 0
   has_waitlist: z.boolean().default(false),
   created_at: z.string(),
   updated_at: z.string().optional()
}) 

export const templateSchemaDB = templateSchema.extend({
   no_overlapping_events: z.number(),
   is_private: z.number(),
   has_waitlist: z.number(),
})

export type Template = z.infer<typeof templateSchema>
export type TemplateDB = z.infer<typeof templateSchemaDB>

export const templateFromDB = (template: z.infer<typeof templateSchemaDB>): z.infer<typeof templateSchema> => {
   return {
      ...template,
      no_overlapping_events: template.no_overlapping_events === 1 ? true : false,
      is_private: template.is_private === 1 ? true : false,
      has_waitlist: template.has_waitlist === 1 ? true : false
   }
}
export const templateToDB = (template: z.infer<typeof templateSchema>): z.infer<typeof templateSchemaDB> => {
   return {
      ...template,
      no_overlapping_events: template.no_overlapping_events ? 1 : 0,
      is_private: template.is_private ? 1 : 0,
      has_waitlist: template.has_waitlist ? 1 : 0
   }
}

export const validateTemplate = (data: unknown) => {
   const result = templateSchema.safeParse(data)
   return result.success
   ? { success: true, data: result.data }
   : {success: false, error: result.error}
}

export const validateTemplateDB = (data: unknown) => {
   const result = templateSchemaDB.safeParse(data)
   return result.success
   ? { success: true, data: result.data }
   : {success: false, error: result.error}
}