import { Router,type Router as ExpressRouter } from "express";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllAgenda } from "../controller/agenda.controller.js";

const router : ExpressRouter = Router()

router.route("/").get(getAllAgenda)

export default router