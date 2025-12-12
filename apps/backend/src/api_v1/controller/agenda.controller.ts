import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getAllClubsService } from "../../services/club.service.js";
import { ApiError, ApiResponse, getAllClubsSchema } from "@repo/shared-types";
import { getAllAgendaService } from "../../services/agenda.service.js";

export const getAllAgenda = asyncHandler(async(req:Request,res:Response)=>{

    const isAgendasExist = await getAllAgendaService();

    return res.status(200).json(
        new ApiResponse(200,"All Agenda fetch Successfully",isAgendasExist)
    )
})