import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Get user profile (e2e)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = (await import('@/app.js')).app

    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('[GET] /me', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      user: expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    })
  })
})
