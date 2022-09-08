import { Router } from "express";
import { authenticate } from "../middlewares";
import { notesController } from "../controllers";
import { addNoteValidator, getNotesValidator } from "../validators";
import { createValidator } from "express-joi-validation";

const router = Router();
const validator = createValidator();

router.get("/", authenticate("admin"), validator.query(getNotesValidator), notesController.getNotesController);
router.post("/", authenticate("user"), validator.body(addNoteValidator), notesController.submitNoteController);

export default router;