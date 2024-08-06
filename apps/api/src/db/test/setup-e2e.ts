import 'dotenv/config'

import { randomUUID } from 'crypto'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { Environment } from 'vitest/environments'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'drizzle',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    const connection = postgres(databaseURL, { max: 1 })
    await connection`CREATE SCHEMA IF NOT EXISTS ${schema}`
    await connection`SET search_path TO ${schema}`

    const db = drizzle(connection)
    await migrate(db, { migrationsFolder: 'drizzle' })

    return {
      async teardown() {
        await connection`DROP SCHEMA IF EXISTS ${schema} CASCADE`
        await connection.end()
      },
    }
  },
}
