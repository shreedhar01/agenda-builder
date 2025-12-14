import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { ApiError, type CreateAccountInput, type LoginUserInput } from "@repo/shared-types"
import { jwtSign } from "../utils/jwt.js";
import { users } from "@repo/database/schema"
import { db, drizzleOrm } from "@repo/database";

export const createUserService = async (userData: CreateAccountInput) => {
    const { name, email, password, phoneNumber } = userData;
    const existingUser = await db.select().from(users).where(drizzleOrm.eq(users.email, email));
    const isUser = existingUser[0]
    if (isUser) {
        throw new ApiError(400, "Email already registered");
    }

    const hashPass = await hashPassword(password);

    const values: any = {
        name,
        email,
        password: hashPass
    };

    if (phoneNumber) {
        values.phone_number = phoneNumber;
    }

    const isUserCreate = await db.insert(users).values(values).returning();
    const user = isUserCreate[0];
    if (!user) {
        throw new ApiError(400, "Account not created")
    }

    const token = await jwtSign({ id: user.id.toString(), name: user.name })

    return token;
}

export const loginUserService = async (userData: LoginUserInput) => {
    const isUserExist = await db.select().from(users).where(drizzleOrm.eq(users.email, userData.email));
    const user = isUserExist[0];

    if (!user) {
        throw new ApiError(400, "User doesn't exist");
    }

    const isPasswordCorrect = await comparePassword(userData.password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect Password");
    }

    const token = await jwtSign({ id: user.id.toString(), name: user.name })
    // const data = {
    //     id: user.id,
    //     name: user.name
    // }

    return { token };
}