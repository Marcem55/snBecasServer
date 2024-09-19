import { Router } from "express";
import { auth, getUsers } from "../controllers/users.controller.js";

const router = Router();

router.post("/", auth);
router.get("/", getUsers);

export default router;
