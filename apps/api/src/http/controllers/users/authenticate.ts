import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { InvalidCredentialsError } from 'src/use-cases/users/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from 'src/use-cases/users/factories/make-authenticate-use-case'
import { z } from 'zod'

export async function authenticate(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with e-mail and password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { email, password } = authenticateBodySchema.parse(request.body)

      try {
        const authenticateUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUseCase.execute({
          email,
          password,
        })

        const token = await reply.jwtSign({
          sub: user.id,
        })

        const refreshToken = await reply.jwtSign({
          sub: user.id,
          expiresIn: '7d',
        })

        return reply
          .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
          })
          .status(200)
          .send({ token })
      } catch (err) {
        if (err instanceof InvalidCredentialsError) {
          return reply.status(400).send({ message: err.message })
        }

        throw err
      }
    },
  )
}
