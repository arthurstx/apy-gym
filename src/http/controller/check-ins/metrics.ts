import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '../../../services/factories/make-get-user-metrics-use-case.js'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const gymsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await gymsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
