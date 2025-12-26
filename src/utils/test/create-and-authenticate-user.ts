import request from 'supertest'
import type { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const email = 'email11@example.com'
  const password = '123456'

  await request(app.server).post('/register').send({
    name: 'nome',
    email,
    password,
  })

  const authResponse = await request(app.server).post('/authenticate').send({
    email,
    password,
  })

  const { token } = authResponse.body

  return { token }
}
