import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { app } from '../../../app.js'
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user.js'
import { prisma } from '../../../lib/prisma.js'

describe('Check Ins count (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
    vi.useFakeTimers()
  })

  afterAll(async () => {
    await app.close
    vi.useRealTimers()
  })

  it('should be able to count check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'js gym-1',
        description: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      },
    })
    vi.setSystemTime(new Date(2025, 1, 10))
    await request(app.server)
      .post(`/check-ins/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 0,
        longitude: 0,
      })
    vi.setSystemTime(new Date(2025, 1, 11))
    await request(app.server)
      .post(`/check-ins/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 0,
        longitude: 0,
      })

    const response = await request(app.server)
      .get(`/check-ins/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { checkInsCount } = response.body

    expect(checkInsCount).toEqual(2)
    expect(response.statusCode).toEqual(200)
  })
})
