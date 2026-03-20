import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createTask, getTasks } from "../controllers/taskController";


const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);

export default router;