import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeValidateCheckInUseCase } from '../../../services/factories/make-validate-check-in-use-case.js'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInBodySchema = z.object({
    checkInId: z.uuid(),
  })

  const { checkInId } = validateCheckInBodySchema.parse(request.params)

  const gymsUseCase = makeValidateCheckInUseCase()

  await gymsUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
