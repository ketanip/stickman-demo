import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import config from "../config";
import { JWTPayload } from "../types";

const createJWTToken = (user: User) => {

    const data: JWTPayload = {
        role: user.role,
        user_id: user.id,
        user_email: user.email,
    };

    const token = jwt.sign({ data }, config.JWT_SECRET, { expiresIn: "12h", algorithm: "HS256" });
    return token;

};

const verifyJWTToken = (token: string) => {

    const payload: any = jwt.verify(token, config.JWT_SECRET, { algorithms: ["HS256"] });
    const data: JWTPayload = payload.data;
    return data;

};

export {
    createJWTToken,
    verifyJWTToken,
};