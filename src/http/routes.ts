import type { FastifyInstance } from 'fastify'
import { register } from './controller/register.js'
import { authenticate } from './controller/authenticate.js'
import { porfile } from './controller/porfile.js'
import { verifyJWT } from './middlewares/verify-jwt.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/authenticate', authenticate)

  /**Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, porfile)
}
