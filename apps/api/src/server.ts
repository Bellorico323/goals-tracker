import { env } from '@goals/env'

import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running at http://localhost:3333')
  })
