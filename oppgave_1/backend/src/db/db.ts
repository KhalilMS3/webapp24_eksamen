import { env } from '../lib/env'
import Database from "better-sqlite3"
import {Database as dbBetterSqlite} from "better-sqlite3"

// Giving db a DataBase type to avoid fail of db type not handled by TypeScript
export const db: dbBetterSqlite = new Database(env.DATABASE_URL)
export type DB = typeof db;

export default db