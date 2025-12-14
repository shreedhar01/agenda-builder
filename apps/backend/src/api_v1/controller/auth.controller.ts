import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createAccountSchema, ApiError, ApiResponse, loginUserSchema } from "@repo/shared-types";
import { createUserService, loginUserService } from "../../services/auth.service.sql.js";

//create user
export const createAccount = asyncHandler(async (req: Request, res: Response) => {
    const validationResult = createAccountSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new ApiError(400, "Validation Error", validationResult.error.issues);
    }

    const token = await createUserService(validationResult.data)
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
        maxAge: Number(process.env.JWT_LIFE) || 1000 * 60 * 60 * 24, //1 day
        path:"/"
    };

    return res
        .status(200)
        .cookie("auth", token, options)
        .json(
            new ApiResponse(200, "user Created success")
        )
},
);

//login user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const validationResult = loginUserSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new ApiError(400, "Validation Error", validationResult.error.issues)
    }

    const { token } = await loginUserService(validationResult.data)

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
        maxAge: Number(process.env.JWT_LIFE) || 1000 * 60 * 60 * 24, //1 day
        path:"/"
    };
    // console.log(data)

    return res
        .status(200)
        .cookie("auth", token, options)
        .json(
            new ApiResponse(200, "User Login Success")
        )
})

//logout user
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user
    if (!user) {
        throw new ApiError(401, "You are not authorize");
    }

    return res
        .status(200)
        .clearCookie("auth")
        .json(
            new ApiResponse(200, "User logout success")
        )
})


export const verifyUserCookie = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(400, "Cookie not correct");
    }
    return res.status(200).json(
        new ApiResponse(200, "Cookie is correct", [user])
    )
})
