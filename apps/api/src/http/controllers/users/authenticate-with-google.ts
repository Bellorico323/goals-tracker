import { env } from '@goals/env'
import fastify, { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import {
  loginWithGoogleSchema,
  responseLoginUserFailureSchema,
  responseLoginUserSuccessSchema,
} from './schemas/auth.schema'

export async function authenticateWithGoogle(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/google',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with google',
        body: loginWithGoogleSchema,
        response: {
          201: responseLoginUserSuccessSchema,
          400: responseLoginUserFailureSchema,
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body
      const decodedCode = decodeURIComponent(code)

      const googleOAuthURL = new URL('https://oauth2.googleapis.com/token')

      googleOAuthURL.searchParams.set('client_id', env.GOOGLE_CLIENT_ID)

      googleOAuthURL.searchParams.set('client_secret', env.GOOGLE_CLIENT_SECRET)

      googleOAuthURL.searchParams.set('code', decodedCode)

      googleOAuthURL.searchParams.set('grant_type', 'authorization_code')

      googleOAuthURL.searchParams.set(
        'redirect_uri',
        env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI,
      )

      const googleAccessTokenResponse = await fetch(googleOAuthURL, {
        method: 'POST',
        headers: {
          Host: 'oauth2.googleapis.com',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      const googleAccessTokenData = await googleAccessTokenResponse.json()

      const { id_token: tokenId } = z
        .object({
          access_token: z.string(),
          expires_in: z.number(),
          token_type: z.string(),
          scope: z.string(),
          refresh_token: z.string(),
          id_token: z.string(),
        })
        .parse(googleAccessTokenData)

      const { email } = app.jwt.decode<{ email: string }>(tokenId)

      if (!email) {
        throw new Error('You must give us permission to get your e-mail')
      }

      reply.status(201).send({ token: 'ok' })
    },
  )
}
