import { useState, useEffect } from "react";
import { API_BASE } from "@/config/urls";
import { Participant } from "@/types/types";

type UseParticipantResult = {
  participants: Participant[];
  loading: boolean;
  error: string | null;
}

export function useParticipant(eventId: string): UseParticipantResult {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/participants/event/${eventId}`);
        if (!response.ok) {
          setError("Failed to fetch participants");
        }
        const data = await response.json();
        setParticipants(data.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchParticipants();
    }
  }, [eventId]);

  return { participants, loading, error };
}
