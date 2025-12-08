import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createAccountSchema,ApiError, ApiResponse } from "@agenda-builder/shared-types";
import { createUserService } from "../../services/auth.service.js";

//create user
export const createAccount = asyncHandler(async (req: Request, res: Response) => {
        const validationResult = createAccountSchema.safeParse(req.body);
        if (!validationResult.success) {
            throw new ApiError(400,"Validation Error",validationResult.error.issues);
        }

        const user = await createUserService(validationResult.data)
        if (!user){
            throw new ApiError(400,"User Creation fail");
        }

        return res.status(200).json(
            new ApiResponse(200,"user Created success")
        )
    },
);

//login user

//logout user
