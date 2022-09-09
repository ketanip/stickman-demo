"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate = (role) => {
    return (req, res, next) => {
        if (!req.session.user) {
            res.redirect("/auth/sign-in");
            return;
        }
        ;
        const user = req.session.user;
        if (role !== user.role) {
            res.redirect("/auth/sign-in?error=401");
            return;
        }
        ;
        next();
    };
};
exports.default = authenticate;
