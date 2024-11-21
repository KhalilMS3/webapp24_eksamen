export type Event = {
   id: string,
   title: string,
   slug: string,
   description: string,
   date: string,
   location: string,
   type: string,
   capacity: number,
   price: number,
   isPrivate: boolean,
   waitlistAvailable: boolean,
   availableSpots: number,
   status: string
}