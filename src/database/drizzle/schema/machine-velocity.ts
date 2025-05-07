import { machines } from '@/database/drizzle/schema/machines';
import {
  doublePrecision,
  index,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const machineVelocity = pgTable(
  'machine-velocity',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    machineId: uuid().references(() => machines.id, { onDelete: 'cascade' }),
    sensorCode: varchar({ length: 250 }),
    velocity: doublePrecision(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      machineIndex: index('machine_velocity_machine_index').on(table.machineId),
    };
  },
);
