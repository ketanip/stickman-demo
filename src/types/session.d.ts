import { Role } from "@prisma/client";

export type SessionPayload = {
  role: Role;
  user_id: number;
  user_email: string;
};

declare module 'express-session' {
  interface SessionData {
    user?: SessionPayload;
  }
};
