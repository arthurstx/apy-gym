import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app.js'
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user.js'

describe('Create Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close
  })

  it('should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

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
