CREATE TABLE IF NOT EXISTS "machine-hardware" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "machine-hardware_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"machineId" uuid,
	"sensorCode" varchar(250),
	"status" varchar(250),
	"lastSensorCheck" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "machines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(250),
	"sensorCode" varchar(250)
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2025-01-16T15:11:11.987Z';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "machine-hardware" ADD CONSTRAINT "machine-hardware_machineId_machines_id_fk" FOREIGN KEY ("machineId") REFERENCES "public"."machines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "machine_index" ON "machine-hardware" USING btree ("machineId");