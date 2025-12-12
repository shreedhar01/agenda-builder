import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getAllClubsService } from "../../services/club.service.js";
import { ApiError, ApiResponse, getAllClubsSchema } from "@repo/shared-types";

export const getAllClubs = asyncHandler(async(req:Request,res:Response)=>{
    const validationResult = getAllClubsSchema.safeParse(req.body);
        if (!validationResult.success) {
            throw new ApiError(400, "Validation Error", validationResult.error.issues);
        }

    const isClubExist = await getAllClubsService(validationResult.data);

    return res.status(200).json(
        new ApiResponse(200,"All Clubs fetch Successfully",isClubExist)
    )
})