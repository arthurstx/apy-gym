import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt.js'
import { CreateGyms } from './create-gyms.js'
import { searchGyms } from './search-gyms.js'
import { nearbyGyms } from './nearby-gyms.js'
import { verifyUserRole } from '../../middlewares/veiry-user-roles.js'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, CreateGyms)
  app.get('/gyms/search', searchGyms)
  app.get('/gyms/nearby', nearbyGyms)
}
