import { API_BASE } from '@/config/urls'
import { Template } from '@/types/types'
import React, { useEffect, useState } from 'react'

export default function useTemplate() {

   const [templates, setTemplates] = useState<Template[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      const fetchTemplatesFromServer = async () => {
         try {
            setLoading(true)
            const response = await fetch(`${API_BASE}/templates`)

            if (!response.ok) {
               setError("Kunne ikke hente maler fra serveren!")
            }
            const data = await response.json()
            setTemplates(data)
         } catch (error: any) {
            setError(error.message)
         } finally {
            setLoading(false)
         }
      }
   fetchTemplatesFromServer()
   },[])
  return {templates, loading, error}
}
