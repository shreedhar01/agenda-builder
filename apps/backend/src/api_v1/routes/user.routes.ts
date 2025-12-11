import { Router,type Router as ExpressRouter } from "express";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
import { creatClub, createAgenda, createMeeting } from "../controller/user.controller.js";

const router : ExpressRouter = Router()

router.route("/club").post(creatClub)
router.route("/meeting").post(createMeeting)
router.route("/agenda").post(createAgenda)

export default router