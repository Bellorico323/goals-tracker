import { verifyJwt } from '@/http/middleware/verify-jwt'
import { makeListCategoriesByUserIdUseCase } from '@/use-cases/categories/factories/make-list-categories-by-userid-use-case'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function get(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(verifyJwt)
    .get(
      '/category',
      {
        schema: {
          tags: ['category'],
          summary: 'Create a new category',
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        try {
          const createCategoryUseCase = makeListCategoriesByUserIdUseCase()
          const categories = await createCategoryUseCase.execute({
            userId,
          })

          return reply.status(200).send(categories)
        } catch (err) {
          return reply.status(500).send({ message: 'Internal server error' })
        }
      }
    )
}
