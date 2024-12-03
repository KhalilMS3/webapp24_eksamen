import { DB } from "./db";
import { seedDatabase } from "./seed";
import { createTables, deleteContent, dropTables } from "./tables";

export const setup = async (db: DB) =>{
      // await createTables(db)
      await seedDatabase()
      // await deleteContent(db)
      // await dropTables(db)
}