import { Prisma } from "@prisma/client";
import { db } from "../db";

const updateMember = async (where: Prisma.MemberWhereUniqueInput, data: Prisma.MemberUpdateInput) => {
    const updated_member = await db.member.update({ where, data });
};


const getMembers = (orderBy: "asc" | "desc") => {
    const members = db.member.findMany({ where: { visible: true }, orderBy: { updatedAt: orderBy } });
    return members;
};


export {
    getMembers,
    updateMember,
};
