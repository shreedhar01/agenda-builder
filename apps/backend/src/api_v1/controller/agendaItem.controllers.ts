import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError, ApiResponse, getAllAgendaItemSchema } from "@repo/shared-types";
import { getAllAgendaItemService, getAgendaItemByIdService } from "../../services/agendaItem.service.js";

export const getAllAgendaItem = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user
    if (!user) {
        throw new ApiError(400, "Re login");
    }

    const isAgendaItemExist = await getAllAgendaItemService({id:Number(user.id),name:user.name});

    return res.status(200).json(
        new ApiResponse(200, "All Agenda Item fetch Successfully", isAgendaItemExist)
    )
})

export const getAllAgendaItemById = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user
    if (!user) {
        throw new ApiError(400, "Re login");
    }

    const validationResult = getAllAgendaItemSchema.safeParse(req.body);
    if (!validationResult.success) {
        throw new ApiError(400, "Validation Error", validationResult.error.issues);
    }

    const isAgendaItemExist = await getAgendaItemByIdService(validationResult.data.agenda_id, {id:Number(user.id),name:user.name});

    return res.status(200).json(
        new ApiResponse(200, "All Agenda Item fetch Successfully", isAgendaItemExist)
    )
})