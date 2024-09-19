import { Router } from "express";
import { getNeigborhoods } from "../controllers/neigborhoods.controller.js";

const router = Router();

router.get("/", getNeigborhoods);

export default router;
