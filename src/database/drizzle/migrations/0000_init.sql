CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(250),
	"nickname" varchar(250),
	"email" varchar(250),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
