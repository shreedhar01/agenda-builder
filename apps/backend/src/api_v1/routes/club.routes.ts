import { Router,type Router as ExpressRouter } from "express";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllClubs } from "../controller/club.controller.js";

const router : ExpressRouter = Router()

router.route("/").get(getAllClubs)

export default router