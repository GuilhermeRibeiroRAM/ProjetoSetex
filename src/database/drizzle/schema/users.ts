import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 250 }),
  createdAt: timestamp().defaultNow(),
  email: varchar({ length: 250 }).unique(),
  password: varchar({ length: 250 }),
});
