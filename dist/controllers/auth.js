"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOutController = exports.loginController = exports.loginPageController = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
const validators_1 = require("../validators");
const loginPageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("login");
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.loginPageController = loginPageController;
const loginOutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.user = undefined;
        res.redirect("/auth/sign-in");
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
exports.loginOutController = loginOutController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value, warning } = validators_1.loginValidator.validate(req.body, { stripUnknown: true });
        if (error) {
            res.render("login", { message: error.message });
            return;
        }
        ;
        const { email, password } = value;
        const user = yield (0, services_1.findUniqueUser)({ email });
        if (!user) {
            res.render("login", { message: "Invalid email" });
            return;
        }
        ;
        const password_res = (0, utils_1.verifyPassword)(password, user.password);
        if (!password_res) {
            res.render("login", { message: "Invalid password" });
            return;
        }
        ;
        req.session.user = { user_id: user.id, role: user.role, user_email: user.email };
        const redirect_link = user.role === "admin" ? "/notes/admin" : "/notes/user";
        res.redirect(redirect_link);
        return;
    }
    catch (error) {
        console.log(error);
        res.render("login", { message: "Internal server error." });
    }
    ;
});
exports.loginController = loginController;
