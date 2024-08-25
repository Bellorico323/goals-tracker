import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

describe('Get Categories (e2e)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = (await import('@/app.js')).app

    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get categories', async () => {
    const { token } = await createAndAuthenticateUser(app)
    for (let i = 0; i < 10; i++) {
      await request(app.server)
        .post('/category')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: `Category Name ${i}`,
          description: `Category Description ${i}`,
        })
    }

    const response = await request(app.server)
      .get('/category')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
  })
})
