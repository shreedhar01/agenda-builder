import { Router, type Router as userRouter } from "express";
import { createAccount, loginUser, logoutUser } from "../controller/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router : userRouter = Router();

router.route("/create").post(createAccount)
router.route("/").post(loginUser).delete(authMiddleware,logoutUser)

export default router