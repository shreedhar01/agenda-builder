import { relations } from "drizzle-orm";
import { pgTable, varchar, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import {ClubRole} from "@repo/shared-types"

export const clubRoleEnum = pgEnum(
  "club_role",
  Object.values(ClubRole) as [string, ...string[]]
)

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone_number: varchar("phone_number", { length: 50 }),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const clubs = pgTable("clubs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({length:255}).notNull(),
  region: varchar({ length: 255 }).notNull(),
  district: varchar({ length: 255 }).notNull(),
  division: varchar({ length: 255 }).notNull(),
  area: varchar({ length: 255 }).notNull()
})

export const memberships = pgTable("memberships", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: varchar({length:255}).notNull(), //if not register user then user name
  club_id: integer().notNull().references(()=> clubs.id,{onDelete:"cascade"}),
  role_in_club: clubRoleEnum("club_role").notNull()
})

export const meetings = pgTable("meetings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  club_id: integer().notNull().references(()=>clubs.id,{onDelete:"cascade"}),
  theme: varchar({ length: 255 }).notNull(),
  meeting_title: varchar({ length: 255 }).notNull(),
  start_time: timestamp("start_time").notNull(),
  end_time: timestamp("end_time").notNull()
})

export const agendas = pgTable("agendas", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  meeting_id: integer().notNull().references(()=>meetings.id,{onDelete:"cascade"}),
  agenda_title: varchar({ length: 255 }).notNull(),
  created_by: integer().notNull().references(()=> users.id,{onDelete:"set null"}) //user id
})

export const agenda_item = pgTable("agenda_item", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  agenda_id: integer().notNull().references(()=>agendas.id,{onDelete:"cascade"}),
  title: varchar({ length: 255 }).notNull(),
  start_time: integer().notNull(),
  end_time: integer().notNull()
})





export const usersRelation = relations(users, ({ many }) => ({
  memberships: many(memberships),
  agendas: many(agendas)
}))

export const clubsRelation = relations(clubs, ({ many }) => ({
  memberships: many(memberships),
  meetings: many(meetings)
}))

export const membershipsRelation = relations(memberships, ({ one }) => ({
  users: one(users, {
    fields: [memberships.user_id],
    references: [users.id]
  }),
  clubs: one(clubs, {
    fields: [memberships.club_id],
    references: [clubs.id]
  })
}))

export const meetingRelation = relations(meetings, ({ one, many }) => ({
  clubs: one(clubs, {
    fields: [meetings.club_id],
    references: [clubs.id]
  }),
  agendas: many(agendas)
}))

export const agendasRelation = relations(agendas, ({ one, many }) => ({
  users: one(users, {
    fields: [agendas.created_by],
    references: [users.id]
  }),
  meetings: one(meetings, {
    fields: [agendas.meeting_id],
    references: [meetings.id]
  }),
  agendaItem: many(agenda_item)
}))

export const agendasItemsRelation = relations(agenda_item, ({ one }) => ({
  agendas: one(agendas, {
    fields: [agenda_item.agenda_id],
    references: [agendas.id]
  })
}))