import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCheckInUseCase } from '../../../services/factories/make-check-in-use-case.js'
import { ResourceNotFound } from '../../../services/errors/resource-not-found-error.js'
import { MaxDistanceError } from '../../../services/errors/max-distance-error.js'
import { MaxNumberOfCheckInsError } from '../../../services/errors/max-number-of-check-ins-error.js'

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string(),
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

  try {
    const { checkIn } = await gymsUseCase.execute({
      userId: request.user.sub,
      gymId,
      userLatitude: latitude,
      userLongitude: longitude,
    })
    return reply.status(201).send({ checkIn })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    } else if (error instanceof MaxDistanceError) {
      return reply.status(403).send({ message: error.message })
    } else if (error instanceof MaxNumberOfCheckInsError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
