ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2024-10-31T12:55:49.366Z';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(20);