import { db } from "../db";
import { UniqueUserArgs, User } from "../types";

const findUniqueUser = async (where: UniqueUserArgs) => {
    const users = await db<User>("users").select("*").where(where).limit(1);
    return users[0];
};

export {
    findUniqueUser,
};