import z from "zod";
import { ClubRole } from "../common/enums.js";


export const createClubSchema = z.object({
    name: z.string().min(3, "Club name should be more then 3 character").max(255, "Club name should not be more then 255 character").trim(),
    region: z.string().min(3, "Region should be more then 3 character").max(255, "Club name should not be more then 255 character").trim(),
    district: z.string().min(3, "District should be more then 3 character").max(255, "Club name should not be more then 255 character").trim(),
    division: z.string().min(3, "Division should be more then 3 character").max(255, "Club name should not be more then 255 character").trim(),
    area: z.string().min(3, "Area should be more then 3 character").max(255, "Club name should not be more then 255 character").trim(),
    role_in_club: z.enum(ClubRole),
    
    // user_name: z.string().min(3, "Area should be more then 3 character").max(255, "Club name should not be more then 255 character").trim()
})
export type CreateClubInput = z.infer<typeof createClubSchema>


export const createMeetingSchema = z.object({
    club_id: z.number(),
    theme: z.string().min(3, "Club name should be more then 3 character").max(255, "Club name should not be more then 255 character").trim(),
    meeting_title: z.string().min(3, "Club name should be more then 3 character").max(255, "Club name should not be more then 255 character").trim(),
    start_time: z.iso.datetime(),
    end_time: z.iso.datetime(),
})
export type CreateMeetingInput = z.infer<typeof createMeetingSchema>


export const createAgendaItemSchema = z.object({
    agenda_id: z.number(),
    title: z.string().min(3, "Club name should be more then 3 character").max(255, "Club name should not be more then 255 character").trim(),
    start_time: z.number(),
    end_time: z.number()
})
export type CreateAgendaItemInput = z.infer<typeof createAgendaItemSchema>


export const createAgendaSchema = z.object({
    meeting_id: z.number(),
    // created_by: z.number(),
    agenda_title: z.string().min(3, "Club name should be more then 3 character").max(255, "Club name should not be more then 255 character").trim(),
    agenda_items: z.array(createAgendaItemSchema.omit({agenda_id:true}))
})
export type CreateAgendaInput = z.infer<typeof createAgendaSchema>