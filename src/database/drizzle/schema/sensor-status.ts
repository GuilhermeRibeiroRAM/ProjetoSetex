import { machines } from '@/database/drizzle/schema/machines';
import {
  index,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { SensorStatusEnum } from '@/business/enums/sensor-status.enum';

export const statusEnumValues = Object.values(SensorStatusEnum) as [
  string,
  ...string[],
];
export const sensorStatusEnum = pgEnum('sensor_status', statusEnumValues);

export const sensorStatus = pgTable(
  'sensor-status',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    machineId: uuid().references(() => machines.id, { onDelete: 'cascade' }),
    sensorIdentifier: varchar({ length: 250 }),
    status: sensorStatusEnum(),
    lastSensorCheck: timestamp().defaultNow().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      machineIndex: index('sensor_status_machine_index').on(table.machineId),
    };
  },
);
