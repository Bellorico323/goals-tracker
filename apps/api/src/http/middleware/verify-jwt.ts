import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { UnauthorizedError } from '../controllers/users/errors/unauthorized-error'

export const verifyJwt = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch (err) {
        throw new UnauthorizedError('Invalid auth token')
      }
    }
  })
})
