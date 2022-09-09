import { verifyPassword } from "../utils";
import { findUniqueUser } from "../services";
import { loginValidator } from "../validators";
import { Request, Response, NextFunction } from "express";

const loginPageController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        res.render("login");
    } catch (error) {
        next(error);
    };

};

const logOutController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        req.session.user = undefined;
        res.redirect("/auth/sign-in");
        return;
    } catch (error) {
        next(error);
    };

};

const loginHandlerController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        // Data validation.
        const {error, value, warning} = loginValidator.validate(req.body, { stripUnknown: true});
        if (error) {
            res.render("login",{ message: error.message });
            return;
        };

        // Getting data.
        const { email, password } = value;
        
        // Getting user.
        const user = await findUniqueUser({ email });
        if (!user) {
            res.render("login",{ message: "Invalid email" });
            return;
        };

        // Checking password.
        const password_res = verifyPassword(password, user.password);
        if (!password_res) {
            res.render("login",{ message: "Invalid password" });
            return;
        };

        // Setting user session.
        req.session.user = { user_id: user.id, role: user.role, user_email: user.email };
        
        // Getting redirect link.
        const redirect_link = user.role === "admin" ? "/dashboard/admin" : "/dashboard/user";
        res.redirect(redirect_link);
        return;

    } catch (error) {
        console.log(error)
        res.render("login",{ message: "Internal server error." });
    };

};

export {
    loginPageController,
    logOutController,
    loginHandlerController,
};