import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const machineStatus = pgEnum('machine_status', [
  'active',
  'inactive',
  'setup',
  'maintenance',
  'unsensed',
]);

export const machines = pgTable('machines', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 250 }),
  sensorIdentifier: varchar({ length: 250 }),
  sensorIdentifier2: varchar({ length: 250 }),
  status: machineStatus().default('inactive'),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
