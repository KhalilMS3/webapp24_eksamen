import { DB } from "./db"
import { seed } from "./seed"
import { createTables, dropTables } from "./tables"

export const setup = async (db: DB) => {
   await createTables(db)
   // await dropTables(db)
   // await seed()
}