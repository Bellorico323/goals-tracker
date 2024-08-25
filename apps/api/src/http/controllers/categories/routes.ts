import { FastifyInstance } from 'fastify'
import { create } from './create-category'
import { get } from './get-categories'

export async function categoryRoutes(app: FastifyInstance) {
  app.register(create)
  app.register(get)
}
