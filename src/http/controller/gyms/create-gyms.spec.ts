import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app.js'

describe('Create Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close
  })

  it('should be able to create gym', async () => {
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
      .post('/create-gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'js gym',
        description: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      })

    expect(response.statusCode).toEqual(201)
  })
})
