import { Router } from "express";
import { authController } from "../controllers";

const router = Router();

// With templates.
router.get("/sign-in", authController.loginPageController);

// Functional ( no templates. )
router.get("/sign-out", authController.logOutController   );
router.post("/sign-in", authController.loginHandlerController);

export default router;