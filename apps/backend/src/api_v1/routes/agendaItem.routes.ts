import { Router,type Router as ExpressRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllAgendaItem, getAllAgendaItemById } from "../controller/agendaItem.controllers.js";

const router : ExpressRouter = Router()

router.route("/").post(authMiddleware,getAllAgendaItem)
router.route("/byid").post(authMiddleware,getAllAgendaItemById)

export default router