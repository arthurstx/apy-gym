import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app.js'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close
  })

  it('should be abler efresh a token', async () => {
    const email = 'email11@example.com'
    const password = '123456'

    await request(app.server).post('/register').send({
      name: 'nome',
      email,
      password,
    })

    const authReponse = await request(app.server).post('/authenticate').send({
      email,
      password,
    })

    const cookies = authReponse.get('Set-Cookie')

    if (cookies) {
      const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookies)
        .send()

      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual({ token: expect.any(String) })
      expect(response.get('Set-Cookie')).toEqual([
        expect.stringContaining('refreshToken='),
      ])
    }
  })
})
