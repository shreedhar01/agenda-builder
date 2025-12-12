import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getAllClubsService } from "../../services/club.service.js";
import { ApiError, ApiResponse, getAllAgendaItemSchema } from "@repo/shared-types";
import { getAllAgendaItemService } from "../../services/agendaItem.service.js";

export const getAllAgendaItem = asyncHandler(async(req:Request,res:Response)=>{
    const validationResult = getAllAgendaItemSchema.safeParse(req.body);
        if (!validationResult.success) {
            throw new ApiError(400, "Validation Error", validationResult.error.issues);
        }

    const isAgendaItemExist = await getAllAgendaItemService(validationResult.data.agenda_id);

    return res.status(200).json(
        new ApiResponse(200,"All Agenda Item fetch Successfully",isAgendaItemExist)
    )
})