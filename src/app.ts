import fastify from 'fastify'
import z, { ZodError } from 'zod'
import { env } from './env/index.js'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controller/users/routes.js'
import { gymRoutes } from './http/controller/gyms/routes.js'
import { checkInRoutes } from './http/controller/check-ins/routes.js'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

/**------ Routes ------*/
app.register(usersRoutes)
app.register(gymRoutes)
app.register(checkInRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: z.treeifyError(error) })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
