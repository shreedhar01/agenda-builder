import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../../utils/jwt.js";
import { ApiError } from "@repo/shared-types";
// import { User } from "../../models/user.model.js";
import { users } from "@repo/database/schema";
import { db,drizzleOrm } from "@repo/database";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.login
        if (!token) {
            return next(new ApiError(401, "Unauthorized request, no token provided"));
        }

        const decodedToken = await jwtVerify(token);
        if (!decodedToken?.id) {
            return next(new ApiError(400, "Invalid token payload"));
        }

        const isUserExist = await db.select().from(users).where(drizzleOrm.eq(users.name,decodedToken.name))
        // User.findById(decodedToken.id).select("-password");
        const user = isUserExist[0]
        if (!user) {
            return next(new ApiError(401, "Invalid token, user does not exist"));
        }

        req.user = {
            id: user.id.toString(),
            name: user.name
        }
        next()
    } catch (error) {
        console.error("Error in Middleware :: ", error)
        if (error instanceof Error) {
            return next(new ApiError(401, error.message || "Invalid or expired token"));
        }
        return next(new ApiError(401, "Invalid or expired token"));
    }
}