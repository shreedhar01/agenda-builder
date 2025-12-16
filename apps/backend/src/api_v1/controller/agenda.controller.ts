import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "@repo/shared-types";
import { getAllAgendaByClubIdService, getAllAgendaService } from "../../services/agenda.service.js";

export const getAllAgenda = asyncHandler(async(req:Request,res:Response)=>{
    const user_id = req.user?.id
    if(!user_id){
        throw new ApiError(400,"Re login ")
    }
    const isAgendasExist = await getAllAgendaService(Number(user_id));

    return res.status(200).json(
        new ApiResponse(200,"All Agenda fetch Successfully",isAgendasExist)
    )
})


export const getAllAgendaByClubId = asyncHandler(async(req:Request,res:Response)=>{
    const {club_id} = req.body
    if(!club_id){
        throw new ApiError(400,"Club Id not provided")
    }
    const user_id = req.user?.name
    if(!user_id){
        throw new ApiError(400,"Re login ")
    }
    const isAgendasExist = await getAllAgendaByClubIdService(user_id,Number(club_id));

    return res.status(200).json(
        new ApiResponse(200,"All Agenda fetch Successfully",isAgendasExist)
    )
})

