CREATE TYPE "public"."club_role" AS ENUM('SAA', 'Presiding Officer', 'General Evaluator', 'Toastmaster of the day', 'Grammarian', 'Ah-counter', 'Timer', 'Ballot Counter', 'Table Topic Master', 'Speaker', 'Speech Evaluator');--> statement-breakpoint
CREATE TABLE "agenda_item" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "agenda_item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"agenda_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "agendas" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "agendas_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"meeting_id" integer NOT NULL,
	"agenda_title" varchar(255) NOT NULL,
	"created_by" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clubs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "clubs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"region" varchar(255) NOT NULL,
	"district" varchar(255) NOT NULL,
	"division" varchar(255) NOT NULL,
	"area" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meetings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "meetings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"club_id" integer NOT NULL,
	"theme" varchar(255) NOT NULL,
	"meeting_title" varchar(255) NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "memberships" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "memberships_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" varchar(255) NOT NULL,
	"club_id" integer NOT NULL,
	"club_role" "club_role" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "agenda_item" ADD CONSTRAINT "agenda_item_agenda_id_agendas_id_fk" FOREIGN KEY ("agenda_id") REFERENCES "public"."agendas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendas" ADD CONSTRAINT "agendas_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendas" ADD CONSTRAINT "agendas_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_club_id_clubs_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;