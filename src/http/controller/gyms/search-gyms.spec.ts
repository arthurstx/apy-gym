import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app.js'

describe('Search gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close
  })

  it('should be able to search gyms', async () => {
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

    await request(app.server)
      .post('/create-gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'js gym-1',
        description: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      })

    await request(app.server)
      .post('/create-gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'js gym-2',
        description: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      })

    const response = await request(app.server)
      .post('/search-gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: 'js gym',
        page: 1,
      })
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(2)
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'js gym-1' }),
        expect.objectContaining({ title: 'js gym-2' }),
      ])
    )
  })
})
