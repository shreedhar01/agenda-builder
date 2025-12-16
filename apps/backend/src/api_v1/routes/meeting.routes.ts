import { Router, type Router as ExpressRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllMeetings,getMeetingsByClubId } from "../controller/meeting.controller.js";

const router: ExpressRouter = Router()

router.route("/")
    .get(authMiddleware, getAllMeetings)
    .post(authMiddleware,getMeetingsByClubId)

export default router