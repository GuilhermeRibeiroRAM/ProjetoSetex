ALTER TYPE "public"."sensor_velocity_status" RENAME TO "sensor_status";--> statement-breakpoint
ALTER TABLE "sensor-velocity" RENAME TO "sensor-status";--> statement-breakpoint
ALTER TABLE "sensor-status" DROP CONSTRAINT "sensor-velocity_machineId_machines_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "machine_hardware_machine_index";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sensor-status" ADD CONSTRAINT "sensor-status_machineId_machines_id_fk" FOREIGN KEY ("machineId") REFERENCES "public"."machines"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sensor_status_machine_index" ON "sensor-status" USING btree ("machineId");