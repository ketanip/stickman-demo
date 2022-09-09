import { verifyPassword } from "../utils";
import { findUniqueUser } from "../services";
import { Request, Response, NextFunction } from "express";
import { loginValidator } from "../validators";

const loginPageController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        res.render("login");
    } catch (error) {
        next(error);
    };

};


const loginOutController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        req.session.user = undefined;
        res.redirect("/auth/sign-in");
        return;
    } catch (error) {
        next(error);
    };

};
const loginController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const {error, value, warning} = loginValidator.validate(req.body, { stripUnknown: true});
        if (error) {
            res.render("login",{ message: error.message });
            return;
        };

        const { email, password } = value;

        const user = await findUniqueUser({ email });

        if (!user) {
            res.render("login",{ message: "Invalid email" });
            return;
        };

        const password_res = verifyPassword(password, user.password);
        if (!password_res) {
            res.render("login",{ message: "Invalid password" });
            return;
        };

        req.session.user = { user_id: user.id, role: user.role, user_email: user.email };
        
        const redirect_link = user.role === "admin" ? "/notes/admin" : "/notes/user";
        res.redirect(redirect_link);
        return;

    } catch (error) {
        console.log(error)
        res.render("login",{ message: "Internal server error." });
    };

};

export {
    loginPageController,
    loginController,
    loginOutController
};