import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'

export async function userRoutes(app: FastifyInstance) {
  app.register(register)
  app.register(authenticate)

  /** Authenticated */
  app.register(profile)
}
