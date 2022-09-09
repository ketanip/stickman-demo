import { Router } from "express";
import { authenticate } from "../middlewares";
import { dashboardRouter } from "../controllers";

const router = Router();

// With templates.
router.get("/admin", authenticate("admin"), dashboardRouter.getMembersController);
router.get("/user", authenticate("user"), dashboardRouter.createMemberController);

// Functional ( no templates. )
router.post("/user", authenticate("user"), dashboardRouter.submitMemberController);

export default router;