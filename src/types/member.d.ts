interface Member {
    id: string;
    name: string;
    user_email: string;
    visible: boolean;
    created_at: Date;
    updated_at: Date;
};

export type UniqueMemberArgs = Pick<Member, "id">;
export type UpdateMemberArgs = Pick<Member, "user_email" | "visible">;
export type MembersWhereArgs = Partial<Member>;