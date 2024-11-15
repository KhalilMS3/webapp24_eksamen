import { BASE_URL } from '@/config/urls';
import { useState } from 'react';

export default function useUpdateCourseCategory() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateCategory = async (courseSlug: string, category: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/api/courses/${courseSlug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }),
      });

      if (!response.ok) {
        throw new Error('Failed to update course category');
      }

      const data = await response.json();
      setLoading(false);
      return { success: true, data };
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  return { updateCategory, loading, error };
}
