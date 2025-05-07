CREATE TYPE "public"."machine_hardware_status" AS ENUM('working', 'crashed');--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "machine-hardware" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "machine-hardware" ADD "status" machine_hardware_status;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT now();