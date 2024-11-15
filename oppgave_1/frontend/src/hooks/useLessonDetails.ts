import { Lesson } from "@/types"
import { useEffect, useState } from "react"

export default function useLessonDetails(courseSlug: string, lessonSlug: string) {
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSingleLesson = async () => {
    setLoading(true)
    setError(null)
    try {
      
    const result = await fetch(`/api/courses/${courseSlug}/${lessonSlug}`)
    if (!result.ok) {
      console.error("Error fetchin lesson,", result.statusText)
    }

    const data: Lesson = await result.json()

    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return {}
}
