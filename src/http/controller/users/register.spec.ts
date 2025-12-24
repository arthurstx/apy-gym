import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app.js'

describe('register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/register').send({
      name: 'nome',
      email: 'email11@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
