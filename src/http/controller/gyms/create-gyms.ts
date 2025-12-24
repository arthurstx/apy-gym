import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreateGymUseCase } from '../../../services/factories/make-create-gym-use-case.js'

export async function CreateGyms(request: FastifyRequest, reply: FastifyReply) {
  const createGymsBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, latitude, longitude, phone } =
    createGymsBodySchema.parse(request.body)

  const createGymsUseCase = makeCreateGymUseCase()

  await createGymsUseCase.execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  })

  return reply.status(200).send()
}
