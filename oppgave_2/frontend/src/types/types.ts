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

export type Template = {
   id: string;
   title: string;
   description?: string;
   date_locked?: string[]; 
   no_overlapping_events: boolean;
   is_private: boolean;
   capacity?: number;
   price: number;
   has_waitlist: boolean;
   created_at: string;
   updated_at?: string;
};
