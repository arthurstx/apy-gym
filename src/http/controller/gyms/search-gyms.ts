import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeSearchGymsUseCase } from '../../../services/factories/make-search-gyms-use-case.js'

export async function searchGyms(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, query } = searchGymsBodySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    page,
    query,
  })

  return reply.status(200).send({ gyms })
}
