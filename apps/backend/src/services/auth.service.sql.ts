import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { ApiError, type CreateAccountInput, type LoginUserInput } from "@repo/shared-types"
import { jwtSign } from "../utils/jwt.js";
import { users } from "@repo/database/schema"
import { db, drizzleOrm } from "@repo/database";

export const createUserService = async (userData: CreateAccountInput) => {
    const { name, email, password, phoneNumber } = userData;

    const existingUser = await db.select().from(users).where(drizzleOrm.eq(users.email,email));
    if (existingUser.length > 0) {
        throw new ApiError(400, "Email already registered");
    }

    const hashPass = await hashPassword(password);

    let user;
    if (phoneNumber) {
        user = await  db.insert(users).values({name,email, password:hashPass,phoneNumber})
    } else {
        user = await db.insert(users).values({name,email,password:hashPass})
    }
    return user;
}

export const loginUserService = async (userData: LoginUserInput) => {
    const isUserExist = await db.select().from(users).where(drizzleOrm.eq(users.email,userData.email));
    const user = isUserExist[0];

    if (!user) {
        throw new ApiError(400, "User doesn't exist");
    }

    const isPasswordCorrect = await comparePassword(userData.password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect Password");
    }

    const token = await jwtSign({ id: user.id.toString(), name: user.name })

    return token;
}