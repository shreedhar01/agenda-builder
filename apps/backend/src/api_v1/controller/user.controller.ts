import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError, ApiResponse, createAgendaSchema, createClubSchema, createMeetingSchema } from "@repo/shared-types";
import { creatClubUserService, createAgendaService, createMeetingService } from "../../services/user.service.js";

export const creatClub = asyncHandler(async (req: Request, res: Response) => {
    const validationResult = createClubSchema.safeParse(req.body);
    // console.log("reach here 1")
    if (!validationResult.success) {
        // console.log(validationResult.error)
        throw new ApiError(400, "Validation fail", validationResult.error.issues)
    }
    // console.log("reach here 2")
    const userName = req.user?.name
    if (!userName) {
        throw new ApiError(401, "User not found, please login again")
    }

    const { isClubCreated: club } = await creatClubUserService(validationResult.data,userName);

    return res.status(200).json(
        new ApiResponse(200, "Club created Successfully",
            [{
                id: club.id,
                name: club.name
            }]
        )
    )
})

export const createMeeting = asyncHandler(async (req: Request, res: Response) => {
    const validationResult = createMeetingSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new ApiError(400, "Validation fail", validationResult.error.issues)
    }

    const meeting = await createMeetingService(validationResult.data)

    return res.status(200).json(
        new ApiResponse(200, "Meeting Created Successfully",
            [meeting]
        )
    )
})

export const createAgenda = asyncHandler(async (req: Request, res: Response) => {
    const validationResult = createAgendaSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new ApiError(400, "Validation fail", validationResult.error.issues)
    }

    const user_id = req.user?.id
    if (!user_id) {
        throw new ApiError(401, "User not found, please login again")
    }

    const createdAgenda = await createAgendaService(validationResult.data,Number(user_id))
    
    return res.status(200).json(
        new ApiResponse(200,"Agenda created",[createdAgenda])
    )
})