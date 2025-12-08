import { User } from "../models/user.model.js";
import { hashPassword } from "../utils/bcrypt.js";
import {ApiError, type CreateAccountInput} from "@agenda-builder/shared-types"

export const createUserService = async(userData:CreateAccountInput) => {
    const { name, email, password, phoneNumber } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400,"Email already registered");
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