import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const EMAIL_EXAMPLE = 'johndoe@example.com'
  const PASSWORD_EXAMPLE = '123456'

  const existingUser = await prisma.user.findUnique({
    where: { email: EMAIL_EXAMPLE },
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: EMAIL_EXAMPLE,
        password: await hash(PASSWORD_EXAMPLE, 6),
      },
    })
  }

  const authResponse = await request(app.server).post('/sessions').send({
    email: EMAIL_EXAMPLE,
    password: PASSWORD_EXAMPLE,
  })

  const { token } = authResponse.body

  return { token }
}
