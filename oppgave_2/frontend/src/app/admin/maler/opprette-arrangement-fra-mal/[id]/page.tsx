"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateEventForm from "@/components/event/CreateEventForm";
import { API_BASE } from "@/config/urls";

export default function Page() {
  const { id } = useParams()

  const [template, setTemplate] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/templates/${id}`);
        if (!response.ok) {
          console.error("Feil ved henting av malen!");
        }

         const result = await response.json();
        setTemplate(result.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  if (loading) {
    return <p>Laster inn mal...</p>;
  }

  if (error) {
    return <p>En feil oppsto ved lasting av mal: {error}</p>;
  }

  return (
      template && <CreateEventForm template={template} />
  );
}
