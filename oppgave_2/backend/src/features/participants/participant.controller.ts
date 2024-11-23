import { Hono } from "hono";
import { ParticipantService } from "./participant.service";
import { z } from "zod";


const ParticipantController = new Hono()

ParticipantController.get('/', async (c) => {
   const result = await ParticipantService.listParticipants()

   if (!result.success) {
      return c.json({success: false, error: result.error.message},500)
   }

      return c.json({ success: true, data: result.data }, 200)
})

ParticipantController.get('/:id', async (c) => {
   const id = c.req.param('id')
   const result = await ParticipantService.getParticipantById(id)

   if (!result.success) {
      return c.json({success: false, error: result.error.message},404)
   }

   return c.json({ success: true, data: result.data }, 200)
})

ParticipantController.post('/', async (c) => {
   try {
      const body = await c.req.json()
      console.log("Received participant data:", body)
      const response = await ParticipantService.createParticipant(body)

      if (!response.success) {
      return c.json({success: false, error: response.error.message},400)
      }
      
   return c.json({ success: true, data: response.data }, 201)
   } catch (error: any) {
      console.error("Error creating participant:", error)
      if (error instanceof z.ZodError) {
      return c.json({success: false, error: error.errors},400)
      }
      return c.json({ success: false, error: "Failed to create participant" }, 500)
   }
})

ParticipantController.patch('/:id', async (c) => {
   try {
      const id = c.req.param('id')
      const body = await c.req.json()
      
      console.log(`Received update data of participant id: ${id}:`, body)

      const response = await ParticipantService.updateParticipant(id, body)
      if (!response.success) {
         return c.json({success: false, error: response.error.message}, 400)
      }

      return c.json(response.data, 200)
   } catch (error: any) {
      console.error("Error updating participant data:", error)
      if (error instanceof z.ZodError) {
         return c.json({success: false, error: error.errors}, 400)
      }
         return c.json({success: false, error: "Failed to update participant"}, 500)
   }
})

ParticipantController.delete('/:id', async (c) => {
   const id = c.req.param('id')
   const result = await ParticipantService.deleteParticipant(id)

   if (!result.success) {
      return c.json({success: false, error: result.error.message}, 404)
   }
         return c.json({success: true, message: "Participant deleted successfully!"}, 200)
})

export default ParticipantController