export type Role = "user" | "admin";

export interface User {
    id: number;
    email: string;
    password: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
};

export type UniqueUserArgs = Partial<Pick<User, "id" | "email">>;