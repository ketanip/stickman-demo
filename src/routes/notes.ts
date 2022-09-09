import { Router } from "express";
import { authenticate } from "../middlewares";
import { notesController } from "../controllers";

const router = Router();

router.get("/admin", authenticate("admin"), notesController.getNotesController);
router.get("/user", authenticate("user"), notesController.getSubmitNoteController);
router.post("/user", authenticate("user"), notesController.submitNoteController);

export default router;