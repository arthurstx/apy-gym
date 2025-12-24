import type { FastifyInstance } from 'fastify'
import { register } from './register.js'
import { authenticate } from './authenticate.js'
import { porfile } from './porfile.js'
import { verifyJWT } from '../../middlewares/verify-jwt.js'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/authenticate', authenticate)

  /**Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, porfile)
}
