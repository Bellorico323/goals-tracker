import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

describe('Delete Category (e2e)', () => {
  let app: FastifyInstance
  let prisma: PrismaClient

  beforeAll(async () => {
    app = (await import('@/app.js')).app
    prisma = new PrismaClient()
    await app.ready()
  })

  afterAll(async () => {
    await prisma.$disconnect()
    await app.close()
  })

  test('should be able to delete a category', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const createdCategory = await prisma.category.create({
      data: {
        name: 'Category',
        description: 'Description',
        userId: user.id,
      },
    })

    await request(app.server)
      .delete(`/category/${createdCategory.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const categoryOnDatabase = await prisma.category.findUnique({
      where: { id: createdCategory.id },
    })

    expect(categoryOnDatabase).toBeNull()
  })
})
