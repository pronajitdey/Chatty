import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";
import protectedRoutes from "../middleware/protectedRoutes.js";

const router = Router();

router.get("/", protectedRoutes, getUsers);

export default router;