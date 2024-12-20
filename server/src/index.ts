import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import postRoutes from './routes/postRouter.js';
import userRoutes from './routes/userRouter.js';

const app = new Hono().basePath('/api')
app.route('/posts', postRoutes);
app.route('/user', userRoutes);


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3001
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
