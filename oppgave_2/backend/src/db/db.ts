import { env } from '../lib/env'
import Database from 'better-sqlite3'
import { Database as dbBetterSqlite } from "better-sqlite3"

export const db: dbBetterSqlite = new Database(env.DATABASE_URL)
export type DB = typeof db

export default db
