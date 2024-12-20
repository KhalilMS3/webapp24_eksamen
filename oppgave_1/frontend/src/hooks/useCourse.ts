import { BASE_URL } from '@/config/urls'
import { Course } from '@/types'
import React, { useEffect, useState } from 'react'

export default function useCourse() {
   
   const [courses, setCourses] = useState<Course[] | null>(null)
   const [loading, setLoading] = useState<boolean>(true)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
   const fetchCoursesFromServer = async () => {
      setLoading(true)
      setError(null)
      try {
         const response = await fetch(`${BASE_URL}/api/courses`)
         if (!response.ok) {
            console.log("Error fetching from Server", response.statusText)
         }
         const data: Course[] = await response.json()
         setCourses(data)
      } catch (error: any) {
         setError(error.message)
      } finally {
         setLoading(false)
      }
   }
      fetchCoursesFromServer()
   },[])
   
   return {courses, loading, error}
}
