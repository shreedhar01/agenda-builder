import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getAllClubsService, joinClubService } from "../../services/club.service.js";
import { ApiError, ApiResponse, getAllClubsSchema, joinClubSchema } from "@repo/shared-types";

export const getAllClubs = asyncHandler(async (req: Request, res: Response) => {
    // const validationResult = getAllClubsSchema.safeParse(req.body);
    const user_name = req.user?.name
    if (!user_name) {
        throw new ApiError(400, "Validation Error");
    }

    const isClubExist = await getAllClubsService({user_name});

    return res.status(200).json(
        new ApiResponse(200, "All Clubs fetch Successfully", isClubExist)
    )
})

export const joinClub = asyncHandler(async (req: Request, res: Response) => {
    const validationResult = joinClubSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new ApiError(400, "Validation Error", validationResult.error.issues);
    }

    const user_name = req.user?.name
    if(!user_name){
        throw new ApiError(400,"You are not authorize");
    }

    const club = await joinClubService(validationResult.data,user_name)

    return res.status(200).json(
        new ApiResponse(200,"You have successfully join club",[club])
    )
})