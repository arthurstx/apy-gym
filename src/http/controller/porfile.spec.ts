import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app.js'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close
  })

  it('should be able get profile', async () => {
    const email = 'email11@example.com'
    const password = '123456'

    await request(app.server).post('/register').send({
      name: 'nome',
      email,
      password,
    })

    const authResponse = await request(app.server).post('/authenticate').send({
      email,
      password,
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email,
      })
    )
  })
})
