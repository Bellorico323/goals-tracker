import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middleware/verify-jwt'

export async function refresh(app: FastifyInstance) {
  app.register(verifyJwt).patch('/token/refresh', async (request, reply) => {
    const userId = await request.getCurrentUserId()

    await request.jwtVerify({ onlyCookie: true })

    const token = await reply.jwtSign({
      sub: userId,
    })

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: userId,
        expiresIn: '7d',
      },
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  })
}
