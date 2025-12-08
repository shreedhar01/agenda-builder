import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createAccountSchema } from "@agenda-builder/shared-types";
import { createUserService } from "../../services/auth.service.js";

//create user
export const createAccount = asyncHandler(async (req: Request, res: Response) => {
        const validationResult = createAccountSchema.safeParse(req.body);
        if (!validationResult.success) {
            res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: validationResult.error.issues,
            });
            return;
        }
        const user = await createUserService(validationResult.data)

        if (!user){
            res.status(400).json({ 
                success: false,
                message: "Validation Error",
                errors: "something went wrong"
            });
            return;
        }
        res.status(400).json({
            success: true,
            message: "User Created success",
            data:{
                user: user.name
            }
        })
    },
);

//login user

//logout user
