import { Router } from "express";
import { createValidator } from "express-joi-validation";
import { authController } from "../controllers";
import { loginValidator } from "../validators";

const router = Router();
const validator = createValidator();

router.post("/sign-in", validator.body(loginValidator), authController.loginController);

export default router;