import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { InvalidCredentialsError } from 'src/use-cases/users/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from 'src/use-cases/users/factories/make-authenticate-use-case'

import {
  loginUserSchema,
  responseLoginUserFailureSchema,
  responseLoginUserSuccessSchema,
} from './schemas/auth.schema'

export async function authenticate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with e-mail and password',
        body: loginUserSchema,
        response: {
          201: responseLoginUserSuccessSchema,
          400: responseLoginUserFailureSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = loginUserSchema.parse(request.body)

      try {
        const authenticateUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUseCase.execute({
          email,
          password,
        })

        const token = await reply.jwtSign({
          sub: user.id,
        })

        return reply.status(200).send({ token })
      } catch (err) {
        if (err instanceof InvalidCredentialsError) {
          return reply.status(400).send({ message: err.message })
        }

        throw err
      }
    },
  )
}
