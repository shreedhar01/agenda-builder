import z from "zod";

export const getAllAgendaItemSchema = z.object({
    agenda_id: z.number()
})
export type GetAllAgendaItemInput = z.infer<typeof getAllAgendaItemSchema>