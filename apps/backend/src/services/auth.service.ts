import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { ApiError, type CreateAccountInput, type LoginUserInput } from "@repo/shared-types"
import { jwtSign } from "../utils/jwt.js";

export const createUserService = async (userData: CreateAccountInput) => {
    const { name, email, password, phoneNumber } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "Email already registered");
    }

    const hashPass = await hashPassword(password);

    let user;
    if (phoneNumber) {
        user = await User.create({ name, email, password: hashPass, phoneNumber });
    } else {
        user = await User.create({ name, email, password: hashPass });
    }
    return user;
}

export const loginUserService = async (userData: LoginUserInput) => {
    const isUserExist = await User.findOne({ email: userData.email })
    if (!isUserExist) {
        throw new ApiError(400, "User doesn't exist");
    }

    const isPasswordCorrect = await comparePassword(userData.password, isUserExist.password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect Password");
    }

    const token = await jwtSign({id:isUserExist._id.toString(),name:isUserExist.name})

    return token;
}