import { Hono } from "hono";
import { EventService } from "./event.service";
import { z } from "zod";
import { error } from "console";

const EventController = new Hono()

EventController.get('/', async (c) => {
   const result = await EventService.listEvents()

   if (!result.success) {
      return c.json({success: false, error: result.error.message}, 500)
   }
   return c.json(result.data, 200)
})

EventController.get('/:slug', async (c) => {
   const slug = c.req.param('slug')

   const result = await EventService.getEventBySlug(slug)
   if (!result.success) {
      return c.json({success: false, error: result.error.message}, 404)
   } 
   return c.json({ success: true, data: result.data }, 200)
})

EventController.post('/', async (c) => {
   try {
      const body = await c.req.json()
      console.log("Received event data:", body)

      const response = await EventService.createEvent(body)

      if (!response.success) {
         return c.json({ success: false, error: response.error.message })
      }
      return c.json({success: true, data: response.data}, 201)
   } catch (error) {
      console.error("Error creating project:", error)
      if (error instanceof z.ZodError) {
         return c.json({success: false, error: error.errors}, 400)
      }
      return c.json({success: false, error: "Failed to create event"}, 500)
   }
})

EventController.patch('/:id', async (c) => {
   try {
      const id = c.req.param('id')
      const body = await c.req.json()
      console.log("Received update data:", body)

      const response = await EventService.updateEvent(id, body)

      if (!response.success) {
         return c.json({success: false, error: response.error.message})
      }
      return c.json({success: true, data: response.data }, 200)
   } catch (error) {
      console.error("Error updating event:", error);
      if (error instanceof z.ZodError) {
         return c.json({ success: false, error: error.errors }, 400)
      }
      return c.json({ success: false, error: "Failed to update project" }, 400)
   }
})
EventController.delete('/:slug', async (c) => {
   try {
      const slug = c.req.param('slug')
      const response = await EventService.deleteEvent(slug)
      if (!response.success) {
         return c.json({success: false, error: response.error.message}, 404)
      }
         return c.json({success: true, message: "Event deleted successfully!"}, 200)
   } catch (error) {
      console.error("Error deleting event:", error);
      if (error instanceof z.ZodError) {
      return c.json({ success: false, error: error.errors }, 400);
   }
      return c.json({ success: false, error: "Failed to delete event" }, 500);
   }
})

export default EventController