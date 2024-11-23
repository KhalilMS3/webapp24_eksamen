import { Result } from "@/types";
import { Booking, bookingSchema } from "./booking.schema";
import { BookingRepository } from "./booking.repository";
import { z } from "zod";
import { STATUS_CODES } from "@/lib/error";
import { randomUUID } from "crypto";

class CreateBookingService {

async listBookings(): Promise<Result<Booking[]>> {
   return await BookingRepository.listBookings();
}

async getBookingById(id: string): Promise<Result<Booking>> {
   if (!id) {
   return {
      success: false,
      error: {
         code: STATUS_CODES.BAD_REQUEST,
         message: "Invalid booking ID",
      },
   };
   }
   return await BookingRepository.getBookingById(id);
}

async createBooking(data: any): Promise<Result<Booking>> {
   try {
      const id = data.id ? data.id : randomUUID()
   const parsedBookingData = bookingSchema.parse({...data, id});
   return await BookingRepository.createBooking(parsedBookingData);
   } catch (error) {
   if (error instanceof z.ZodError) {
      return {
         success: false,
         error: {
         code: STATUS_CODES.BAD_REQUEST,
         message: JSON.stringify(error.errors),
         },
      };
   } else {
      return {
         success: false,
         error: {
         code: STATUS_CODES.INTERNAL_SERVER_ERROR,
         message: `Failed to create booking: ${error}`,
         },
      };
   }
   }
}

async updateBooking(id: string, data: any): Promise<Result<Booking>> {
   if (!id) {
   return {
      success: false,
      error: {
         code: STATUS_CODES.BAD_REQUEST,
         message: "Invalid booking ID",
      },
   };
   }

   try {
   const parsedBookingData = bookingSchema.parse(data);
   return await BookingRepository.updateBooking(id, parsedBookingData);
   } catch (error) {
   if (error instanceof z.ZodError) {
      return {
         success: false,
         error: {
         code: STATUS_CODES.BAD_REQUEST,
         message: JSON.stringify(error.errors),
         },
      };
   } else {
      return {
         success: false,
         error: {
         code: STATUS_CODES.INTERNAL_SERVER_ERROR,
         message: `Failed to update booking: ${error}`,
         },
      };
   }
   }
}

async deleteBooking(id: string): Promise<Result<null>> {
   if (!id) {
   return {
      success: false,
      error: {
         code: STATUS_CODES.BAD_REQUEST,
         message: "Invalid booking ID",
      },
   };
   }

   return await BookingRepository.deleteBooking(id);
}
}

export const BookingService = new CreateBookingService()
