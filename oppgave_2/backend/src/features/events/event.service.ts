import { Result } from "@/types";
import { Event, eventSchema, eventUpdateSchema } from "./event.schema";
import { EventRepository } from "./event.repository";
import { z } from "zod";
import { STATUS_CODES } from "@/lib/error";
import { randomUUID } from "crypto";


class createEventService {
   async listEvents(): Promise<Result<Event[]>>{
      return await EventRepository.listEvents()
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
   async createEvent(data: any): Promise<Result<Event>>{
      try {
         if (!data.id) {
            data.id = randomUUID()
         }
         const parsedEventData = eventSchema.parse(data)
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