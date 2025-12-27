import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt.js'
import { createCheckIn } from './create.js'
import { history } from './history.js'
import { metrics } from './metrics.js'
import { validate } from './validate.js'
import { verifyUserRole } from '../../middlewares/veiry-user-roles.js'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/check-ins/:gymId/check-ins', createCheckIn)
  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate
  )
}
