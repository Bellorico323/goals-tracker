import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export async function userRoutes(app: FastifyInstance) {
  app.register(register)
  app.register(authenticate)
  app.register(refresh)

  /** Authenticated */
  app.register(profile)
}
