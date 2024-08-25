import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

describe('Create Category (e2e)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = (await import('@/app.js')).app

    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a category', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const response = await request(app.server)
      .post('/category')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Category Name',
        description: 'Category Description',
      })

    expect(response.statusCode).toEqual(201)
  })
})
