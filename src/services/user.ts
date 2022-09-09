import { Prisma } from "@prisma/client";
import { db } from "../db";

const findUniqueUser = (where: Prisma.UserWhereUniqueInput) => {
    const user = db.user.findUnique({ where });
    return user;
};


const updateUser = (where: Prisma.UserWhereUniqueInput, updated_data: Prisma.UserUpdateInput) => {
    const user = db.user.update({ where, data: updated_data });
    return user;
};

export {
    findUniqueUser,
    updateUser
};