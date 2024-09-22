import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { authenticateWithGoogle } from './authenticate-with-google'
import { profile } from './profile'
import { register } from './register'

export async function userRoutes(app: FastifyInstance) {
  app.register(register)
  app.register(authenticate)
  app.register(authenticateWithGoogle)

  /** Authenticated */
  app.register(profile)
}
