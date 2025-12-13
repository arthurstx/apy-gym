import type { FastifyInstance } from 'fastify'
import { register } from './controller/register.js'
import { authenticate } from './controller/authenticate.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/authenticate', authenticate)
}
