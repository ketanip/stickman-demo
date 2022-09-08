import { Prisma, User } from "@prisma/client";
import { db } from "../db";

const findUniqueUser = (where: Prisma.UserWhereUniqueInput) => {
    const user = db.user.findUnique({ where });
    return user;
};

const getUsersNotes = (orderBy: "asc" | "desc") => {

    const users = db.user.findMany({
        select: {
            id: true,
            email: true,
            note: true,
        },
        where: {
            role: { not: "admin" }
        },
        orderBy: {
            updatedAt: orderBy
        }
    });

    return users;
};

const updateUser = (where: Prisma.UserWhereUniqueInput, updated_data: Prisma.UserUpdateInput) => {
    const user = db.user.update({ where, data: updated_data });
    return user;
};

export {
    findUniqueUser,
    getUsersNotes,
    updateUser
};