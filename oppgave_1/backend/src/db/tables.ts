import type { DB } from "./db";

export const createTables = (db: DB) => {
   console.log("Starting table creation...")
   try {
      db.exec(`
         CREATE TABLE IF NOT EXISTS Course(
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT NOT NULL,
            description TEXT,
            category TEXT
            );
            
            CREATE TABLE IF NOT EXISTS Lesson(
               id TEXT PRIMARY KEY,
               course_id TEXT,
               title TEXT NOT NULL,
               slug TEXT NOT NULL,
               description TEXT,
               text JSON,
               FOREIGN KEY (course_id) REFERENCES Course(id) ON DELETE CASCADE
               );
               
               CREATE TABLE IF NOT EXISTS Comment (
                  id TEXT PRIMARY KEY,
                  lesson_slug TEXT,
                  created_by TEXT NOT NULL,
      comment TEXT NOT NULL,
      FOREIGN KEY (lesson_slug) REFERENCES Lesson(id) ON DELETE CASCADE
      );
      `)

   console.log("Tables created successfully.")
      
      
   } catch (error) {
      console.error("Error creating tables:", error)
   }
   }