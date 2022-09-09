import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const authenticate = (role: Role) => {

    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.session.user) {
            res.redirect("/auth/sign-in");
            return;
        };

        const user = req.session.user;

        if (role !== user.role) {
            res.redirect("/auth/sign-in?error=401");
            return;
        };

        next();

    };

};


export default authenticate;