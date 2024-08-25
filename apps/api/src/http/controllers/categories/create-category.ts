import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createCategorySchema } from './schemas/categories.schema'
import { makeCreateCategoryUseCase } from '@/use-cases/categories/factories/make-create-category-use-case'
import { verifyJwt } from '@/http/middleware/verify-jwt'
import { CreateError } from './errors/create-error'
import { CategoryAlreadyExistsError } from '@/use-cases/categories/errors/category-already-exists-error'
import { CategoryNotFoundError } from '@/use-cases/categories/errors/category-not-found-error'

export async function create(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(verifyJwt)
    .post(
      '/category',
      {
        schema: {
          tags: ['category'],
          summary: 'Create a new category',
          body: createCategorySchema,
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { name, description } = request.body

        try {
          const createCategoryUseCase = makeCreateCategoryUseCase()
          const category = await createCategoryUseCase.execute({
            name,
            description,
            userId,
          })

          return reply.status(201).send(category)
        } catch (err) {
          if (err instanceof CreateError) {
            return reply.status(409).send({ message: err.message })
          }

          if (err instanceof CategoryAlreadyExistsError) {
            return reply.status(400).send({ message: err.message })
          }

          if (err instanceof CategoryNotFoundError) {
            return reply.status(404).send({ message: err.message })
          }

          return reply.status(500).send({ message: 'Internal server error' })
        }
      }
    )
}
