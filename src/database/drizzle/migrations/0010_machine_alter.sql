CREATE TYPE "public"."machine_status" AS ENUM('active', 'inactive');--> statement-breakpoint
ALTER TABLE "machines" RENAME COLUMN "sensorCode" TO "sensorIdentifier";--> statement-breakpoint
ALTER TABLE "machines" ADD COLUMN "sensorIdentifier2" varchar(250);--> statement-breakpoint
ALTER TABLE "machines" ADD COLUMN "status" "machine_status";--> statement-breakpoint
ALTER TABLE "machines" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "machines" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;