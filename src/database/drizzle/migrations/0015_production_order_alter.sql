ALTER TABLE "machine-hardware" DROP CONSTRAINT "machine-hardware_machineId_machines_id_fk";
--> statement-breakpoint
ALTER TABLE "machine-velocity" DROP CONSTRAINT "machine-velocity_machineId_machines_id_fk";
--> statement-breakpoint
ALTER TABLE "production-order" DROP CONSTRAINT "production-order_machineId_machines_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "machine-hardware" ADD CONSTRAINT "machine-hardware_machineId_machines_id_fk" FOREIGN KEY ("machineId") REFERENCES "public"."machines"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "machine-velocity" ADD CONSTRAINT "machine-velocity_machineId_machines_id_fk" FOREIGN KEY ("machineId") REFERENCES "public"."machines"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "production-order" ADD CONSTRAINT "production-order_machineId_machines_id_fk" FOREIGN KEY ("machineId") REFERENCES "public"."machines"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
