import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { machines } from './machines';

export const productionOrder = pgTable('production-order', {
  id: uuid('id').defaultRandom().primaryKey(),
  machineId: uuid().references(() => machines.id, { onDelete: 'cascade' }),
  name: varchar({ length: 250 }),
});
