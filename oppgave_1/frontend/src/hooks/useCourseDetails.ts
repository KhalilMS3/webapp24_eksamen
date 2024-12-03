import { BASE_URL } from '@/config/urls'
import { Course } from '@/types'
import { useEffect, useState } from 'react'

export default function useCourseDetails(courseSlug: string) {
   const [course, setCourse] = useState<Course | null>(null)
   const [loading, setLoading] = useState<boolean>(true)
   const [error, setError] = useState<string | null>(null)

   const fetchSingleCourse = async () => {
      setLoading(true)
      setError(null)
      try {
         const result = await fetch(`${BASE_URL}/api/courses/${courseSlug}`)
         if (!result.ok) {
            console.error("Error fetching course from server:", result.statusText)
         }
         
         const data: Course = await result.json()
         setCourse(data)
         
      } catch (error: any) {
         setError(error.message)
      } finally {
         setLoading(false)
      }
      }
   

   useEffect(() => {
      if (courseSlug) {
         fetchSingleCourse()
      }
   }
      , [courseSlug])
   
  return {course, loading, error}
}
