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
                     message: `An event already exist on chosen date!`,
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

   async updateEvent(id: string, data: any): Promise<Result<Event>>{
      try {
         const parsedEvenData = eventUpdateSchema.parse(data)
         const updatedEventData = {
            ...parsedEvenData,
            id: id
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
   async deleteEvent(slug: string): Promise<Result<null>>{
      if (!slug) {
         return {
            success: false,
            error: {
               code: STATUS_CODES.BAD_REQUEST,
               message: "Invalid event slug"
            }
         }
      }
      return await EventRepository.deleteEvent(slug)
   }
}

export const EventService = new createEventService();