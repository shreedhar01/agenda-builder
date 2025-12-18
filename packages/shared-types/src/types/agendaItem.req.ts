import z from "zod";

export const getAllAgendaItemByAgendaIdSchema = z.object({
    agenda_id: z.number()
})
export type GetAllAgendaItemInput = z.infer<typeof getAllAgendaItemByAgendaIdSchema>

export const getAllAgendaItemByClubIdSchema = z.object({
    club_id: z.number()
})
export type GetAllAgendaItemByClubIdInput = z.infer<typeof getAllAgendaItemByClubIdSchema>

export const getAllAgendaItemByMeetingIdSchema = z.object({
    meeting_id: z.number()
})
export type GetAllAgendaItemByMeetingIdInput = z.infer<typeof getAllAgendaItemByMeetingIdSchema>