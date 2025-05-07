CREATE TABLE IF NOT EXISTS "machine-velocity" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "machine-velocity_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"machineId" uuid,
	"sensorCode" varchar(250),
	"velocity" double precision,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "machine_index";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "machine-velocity" ADD CONSTRAINT "machine-velocity_machineId_machines_id_fk" FOREIGN KEY ("machineId") REFERENCES "public"."machines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "machine_velocity_machine_index" ON "machine-velocity" USING btree ("machineId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "machine_hardware_machine_index" ON "machine-hardware" USING btree ("machineId");--> statement-breakpoint
ALTER TABLE "machine-hardware" DROP COLUMN IF EXISTS "velocity";