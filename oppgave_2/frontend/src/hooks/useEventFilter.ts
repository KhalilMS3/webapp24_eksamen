import { events } from '@/data/data'
import { EventType } from '@/types/types'
import { useMemo } from 'react'

type useEventFilterProps = {
   events:  Array<EventType>,
   month:   string | null,
   year:    string | null,
   type:    string | null,
   status:  string | null,
}
export default function useEventFilter(props: useEventFilterProps) {
   const {
      events, month, year, type, status
   } = props
   const filteredEvents = useMemo(() => {
      return events.filter(event => {
         const date = new Date(event.date)
         const ifMatchesMonth = month ? date.getMonth() + 1 === parseInt(month) : true
         const ifMatchesYear = year ? date.getFullYear() === parseInt(year) : true
         const ifMatchesType = type ? event.type === type : true
         const ifMatchesStatus = status ? event.status === status : true

         return ifMatchesMonth && ifMatchesYear && ifMatchesType && ifMatchesStatus
      })
   }, [month, year, type, status])

   return {filteredEvents}
}
