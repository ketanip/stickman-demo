import { Router } from "express";
import { authController } from "../controllers";

const router = Router();

router.get("/sign-in", authController.loginPageController);
router.get("/sign-out", authController.loginOutController   );
router.post("/sign-in", authController.loginController);

export default router;