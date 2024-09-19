import { Router } from "express";
import {
  createScolarship,
  getScolarships,
  updateScolarshipComments,
  updateScolarshipStatus,
} from "../controllers/scolarships.controller.js";

const router = Router();

router.get("/", getScolarships);

router.get("/:id", (req, res) => {
  res.send("Hola scolarhip con id");
});

router.post("/", createScolarship);

router.put("/status/:id", updateScolarshipStatus);
router.put("/comments/:id", updateScolarshipComments);

router.delete("/:id", (req, res) => {
  res.send("CHAU scolarhips");
});

export default router;
