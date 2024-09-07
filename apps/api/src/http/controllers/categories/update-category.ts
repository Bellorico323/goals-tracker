import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createCategorySchema } from './schemas/categories.schema'
import { makeCreateCategoryUseCase } from '@/use-cases/categories/factories/make-create-category-use-case'
import { verifyJwt } from '@/http/middleware/verify-jwt'
import { CreateError } from './errors/create-error'
import { CategoryAlreadyExistsError } from '@/use-cases/categories/errors/category-already-exists-error'
import { CategoryNotFoundError } from '@/use-cases/categories/errors/category-not-found-error'
import { makeUpdateCategoryUseCase } from '@/use-cases/categories/factories/make-update-category-use-case'
import z from 'zod'

export async function create(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(verifyJwt)
    .put(
      '/category/:id',
      {
        schema: {
          tags: ['category'],
          summary: 'Update a category',
          body: createCategorySchema,
          params: z.object({
            id: z.string(),
          }),
        },
      },

      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { name, description } = request.body
        const { id } = request.params

        try {
          const createCategoryUseCase = makeUpdateCategoryUseCase()
          const category = await createCategoryUseCase.execute({
            name,
            description,
            userId,
            id,
          })

          return reply.status(201).send(category)
        } catch (err) {
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
