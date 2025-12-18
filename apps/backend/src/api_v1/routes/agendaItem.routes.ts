import { Router, type Router as ExpressRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    getAllAgendaItem,
    getAllAgendaItemByAgendaId,
    getAllAgendaItemByClubId,
    getAllAgendaItemByMeetingId,
} from "../controller/agendaItem.controllers.js";

const router: ExpressRouter = Router()

router.route("/").post(authMiddleware, getAllAgendaItem)
router.route("/agenda-id").post(authMiddleware, getAllAgendaItemByAgendaId)
router.route("/club-id").post(authMiddleware, getAllAgendaItemByClubId)
router.route("/meeting-id").post(authMiddleware, getAllAgendaItemByMeetingId)

export default router