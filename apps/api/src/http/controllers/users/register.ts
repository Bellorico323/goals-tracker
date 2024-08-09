import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { UserAlreadyExistsError } from 'src/use-cases/users/errors/user-already-exists-error'
import { makeRegisterUseCase } from 'src/use-cases/users/factories/make-register-use-case'

import { createUserSchema } from './schemas/auth.schema'

export async function register(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['auth'],
        summary: 'Create a new account',
        body: createUserSchema,
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
          name,
          email,
          password,
        })
      } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
          return reply.status(409).send({ message: err.message })
        }

        throw err
      }

      return reply.status(201).send()
    },
  )
}
