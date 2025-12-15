import { Router, type Router as ExpressRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllClubs, joinClub } from "../controller/club.controller.js";

const router: ExpressRouter = Router()

router.route("/")
    .get(authMiddleware, getAllClubs)
    .post(authMiddleware, joinClub)

export default router