import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app.js'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close
  })

  it('should be able to register', async () => {
    const email = 'email11@example.com'
    const password = '123456'

    await request(app.server).post('/register').send({
      name: 'nome',
      email,
      password,
    })

    const response = await request(app.server).post('/authenticate').send({
      email,
      password,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
