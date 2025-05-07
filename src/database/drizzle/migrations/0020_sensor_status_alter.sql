ALTER TABLE "public"."sensor-status" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."sensor_status";--> statement-breakpoint
CREATE TYPE "public"."sensor_status" AS ENUM('active', 'inactive', 'setup', 'maintenance', 'unsensed');--> statement-breakpoint
ALTER TABLE "public"."sensor-status" ALTER COLUMN "status" SET DATA TYPE "public"."sensor_status" USING "status"::"public"."sensor_status";