import { Router } from "express";
import { getSports } from "../controllers/sports.controller.js";

const router = Router();

router.get("/", getSports);

export default router;
