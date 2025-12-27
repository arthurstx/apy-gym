import request from 'supertest'
import type { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma.js'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  const email = 'email11@example.com'
  const password = '123456'

  await prisma.user.create({
    data: {
      name: 'jhon doe',
      email,
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/authenticate').send({
    email,
    password,
  })

  const { token } = authResponse.body

  return { token }
}
