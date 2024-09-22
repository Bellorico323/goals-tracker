import { env } from '@goals/env'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeAuthenticateWithGoogleUseCase } from '@/use-cases/users/factories/make-authenticate-with-oauth-use-case'
import { decodeJwt } from '@/utils/decode-jwt'

import {
  loginWithGoogleSchema,
  responseLoginUserFailureSchema,
  responseLoginUserSuccessSchema,
} from './schemas/auth.schema'

interface googlePayload {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  at_hash: string
  name: string
  picture: string
  given_name: string
  iat: number
  exp: number
}

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

      console.log({ code })

      console.log(googleAccessTokenData)

      const googleResponse = z
        .object({
          access_token: z.string(),
          expires_in: z.number(),
          token_type: z.string(),
          scope: z.string(),
          refresh_token: z.string(),
          id_token: z.string(),
        })
        .parse(googleAccessTokenData)

      const { id_token: googleData } = googleResponse

      const {
        email,
        name,
        picture: avatarUrl,
        sub: providerAccountId,
      } = decodeJwt<googlePayload>(googleData)

      const authenticateWithGoogle = makeAuthenticateWithGoogleUseCase()

      const { user } = await authenticateWithGoogle.execute({
        name,
        email,
        avatarUrl,
        providerAccountId,
      })

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      reply.status(201).send({ token })
    },
  )
}
