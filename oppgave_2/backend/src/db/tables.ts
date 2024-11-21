import { type DB } from "./db"

export const createTables = (db: DB) => {
   try {
      db.exec(`
         CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            description TEXT,
            date TEXT NOT NULL,
            location TEXT,
            type TEXT,
            capacity INTEGER,
            price REAL DEFAULT 0.0,
            is_private INTEGER DEFAULT 0,
            waitlist_available INTEGER DEFAULT 0,
            available_spots INTEGER,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
         );

         CREATE TABLE IF NOT EXISTS bookings (
            id TEXT PRIMARY KEY,
            event_id TEXT NOT NULL,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            total_price REAL,
            status TEXT DEFAULT "Pending",
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (event_id) REFERENCES events(id)
         );

         CREATE TABLE IF NOT EXISTS participants (
            id TEXT PRIMARY KEY,
            booking_id TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            waitlist_status INTEGER DEFAULT 0,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (booking_id) REFERENCES bookings(id)
         );

         `)
      console.log("Tables created successfully!")
   } catch (error) {
      console.error("Error creating tables:", error)
   }
}

export const dropTables = (db: DB) => {
   
}

export const deleteDatabaseContent = (db: DB) => {
   
}