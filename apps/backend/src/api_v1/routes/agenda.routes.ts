import { Router, type Router as ExpressRouter } from "express";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllAgenda, getAllAgendaByClubId, getAllAgendaByMeetingId } from "../controller/agenda.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router: ExpressRouter = Router()

router.route("/")
    .get(authMiddleware, getAllAgenda)
    .post(authMiddleware, getAllAgendaByClubId)
router.route("/meeting-id").post(authMiddleware, getAllAgendaByMeetingId)

export default router