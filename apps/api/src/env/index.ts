import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PG_DATABASE_PASSWORD: z.string(),
  PG_DATABASE_USER: z.string(),
  PG_DATABASE_NAME: z.string(),
  DATABASE_DOCKER_PORT: z.coerce.number().default(5432),
  PORT: z.coerce.number().default(3333),
  JWT_PUBLIC_KEY: z.string(),
  JWT_PRIVATE_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
