import { FastifyInstance } from 'fastify'
import { create } from './create-category'
import { get } from './get-categories'
import { update } from './update-category'
import { deleteCategory } from './delete-category'

export async function categoryRoutes(app: FastifyInstance) {
  app.register(create)
  app.register(get)
  app.register(update)
  app.register(deleteCategory)
}
