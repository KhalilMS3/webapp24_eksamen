import { BASE_URL } from '@/config/urls'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function useDeleteCourse() {
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)
   const router = useRouter()
   const deleteCourse = async (courseSlug: string) => {
      setLoading(true)
      setError(null)
      try {
      const response = await fetch(`${BASE_URL}/api/courses/${courseSlug}`,
         {
            method: "DELETE"
         })
      
         if (!response.ok) {
            console.error("Faild to delete course,", response.statusText)
         }  
         
         setTimeout(() => {
         router.push("/courses");
      }, 500);
      
   } catch (error: any) {
      setError(error.message)
      } finally {
         setLoading(false)
   }
}
  return {deleteCourse, loading, error}
}
