import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileUseCase } from '../../services/factories/make-get-user-profile-use-case.js'

export async function porfile(request: FastifyRequest, reply: FastifyReply) {
  const getUserPorfile = makeGetUserProfileUseCase()

  const { user } = await getUserPorfile.execute({
    userId: request.user.sub.toString(),
  })

  return reply.status(200).send({ user: { ...user, password_hash: undefined } })
}
