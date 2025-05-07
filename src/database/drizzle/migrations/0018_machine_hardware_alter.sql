ALTER TYPE "public"."machine_hardware_status" RENAME TO "sensor_velocity_status";--> statement-breakpoint
ALTER TABLE "machine-hardware" RENAME TO "sensor-velocity";--> statement-breakpoint
ALTER TABLE "sensor-velocity" DROP CONSTRAINT "machine-hardware_machineId_machines_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sensor-velocity" ADD CONSTRAINT "sensor-velocity_machineId_machines_id_fk" FOREIGN KEY ("machineId") REFERENCES "public"."machines"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
