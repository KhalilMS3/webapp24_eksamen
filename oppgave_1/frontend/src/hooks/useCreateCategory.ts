import { BASE_URL } from "@/config/urls";
import { Course } from "@/types";
import { useState } from "react";

export default function useCreateCourse() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createCourse = async (courseData: Course) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        console.error("Failed to create course");
      }

       const result = await response.json()
      return { success: true, data: result };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { createCourse, loading, error };
}
