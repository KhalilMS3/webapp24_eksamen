import { Result } from "@/types";
import { Participant, participantFromDB, participantToDB } from "./participant.schema";
import db from "@/db/db";

type ParticipantRepository = {
  listParticipants: () => Promise<Result<Participant[]>>;
  getEventParticipants: (eventId: string) => Promise<Result<Participant[]>>;
  getParticipantById: (id: string) => Promise<Result<Participant>>;
  createParticipant: (data: Participant) => Promise<Result<Participant>>;
  updateParticipant: (id: string, data: Participant) => Promise<Result<Participant>>;
  deleteParticipant: (id: string) => Promise<Result<null>>;
};

export const createParticipantRepository = (db: any): ParticipantRepository => {
  return {
    listParticipants: async (): Promise<Result<Participant[]>> => {
      try {
        const stmt = db.prepare(`
          SELECT * FROM participants
        `);
        const rows = stmt.all();
        const participants = rows.map(participantFromDB);

        return { success: true, data: participants };
      } catch (error: any) {
        console.error("Error listing participants:", error);
        return { success: false, error: error.message };
      }
    },

    getEventParticipants: async (eventId: string): Promise<Result<Participant[]>> => { 
      try {
        const stmt = db.prepare(`
            SELECT participants.*
      FROM bookings
      JOIN participants ON participants.booking_id = bookings.id
      WHERE bookings.event_id = ?
          `)
        
        const participants = stmt.all(eventId)
        return {success: true, data: participants}
      } catch (error: any) {
        console.error("Error fetching event participants: ", error)
        return { success: false, error: error.message }
      }
    },

    getParticipantById: async (id: string): Promise<Result<Participant>> => {
      try {
        const stmt = db.prepare(`
          SELECT * FROM participants WHERE id = ?
        `);
        const row = stmt.get(id);
        if (!row) {
          return {
            success: false,
            error: {
              code: "404",
              message: "Participant not found",
            },
          };
        }

        const participant = participantFromDB(row);
        return { success: true, data: participant };
      } catch (error: any) {
        console.error("Error fetching participant by id:", error);
        return { success: false, error: error.message };
      }
    },

    createParticipant: async (data: Participant): Promise<Result<Participant>> => {
      try {
        const participantData = participantToDB(data);
        console.log("Data to be saved i database:", participantData)
        const stmt = db.prepare(`
          INSERT INTO participants (
            id, booking_id, name, email, waitlist_status, status, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `);

        stmt.run(
          participantData.id,
          participantData.booking_id,
          participantData.name,
          participantData.email,
          participantData.waitlist_status,
          participantData.status
        );

        return { success: true, data };
      } catch (error: any) {
        console.error("Error creating participant:", error);
        return { success: false, error: error.message };
      }
    },

    updateParticipant: async (id: string, data: Participant): Promise<Result<Participant>> => {
      try {
        const participantData = participantToDB(data);
        const stmt = db.prepare(`
          UPDATE participants
          SET status = ?
          WHERE id = ?
        `);

        stmt.run(
          
          participantData.status,
          id
        );

        return { success: true, data };
      } catch (error: any) {
        console.error("Error updating participant:", error);
        return { success: false, error: error.message };
      }
    },

    deleteParticipant: async (id: string): Promise<Result<null>> => {
      try {
        const stmt = db.prepare(`
          DELETE FROM participants WHERE id = ?
        `);
        
        const result = stmt.run(id);
        if (result.changes === 0) {
          return {
            success: false,
            error: {
              code: "404",
              message: "Participant not found",
            },
          };
        }

        return { success: true, data: null };
      } catch (error: any) {
        console.error("Error deleting participant:", error);
        return { success: false, error: error.message };
      }
    },
  };
};

export const ParticipantRepository = createParticipantRepository(db)