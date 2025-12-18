import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
    ApiError,
    ApiResponse,
    getAllAgendaItemByAgendaIdSchema,
    getAllAgendaItemByClubIdSchema,
    getAllAgendaItemByMeetingIdSchema
} from "@repo/shared-types";
import {
    getAllAgendaItemByUserIdService,
    getAgendaItemByAgendaIdService,
    getAgendaItemByClubIdService,
    getAgendaItemByMeetingIdService
} from "../../services/agendaItem.service.js";

export const getAllAgendaItem = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user
    if (!user) {
        throw new ApiError(400, "Re login");
    }

    const isAgendaItemExist = await getAllAgendaItemByUserIdService({ id: Number(user.id), name: user.name });

    return res.status(200).json(
        new ApiResponse(200, "All Agenda Item fetch Successfully", isAgendaItemExist)
    )
})

export const getAllAgendaItemByAgendaId = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user
    if (!user) {
        throw new ApiError(400, "Re login");
    }

    const validationResult = getAllAgendaItemByAgendaIdSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new ApiError(400, "Validation Error", validationResult.error.issues);
    }

    const isAgendaItemExist = await getAgendaItemByAgendaIdService(validationResult.data, { id: Number(user.id), name: user.name });

    return res.status(200).json(
        new ApiResponse(200, "All Agenda Item of agenda fetch Successfully", isAgendaItemExist)
    )
})

export const getAllAgendaItemByClubId = asyncHandler(async (req: Request, res: Response) => {
    const validationResult = getAllAgendaItemByClubIdSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new ApiError(400, "Validation Error", validationResult.error.issues);
    }

    const isAgendaItemExist = await getAgendaItemByClubIdService(validationResult.data);

    return res.status(200).json(
        new ApiResponse(200, "All Agenda Item of club fetch Successfully", isAgendaItemExist)
    )
})

export const getAllAgendaItemByMeetingId = asyncHandler(async (req: Request, res: Response) => {
    const validationResult = getAllAgendaItemByMeetingIdSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new ApiError(400, "Validation Error", validationResult.error.issues);
    }

    const isAgendaItemExist = await getAgendaItemByMeetingIdService(validationResult.data);

    return res.status(200).json(
        new ApiResponse(200, "All Agenda Item for this meeting fetch Successfully", isAgendaItemExist)
    )
})