import { z } from "zod";

export const createAccountSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.email("Invalid email address").trim().toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phoneNumber: z.string().trim().optional(),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;

export const loginUserSchema = z.object({
    email:z.email("Invalid email address").trim().toLowerCase(),
    password: z.string().min(6,"Password must be at least 6 characters long")
})

export type LoginUserInput = z.infer<typeof loginUserSchema>
