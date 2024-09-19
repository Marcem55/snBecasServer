import { Router } from "express";
import { getClubs } from "../controllers/clubs.controller.js";

const router = Router();

router.get("/", getClubs);

export default router;
