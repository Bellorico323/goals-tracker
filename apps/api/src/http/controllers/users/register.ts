import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { UserAlreadyExistsError } from 'src/use-cases/users/errors/user-already-exists-error'
import { makeRegisterUseCase } from 'src/use-cases/users/factories/make-register-use-case'
import { z } from 'zod'

export async function register(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['auth'],
        summary: 'Create a new account',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
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
