import { z } from "zod";

export const createAccountSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Invalid email address").trim().toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phoneNumber: z.string().trim().optional(),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
