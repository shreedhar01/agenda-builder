import { Router,type Router as ExpressRouter } from "express";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllAgendaItem } from "../controller/agendaItem.controllers.js";

const router : ExpressRouter = Router()

router.route("/").get(getAllAgendaItem)

export default router