import z from "zod";

export const getAllClubsSchema = z.object({
    user_name: z.string().min(3, "Area should be more then 3 character").max(255, "Club name should not be more then 255 character").trim()
})
export type GetAllClubsInput = z.infer<typeof getAllClubsSchema>