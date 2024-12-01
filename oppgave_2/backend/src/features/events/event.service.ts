import { Result } from "@/types";
import { Event, eventSchema, eventUpdateSchema } from "./event.schema";
import { EventRepository } from "./event.repository";
import { z } from "zod";
import { STATUS_CODES } from "@/lib/error";
import { randomUUID } from "crypto";
import { slugify } from "@/utils/slugify";
import { TemplateRepository } from "../templates/template.repository";
import { error } from "console";


class createEventService {
   async listEvents(filters: {type?: string, year?: string, month?: string, status?: string}): Promise<Result<Event[]>>{
      return await EventRepository.listEvents(filters)
   }
   async getEventBySlug(slug: string): Promise<Result<Event>>{
      if (!slug) {
         return {
            success: false,
            error: {
               code: STATUS_CODES.BAD_REQUEST,
               message: "Invalid event slug"
            }
         }
      }
      return await EventRepository.getEventBySlug(slug)
   }
   async createEvent(data: any, templateId?: string): Promise<Result<Event>>{
      try {
         if (!data.id) {
            data.id = randomUUID()
         }
         if (!data.slug) {
            data.slug = slugify(data.title)
         }

         if (templateId) {
            data.template_id = templateId
         } else {
            data.template_id = null
         }

         // if event is created using template, we get the template to validate rules
         if (templateId) {
            const templateResult = await TemplateRepository.getTemplateById(templateId)
            if (!templateResult.success) {
               return {
                  success: false,
                  error: {
                     code: "404",
                     message: `Template with id ${templateId} not found!`
                  }
               }
            }
            const template = templateResult.data
            console.log(template)
            // Rule nr 1, No overlapping events on the same day
            // Rule nr 1, scenario #1: If event is created using a template
            if (template?.no_overlapping_events) {
               const existingEvents = await EventRepository.listEvents({})
               if (existingEvents.success) {
                  const isDateOverlapping = existingEvents.data.some(
                     (event) => 
                     new Date(event.date).toDateString() === new Date(data.date).toDateString()
                  )
                  if (isDateOverlapping) {
                  return {
                     success: false,
                     error: {
                     code: STATUS_CODES.CONFLICT, // Conflict 
                     message: `An event already exist on chosen date!`,
               }
            }
         }
               }
               
            }  
       // Rule nr 2: If event is created using a template, which is allowed in certain days
            if (template.date_locked) {
               const eventAllowedDays = template.date_locked
               const evenDay = new Date(data.date).toLocaleString("no-NO", { weekday: "long" })
               if (!eventAllowedDays.includes(evenDay)) {
                  return {
                     success: false,
                     error: {
                        code: STATUS_CODES.BAD_REQUEST, // Conflict 
                        message: `Chosen Template allow event creation only on ${eventAllowedDays.join(",")}!`,
                     }
                  }
               }
            }

            // Rule nr 3: if template has "is private" as rule, ensure to it's true on creating en event
            if (template.is_private) {
               data.is_private = true;
            }
         }  

         
         // Rule nr 1, scenario #2: If event is created from scratch
         const allExistingEvents = await EventRepository.listEvents({})
         if (allExistingEvents.success) {
                  const isDateOverlapping = allExistingEvents.data.some(
                     (event) => 
                     new Date(event.date).toDateString() === new Date(data.date).toDateString()
                  )
                  if (isDateOverlapping) {
                     return {
                  success: false,
                  error: {
                     code: STATUS_CODES.CONFLICT, // Conflict 
                     message: `Et arrangement eksisterer allerede på denne datoen, prøv en annen dato!`,
                  }
               }
            }
            
         }

        
         const parsedEventData = eventSchema.parse(data)
      console.log("Parsed event data: ", parsedEventData)
      return await EventRepository.createEvent(parsedEventData)
      } catch (error) {
         if (error instanceof z.ZodError) {
            return {
               success: false,
               error: {
                  code: STATUS_CODES.BAD_REQUEST,
                  message: JSON.stringify(error.errors)
               }
            }
         } else {
            return {
               success: false,
               error: {
                  code: STATUS_CODES.INTERNAL_SERVER_ERROR,
                  message:  `Failed to create event: ${error}`
               }
            }
         }
      }
   }

   async updateEvent(id: string, data: any, templateId?: string): Promise<Result<Event>>{
      try {
         const eventResult = await EventRepository.getEventById(id)
         if (!eventResult.success) {
            return {
               success: false,
               error: {
                  code: STATUS_CODES.NOT_FOUND,
                  message: "Event not found"
               }
            }
         }
         const existingEvent = eventResult.data

         // Getting the template data if exist to validate rules
         if (templateId) {
            const templateResult = await TemplateRepository.getTemplateById(templateId)
            if (!templateResult.success) {
            return {
               success: false,
               error: {
                  code: STATUS_CODES.NOT_FOUND,
                  message: "Template not found"
               }
            }
         }
            const template = templateResult.data
            // Rule nr 1, No overlapping events on the same day
            if (template?.no_overlapping_events) {
               const existingEvents = await EventRepository.listEvents({})
               if (existingEvents.success) {
                  const isDateOverlapping = existingEvents.data.some(
                     (event) => 
                        // avoid comparing with same event
                        event.id !== id &&
                     new Date(event.date).toDateString() === new Date(data.date).toDateString()
                  )
                  if (isDateOverlapping) {
                  return {
                     success: false,
                     error: {
                     code: STATUS_CODES.CONFLICT, // Conflict 
                     message: `An event already exist on chosen date!`,
               }
            }
         }
               }
               
            }  
       // Rule nr 2: If event is created using a template, which is allowed in certain days
            if (template.date_locked) {
               const eventAllowedDays = template.date_locked
               const evenDay = new Date(data.date).toLocaleString("no-NO", { weekday: "long" })
               if (!eventAllowedDays.includes(evenDay)) {
                  return {
                     success: false,
                     error: {
                        code: STATUS_CODES.BAD_REQUEST, // Conflict 
                        message: `Chosen Template allow event creation only on ${eventAllowedDays.join(",")}!`,
                     }
                  }
               }
            }
            // Ensure privat arrangement dont being changed during the update
            if (template.is_private) {
                  data.is_private = true
               }
         }  
         

         const parsedEvenData = eventUpdateSchema.parse(data)
         const updatedEventData = {
            ...parsedEvenData,
            id: existingEvent.id,
            template_id: existingEvent.template_id // Ensure template id remains the same on updating event
         }
         return await EventRepository.updateEvent(id, updatedEventData)
      } catch (error) {
         if (error instanceof z.ZodError) {
            return {
               success: false,
               error: {
               code: STATUS_CODES.BAD_REQUEST,
               message: JSON.stringify(error.errors)
               }
            }
         } else {
            return {
               success: false,
               error: {
                  code: STATUS_CODES.INTERNAL_SERVER_ERROR,
                  message: `Failed to update event: ${error}`
               }
            }
         }
      }
   }
   async deleteEvent(id: string): Promise<Result<null>>{
      if (!id) {
         return {
            success: false,
            error: {
               code: STATUS_CODES.BAD_REQUEST,
               message: "Invalid event ID"
            }
         }
      }
      return await EventRepository.deleteEvent(id)
   }
}

export const EventService = new createEventService();