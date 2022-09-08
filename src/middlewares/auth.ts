import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { JWTPayload } from "../types";
import { verifyJWTToken } from "../utils/jwt";

const authenticate = (role: Role) => {

    return (req: Request, res: Response, next: NextFunction) => {

        console.log(req.headers)

        const authorizationHeader = req.headers["authorization"];
        if (!authorizationHeader) {
            res.status(401).json({error: "JWT token Missing."});
            return;
        };

        const token = authorizationHeader.split(" ")[1];
        const payload: any = verifyJWTToken(token);
        const data: JWTPayload = payload;
        
        if (role !== data.role) {
            res.status(401).json({error: "You are unauthorized to access this resource."});
            return;
        };

        res.locals.user = data;
        next();

    };

};


export default authenticate;