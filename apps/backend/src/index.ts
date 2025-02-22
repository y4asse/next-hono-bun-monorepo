import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { todosTable } from './db/schema'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({
  origin: ['*'],
  allowMethods: ['*'],
  allowHeaders: ['*'],
}))

const todoSchema = z.object({
  title: z.string().min(2),
  description: z.string().nullable(),
})

const route = app
  .get('/hello', (c) => {
    return c.json({ message: 'Hello Hono!' })
  })
  .post('/todo', zValidator('json', todoSchema, (result, c) => {
    if (!result.success) {
      return c.text(result.error.issues[0].message, 400)
    }
  }),
    async (c) => {
      const { title, description } = c.req.valid('json')
      const client = postgres(c.env.DATABASE_URL, { prepare: false })
      const db = drizzle({ client })
      const todo = await db.insert(todosTable).values({ title, description }).returning()
      return c.json({ todo: todo[0] })
    })
  .get('/todos', async (c) => {
    const client = postgres(c.env.DATABASE_URL, { prepare: false })
    const db = drizzle({ client })
    const todos = await db.select().from(todosTable)
    if (!todos) {
      return c.text('Failed to fetch todos', 500)
    }
    return c.json({ todos })
  })
export type AppType = typeof route

export default app
