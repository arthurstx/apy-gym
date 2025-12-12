import { app } from './app.js'
import { env } from './env/index.js'

try {
  app
    .listen({
      host: '0.0.0.0',
      port: env.PORT,
    })
    .then(() => {
      console.log('✅ http server run')
    })
} catch (err) {
  console.log(err)
}
