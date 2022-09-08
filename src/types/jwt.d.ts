import { Role } from "@prisma/client";

export type JWTPayload = {
    role: Role;
    user_id: number;
    user_email: string;
};