import { Router,type Router as ExpressRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { creatClub, createAgenda, createMeeting } from "../controller/user.controller.js";

const router : ExpressRouter = Router()

router.route("/club").post(authMiddleware,creatClub)
router.route("/meeting").post(authMiddleware,createMeeting)
router.route("/agenda").post(authMiddleware,createAgenda)

export default router