import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app.js'
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user.js'
import { prisma } from '../../../lib/prisma.js'

describe('Validate check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close
  })

  it('should be able to validate check-ins', async () => {
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
    const checkInResponse = await request(app.server)
      .post(`/check-ins/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 0,
        longitude: 0,
      })

    const { checkIn } = checkInResponse.body
    const checkInId = checkIn.id

    const response = await request(app.server)
      .patch(`/check-ins/${checkInId}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const checkInAfterValidate = await prisma.checkIn.findFirst({
      where: {
        id: checkInId,
      },
    })

    expect(response.statusCode).toEqual(204)
    expect(checkInAfterValidate).toEqual(
      expect.objectContaining({
        validated_at: expect.any(Date),
      })
    )
  })
})
