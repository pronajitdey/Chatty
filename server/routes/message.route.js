import { Router } from "express";
import protectedRoutes from "../middleware/protectedRoutes.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.post("/send/:receiverId", protectedRoutes, sendMessage);
router.get("/:userToChatWith", protectedRoutes, getMessages);

export default router;