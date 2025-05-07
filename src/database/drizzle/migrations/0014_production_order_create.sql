CREATE TABLE IF NOT EXISTS "production-order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"machineId" uuid,
	"name" varchar(250)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "production-order" ADD CONSTRAINT "production-order_machineId_machines_id_fk" FOREIGN KEY ("machineId") REFERENCES "public"."machines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "registration";