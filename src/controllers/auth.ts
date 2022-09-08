import { verifyPassword } from "../utils";
import { findUniqueUser } from "../services";
import { Request, Response, NextFunction } from "express";
import { createJWTToken, verifyJWTToken } from "../utils/jwt";

const loginController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { email, password } = req.body;

        const user = await findUniqueUser({ email });

        if (!user) {
            res.status(401).json({ error: "Invalid email" });
            return;
        };

        const password_res = verifyPassword(password, user.password);
        if (!password_res) {
            res.status(401).json({ error: "Invalid password" });
            return;
        };

        const response = {
            access_token: createJWTToken(user),
        };

        res.json(response);
        return;

    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    };

};

export {
    loginController,
};