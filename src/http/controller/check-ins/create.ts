import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCheckInUseCase } from '../../../services/factories/make-check-in-use-case.js'

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const gymsUseCase = makeCheckInUseCase()

  const { checkIn } = await gymsUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ checkIn })
}
