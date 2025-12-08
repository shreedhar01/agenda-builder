import { Router, type Router as userRouter } from "express";
import { createAccount } from "../controller/auth.controller.js";

const router : userRouter = Router();

router.route("/create").post(createAccount)

export default router