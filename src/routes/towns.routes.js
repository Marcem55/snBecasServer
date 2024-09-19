import { Router } from "express";
import { getTowns } from "../controllers/towns.controller.js";

const router = Router();

router.get("/", getTowns);

export default router;
