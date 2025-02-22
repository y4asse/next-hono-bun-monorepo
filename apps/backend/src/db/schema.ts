import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  createdAt: timestamp().notNull().defaultNow(),
});
