import { z } from "zod";


export const participantSchema = z.object({
  id: z.string().uuid(),
  booking_id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  waitlist_status: z.boolean(),
  status: z.enum(["Pending", "Approved", "Rejected"]).default("Pending"),
  created_at: z.string().optional(), 
});
export const updateParticipantSchema = z.object({
  status: z.enum(["Pending", "Approved", "Rejected"])
})
export const participantSchemaDB = participantSchema.extend({
  waitlist_status: z.number(),
});

export const participantFromDB = (
  participant: z.infer<typeof participantSchemaDB>
): z.infer<typeof participantSchema> => {
  return {
    ...participant,
    waitlist_status: participant.waitlist_status === 1,
  };
};

export const participantToDB = (
  participant: z.infer<typeof participantSchema>
): z.infer<typeof participantSchemaDB> => {
  return {
    ...participant,
    waitlist_status: participant.waitlist_status ? 1 : 0,
  };
};

export type Participant = z.infer<typeof participantSchema>;
export type ParticipantDB = z.infer<typeof participantSchemaDB>;


export const validateParticipant = (data: unknown) => {
  const result = participantSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: {
        message: "Validation error of participant",
        details: result.error.errors,
      },
    };
  }
  return { success: true, data: result.data };
};


export const validateParticipantDB = (data: unknown) => {
  const result = participantSchemaDB.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: {
        message: "Validation error of participant in database",
        details: result.error.errors, 
      },
    };
  }
  return { success: true, data: result.data };
};
