import { BASE_URL } from "@/config/urls"
import { CommentType, Lesson } from "@/types"
import { useEffect, useState } from "react"
import useCourse from "./useCourse"

export default function useLessonDetails(courseSlug: string, lessonSlug: string) {
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [courseTitle, setCourseTitle] = useState<string | null>(null)
  const [courseCategory, setCourseCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const {courses} = useCourse()
  const fetchSingleLesson = async () => {
    setLoading(true)
    setError(null)
    try {
      
    const result = await fetch(`${BASE_URL}/api/courses/${courseSlug}/${lessonSlug}`)
    if (!result.ok) {
      console.error("Error fetchin lesson,", result.statusText)
    }

      const data = await result.json()
      if (data && data.success && data.data) {
        const lessonData = data.data

        
        const courseData = courses?.find((course) => course.id === lessonData.course_id)
        if (courseData) {
          
          setCourseTitle(courseData.title)
          setCourseCategory(courseData.category)
        }
        
        const parsedText = JSON.parse(lessonData.text)
        const parseComments = lessonData.comments.map((comment: any) => ({
          ...comment,
          createdBy: {
            id: comment.createdBy.id,
            name: comment.createdBy.name || "Ukjent bruker"
          }
        }))
        
        setLesson({
          ...lessonData,
          text: parsedText,
          comments: parseComments
        })
      } else {
        console.error("Invalid data structure from server")
      }
      console.log(data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (courseSlug && lessonSlug) {
      fetchSingleLesson()
    }
  }, [courseSlug, lessonSlug, courses])
  
  return {lesson, courseTitle, courseCategory, loading, error}
}
