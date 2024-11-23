import { EventType } from '@/types/types'
import { useMemo } from 'react'

type useEventFilterProps = {
   events:  Array<EventType>,
   month:   string | "",
   year:    string | "",
   type:    string | "",
   status: string | "",
   loading: boolean
}
export default function useEventFilter(props: useEventFilterProps) {
   const {
      events, month, year, type, status, loading
   } = props

   const filteredEvents = useMemo(() => {
      if (loading) {
         return events
      }
      if (!events || events.length === 0) {
      return []
      }
      return events.filter(event => {
         const date = new Date(event.date)
         const ifMatchesMonth = month && month !== "" ? date.getMonth() + 1 === parseInt(month) : true
         const ifMatchesYear = year && year !== "" ? date.getFullYear() === parseInt(year) : true
         const ifMatchesType = type && type !== "" ? event.type === type : true
         const ifMatchesStatus = status && status !== "" ? event.status === status : true

         return ifMatchesMonth && ifMatchesYear && ifMatchesType && ifMatchesStatus
      })
   }, [month, year, type, status, loading])

   return {filteredEvents}
}
