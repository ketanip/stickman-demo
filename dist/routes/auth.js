"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get("/sign-in", controllers_1.authController.loginPageController);
router.get("/sign-out", controllers_1.authController.loginOutController);
router.post("/sign-in", controllers_1.authController.loginController);
exports.default = router;
