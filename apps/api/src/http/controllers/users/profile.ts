import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeGetUserProfileUseCase } from 'src/use-cases/users/factories/make-get-user-profile-use-case'

import { verifyJwt } from '@/http/middleware/verify-jwt'

import { userSchema } from './schemas/auth.schema'

export async function profile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(verifyJwt)
    .get(
      '/me',
      {
        schema: {
          tags: ['user'],
          summary: 'Get current user profile',
          security: [{ bearerAuth: [] }],
          response: {
            200: userSchema,
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const getUserProfile = makeGetUserProfileUseCase()

        const { user } = await getUserProfile.execute({
          userId,
        })

        return reply.status(200).send({
          user: {
            ...user,
          },
        })
      },
    )
}
