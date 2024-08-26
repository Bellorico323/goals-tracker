import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    PG_DATABASE_PASSWORD: z.string(),
    PG_DATABASE_USER: z.string(),
    PG_DATABASE_NAME: z.string(),
    DATABASE_DOCKER_PORT: z.coerce.number().default(5432),
    SERVER_PORT: z.coerce.number().default(3333),
    JWT_PUBLIC_KEY: z.string(),
    JWT_PRIVATE_KEY: z.string(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_OAUTH_CLIENT_REDIRECT_URI: z.string(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    PG_DATABASE_PASSWORD: process.env.PG_DATABASE_PASSWORD,
    PG_DATABASE_USER: process.env.PG_DATABASE_USER,
    PG_DATABASE_NAME: process.env.PG_DATABASE_NAME,
    DATABASE_DOCKER_PORT: process.env.DATABASE_DOCKER_PORT,
    SERVER_PORT: process.env.PORT,
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_OAUTH_CLIENT_REDIRECT_URI:
      process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI,
  },
  emptyStringAsUndefined: true,
})
