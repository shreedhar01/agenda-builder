import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "@repo/shared-types";
import { getAllMeetingByClubIdService, getAllMeetingService } from "../../services/meeting.service.js";

export const getAllMeetings = asyncHandler(async (req: Request, res: Response) => {
    const user_name = req.user?.name
    if (!user_name) {
        throw new ApiError(400, "Validation Error");
    }

    const meeting = await getAllMeetingService({user_name})
    if(meeting.length === 0){
        throw new ApiError(400,"Meeting doesn't exist")
    }

    return res.status(200).json(
        new ApiResponse(200,"All Meeting fetch success",meeting)
    )
})

export const getMeetingsByClubId = asyncHandler(async (req: Request, res: Response) => {
    const user_name = req.user?.name
    const {club_id} = req.body
    if (!user_name) {
        throw new ApiError(400, "Validation Error");
    }
    if (!club_id) {
        throw new ApiError(400, "Validation Error");
    }

    const meeting = await getAllMeetingByClubIdService(user_name,club_id)
    if(meeting.length === 0){
        throw new ApiError(400,"Meeting doesn't exist for this club")
    }

    return res.status(200).json(
        new ApiResponse(200,"All Meeting fetch success",meeting)
    )
})

