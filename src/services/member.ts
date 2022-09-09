import { db } from "../db";
import { Member, MembersWhereArgs, UniqueMemberArgs, UpdateMemberArgs } from "../types";

const getMembers = async (where: MembersWhereArgs, orderBy: "asc" | "desc") => {
    const members = await db<Member>("members").select("*").where(where).orderBy("updated_at", orderBy);
    return members;
};

const updateMember = async (where: UniqueMemberArgs, data: UpdateMemberArgs) => {
    const updated_members = await db<Member>("members").update({ ...data, updated_at: db.fn.now() }).where(where).returning("*");
    return updated_members[0];
};

export {
    getMembers,
    updateMember,
};
