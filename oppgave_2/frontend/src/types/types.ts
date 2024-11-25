export type EventType = {
   id: string,
   title: string,
   slug: string,
   description: string,
   date: string,
   location: string,
   type: string,
   capacity: number,
   price: number,
   is_private: boolean,
   waitlist_available: boolean,
   available_spots: number,
   status: string
}

export type ParticipantType = {
   id: string,
   name: string,
   email: string;
}