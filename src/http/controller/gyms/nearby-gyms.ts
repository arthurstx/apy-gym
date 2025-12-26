import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeFetchNearbyGymsUseCase } from '../../../services/factories/make-fetch-nearby-gyms-use-case.js'

export async function nearbyGyms(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsBodySchema.parse(request.body)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
