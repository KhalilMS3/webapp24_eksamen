import { Result } from "@/types";
import { Participant, participantSchema } from "./participant.schema";
import { z } from "zod";
import { STATUS_CODES } from "@/lib/error";
import { ParticipantRepository } from "./participant.repository";
import { randomUUID } from "crypto";
import {v4 as uuid} from "uuid"

class CreateParticipantService {

async listParticipants(): Promise<Result<Participant[]>> {
   return await ParticipantRepository.listParticipants();
}

async getParticipantById(id: string): Promise<Result<Participant>> {
   if (!id) {
      return {
      success: false,
      error: {
         code: STATUS_CODES.BAD_REQUEST,
         message: "Invalid participant ID",
      },
      };
   }
   return await ParticipantRepository.getParticipantById(id);
}

async createParticipant(data: any): Promise<Result<Participant>> {
   try {
      const id = data.id ? data.id : uuid()
      const parsedParticipantData = participantSchema.parse({ ...data, id });
      console.log("Validated participant data:", parsedParticipantData)
      return await ParticipantRepository.createParticipant(parsedParticipantData);
   } catch (error) {
      if (error instanceof z.ZodError) {
         console.log("validation failed:", error.errors)
      return {
         success: false,
         error: {
            code: STATUS_CODES.BAD_REQUEST,
            message: JSON.stringify(error.message),
         },
      };
      } else {
      return {
         success: false,
         error: {
            code: STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: `Failed to create participant: ${error}`,
         },
      };
      }
   }
}

async updateParticipant(id: string, data: any): Promise<Result<Participant>> {
   if (!id) {
      return {
      success: false,
      error: {
         code: STATUS_CODES.BAD_REQUEST,
         message: "Invalid participant ID",
      },
      };
   }

   try {
      const parsedParticipantData = participantSchema.parse(data);
      return await ParticipantRepository.updateParticipant(id, parsedParticipantData);
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
            message: `Failed to update participant: ${error}`,
         },
      };
      }
   }
}

async deleteParticipant(id: string): Promise<Result<null>> {
   if (!id) {
      return {
      success: false,
      error: {
         code: STATUS_CODES.BAD_REQUEST,
         message: "Invalid participant ID",
      },
      };
   }

   return await ParticipantRepository.deleteParticipant(id);
}
}

export const ParticipantService = new CreateParticipantService()
