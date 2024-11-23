import { Hono } from "hono";
import { BookingService } from "./booking.service";
import { z } from "zod";


const BookingController = new Hono()

BookingController.get('/', async (c) => {
   const result = await BookingService.listBookings()

   if (!result.success) {
      return c.json({success: false, error: result.error.message},500)
   }

      return c.json({ success: true, data: result.data }, 200)
})

BookingController.get('/:id', async (c) => {
   const id = c.req.param('id')
   const result = await BookingService.getBookingById(id)

   if (!result.success) {
      return c.json({success: false, error: result.error.message},404)
   }

   return c.json({ success: true, data: result.data }, 200)
})

BookingController.post('/', async (c) => {
   try {
      const body = await c.req.json()
      console.log("Received booking data:", body)
      const response = await BookingService.createBooking(body)

      if (!response.success) {
      return c.json({success: false, error: response.error.message},400)
      }
      
   return c.json({ success: true, data: response.data }, 201)
   } catch (error: any) {
      console.error("Error creating booking:", error)
      if (error instanceof z.ZodError) {
      return c.json({success: false, error: error.errors},400)
      }
      return c.json({ success: false, error: "Failed to create booking" }, 500)
   }
})

BookingController.patch('/:id', async (c) => {
   try {
      const id = c.req.param('id')
      const body = await c.req.json()
      
      console.log(`Received update data of booking id: ${id}:`, body)

      const response = await BookingService.updateBooking(id, body)
      if (!response.success) {
         return c.json({success: false, error: response.error.message}, 400)
      }

      return c.json(response.data, 200)
   } catch (error: any) {
      console.error("Error updating booking data:", error)
      if (error instanceof z.ZodError) {
         return c.json({success: false, error: error.errors}, 400)
      }
         return c.json({success: false, error: "Failed to update booking"}, 500)
   }
})

BookingController.delete('/:id', async (c) => {
   const id = c.req.param('id')
   const result = await BookingService.deleteBooking(id)

   if (!result.success) {
      return c.json({success: false, error: result.error.message}, 404)
   }
         return c.json({success: true, message: "Booking deleted successfully!"}, 200)
})

export default BookingController