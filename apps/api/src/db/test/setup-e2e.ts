import 'dotenv/config'

import { randomUUID } from 'node:crypto'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

function generateDatabaseURL() {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  return url.toString()
}

const schema = randomUUID()
let connection: postgres.Sql<Record<string, never>>

beforeAll(async () => {
  const databaseURL = generateDatabaseURL()

  connection = postgres(databaseURL, { max: 1 })
  await connection.unsafe(`CREATE SCHEMA IF NOT EXISTS "${schema}"`)
  await connection.unsafe(`SET search_path TO "${schema}"`)

  const db = drizzle(connection)
  await migrate(db, { migrationsFolder: 'drizzle' })
})

afterAll(async () => {
  // await connection.unsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
  await connection.end()
})
