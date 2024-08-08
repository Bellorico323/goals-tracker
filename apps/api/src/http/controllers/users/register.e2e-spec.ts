import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = (await import('@/app.js')).app

    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
