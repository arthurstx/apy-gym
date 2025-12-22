import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export function checkIn(request: FastifyRequest, reply: FastifyReply) {
  const checkIn = z.object({})
}
