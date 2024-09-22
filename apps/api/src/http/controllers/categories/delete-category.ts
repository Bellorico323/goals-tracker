import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '@/http/middleware/verify-jwt'
import { CategoryNotFoundError } from '@/use-cases/categories/errors/category-not-found-error'
import z from 'zod'
import { makeDeleteCategoryUseCase } from '@/use-cases/categories/factories/make-delete-category-use-case'

export async function deleteCategory(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(verifyJwt)
    .delete(
      '/category/:id',
      {
        schema: {
          tags: ['category'],
          summary: 'Delete a category',
          params: z.object({
            id: z.string(),
          }),
        },
      },

      async (request, reply) => {
        const { id } = request.params

        try {
          const deleteCategoryCase = makeDeleteCategoryUseCase()
          await deleteCategoryCase.execute({
            id,
          })

          return reply.status(200).send({
            message: 'Category deleted successfully',
          })
        } catch (err) {
          if (err instanceof CategoryNotFoundError) {
            return reply.status(404).send({ message: err.message })
          }

          return reply.status(500).send({ message: 'Internal server error' })
        }
      }
    )
}
